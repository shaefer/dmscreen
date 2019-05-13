import { statBonusFromAbilityScore, racialFeatCount, withPlus, 
    assignAbilityScoreChangeToHighestStat, applyAbilityScoreChanges,
    getSavingThrowChangesFromHitDice, applyChangesToSavingThrows, hpDisplay,
    getSavingThrowChangesFromStatChanges, getStatBonusDifference, displayArmorClass,
    calcTotalAc, calcFlatFootedAc, calcTouchAc, calcAvgHitPoints, getConstructBonusHitPoints } from './AdvancementUtils'
import { calculateCR, roundDecimal } from './AdvancementTools/ChallengeRatingCalculator'
import {MonsterSizes, MonsterSizeChanges, sumSizeChanges} from './AdvancementTools/MonsterSizes'
import Skills from './AdvancementTools/Skills'

//There are a few fields we add as we go such as advancements that each stage might add to. If we could start with the assupmtion that that field is initialized properly the spread operator could be used with less coersion. 
//We probably should just do an initial spread that initializes fields that aren't always present that we would like to count on for advancement.
export const advanceMonster = (statblock, advancement) => {
    let advancedCreature = statblock;
    if (advancement.hd) {
        const advancesFromHitDice = advanceByHitDice(statblock, advancement.hd - statblock.hitDice);
        advancedCreature = {
            ...statblock,
            ...advancesFromHitDice
        };
    }
    if (advancement.str || advancement.dex || advancement.con || advancement.int || advancement.wis || advancement.cha) {
        //abilityScores: [{str: 2, dex: 4, reason: "Custom Ability Score Adjustments"}],
        const statAdvancementsMerged = {reason: 'User Customized Ability Scores'};
        if (advancement.str) statAdvancementsMerged.str = advancement.str - statblock.ability_scores.str;
        if (advancement.dex) statAdvancementsMerged.dex = advancement.dex - statblock.ability_scores.dex;
        if (advancement.con) statAdvancementsMerged.con = advancement.con - statblock.ability_scores.con;
        if (advancement.int) statAdvancementsMerged.int = advancement.int - statblock.ability_scores.int;
        if (advancement.wis) statAdvancementsMerged.wis = advancement.wis - statblock.ability_scores.wis;
        if (advancement.cha) statAdvancementsMerged.cha = advancement.cha - statblock.ability_scores.cha;
        
        const advancesFromAbilityScores = advanceByAbilityScores(advancedCreature, [statAdvancementsMerged]);
        advancedCreature = {
            ...advancedCreature,
            ...advancesFromAbilityScores,
        }
    }
    if (advancement.size) {
        const advancedFromSize = advanceBySize(advancedCreature, advancement.size);
        advancedCreature = {
            ...advancedCreature,
            ...advancedFromSize
        }
    }

    const originalCr = calculateCR(statblock);
    const advancedCr = calculateCR(advancedCreature);
    const crDiff = roundDecimal(advancedCr.total - originalCr.total);
    const crAdjusted = roundDecimal(originalCr.original + crDiff);
    return {
        ...advancedCreature,
        advancedName: `${advancedCreature.name}${displayName(advancedCreature.advancements)}`,
        crCalculation: {
            originalCr,
            advancedCr,
            crDiff,
            crAdjusted
        }
    };
}

const displayName = (advancements) => {
    return (advancements) ? ` (${advancements.join(", ")})` : '';
}

const hpChanges = (hitDice, hdType, creatureType, conBonus, chaBonus, size) => {
    const statBonus = (creatureType === 'Undead') ? chaBonus : conBonus;

    const newHitPointsAdjustment = (creatureType !== 'Construct') ? statBonus * hitDice : getConstructBonusHitPoints(size);
    return {
        hp: hpDisplay(hitDice, hdType, newHitPointsAdjustment),
        hitDice: hitDice,
        hitPointAdjustment: newHitPointsAdjustment,
        hitPoints: calcAvgHitPoints(hitDice, hdType) + newHitPointsAdjustment
    }
}

const changeAcMods = (acMods, acModChanges) => {
    let changedMods = [...acMods];
    acModChanges.forEach(x => {
        changedMods = changeAcMod(changedMods, x);
    });
    return changedMods;
}

const changeAcMod = (origAcMods, acModChange) => {
    const updatedMods = origAcMods.map(x => {
        if (x.type !== acModChange.type) return x;
        return {mod: x.mod + acModChange.mod, type: x.type};
    });
    const isNewMod = (!origAcMods.find(x => x.type === acModChange.type));
    if (isNewMod) {
        return [
            ...updatedMods,
            acModChange
        ];
    } else {
        return updatedMods;
    }
}

const acFieldsFromMods = (acMods) => {
    const acDisplay = displayArmorClass(acMods);
    return {
        ac: acDisplay,
        armor_class : {
            ac_details: acDisplay,
            ac_modifiers: acMods,
            ac_modifiers_details: acMods.map(x => `${withPlus(x.mod)} ${x.type}`).join(', '),
            ac : {
                standard: calcTotalAc(acMods),
                flat_footed: calcFlatFootedAc(acMods),
                touch: calcTouchAc(acMods)
            }
        }
    }
}

const attackChanges = (origAttacks, statBonusDiffs) => {
    console.log("attack changes", origAttacks)
    if (!origAttacks) return origAttacks;
    const strBonusChange = statBonusDiffs.str;
    for (let i = 0; i<origAttacks.length; i++) {
        const attackSeq = origAttacks[i];
        for (let j = 0; j < attackSeq.length; j++) {
            const attack = attackSeq[j];
            console.log(attack);
        }
    }
}

const acChanges = (origAcMods, statBonusDiffs) => {
    const dexChange = {mod: statBonusDiffs.dex, type: 'Dex'};
    const acMods = changeAcMod(origAcMods, dexChange);
    return acFieldsFromMods(acMods);
}

export const combatManeuverChanges = (statblock, cmbChange, cmdChange) => {
    const newCmb = statblock.cmb + cmbChange;
    const cmbSpecial = (statblock.special_abilities && statblock.special_abilities.find(x => x.name === 'Grab')) ? ` (${withPlus(newCmb + 4)} grapple)` : '';
    const cmbDisplay = withPlus(newCmb) + cmbSpecial;

    const newCmd = statblock.cmd + cmdChange; //all touch ac mods http://www.tenebraemush.net/index.php/Understanding_CMB_and_CMD
    const cmdSpecial = (statblock.cmd_details && statblock.cmd_details.indexOf('can\'t be tripped') !== -1) ? ' (can\'t be tripped)' : ''
    const cmdDisplay = newCmd + cmdSpecial;

    const result = {
        cmb: newCmb,
        cmb_details: cmbDisplay,
        cmd: newCmd,
        cmd_details: cmdDisplay,
    };
    return result;
}

export const advanceBySize = (statblock, sizeChange) => {
    const startSize = statblock.size;
    const endSize = sizeChange;

    if (startSize === endSize) return {}; //no size change has occurred.

    const startSizeIndex = MonsterSizes.findIndex(x => x.size === startSize);
    const endSizeIndex = MonsterSizes.findIndex(x => x.size === endSize);
    const IsUp = startSizeIndex < endSizeIndex;

    const changes = (IsUp) ? MonsterSizeChanges.slice(startSizeIndex, endSizeIndex) : MonsterSizeChanges.slice(endSizeIndex, startSizeIndex);

    const totalChanges = sumSizeChanges(changes, IsUp);
    const totalStatChanges = {
        str: totalChanges.str,
        dex: totalChanges.dex,
        con: totalChanges.con,
        reason: `Changed size from ${startSize} to ${endSize}`
    }
    //Do remaining adjustments to fly, stealth, ac-size, ac-naturalArmor, attack, cmd, cmb 
    const acNaturalArmorMod = {mod:(totalChanges.naturalArmor) ? totalChanges.naturalArmor : 0, type: 'natural'};
    const acSizeMod = {mod: (totalChanges.ac) ? totalChanges.ac : 0, type: 'size'};
    const acMods = changeAcMods(statblock.armor_class.ac_modifiers, [acNaturalArmorMod, acSizeMod]);

    const newSkills = statblock.skills.map(x => {
        const skillName = x.name.trim();
        if (skillName === 'Stealth') return {name: skillName, value: x.value + totalChanges.stealth};
        if (skillName === 'Fly') return {name: skillName, value: x.value + totalChanges.fly};
        return {name: skillName, value: x.value};
    });

    const combatManeuverFields = combatManeuverChanges(statblock, totalChanges.cmb, totalChanges.cmd);

    const advancementDirection = (IsUp) ? "Increased" : "Decreased";
    const advancements = (statblock.advancements) ? statblock.advancements : [];
    const advancementsFromSize = {
        skills: newSkills,
        skills_details: newSkills.map(x => x.name + ' ' + withPlus(x.value)).join(', '),
        ...combatManeuverFields,
        size: sizeChange,
        ...acFieldsFromMods(acMods),
        advancements: [...advancements, `${advancementDirection} size from ${startSize} to ${endSize}`]
    }

    const sizeAdvancedCreature = {
        ...statblock,
        ...advancementsFromSize,
    }

    const advancementsFromAbilityScoreChanges = advanceByAbilityScores(sizeAdvancedCreature, [totalStatChanges], true);

    return {
        ...advancementsFromSize,
        ...advancementsFromAbilityScoreChanges
    };
}

    //increases stats has trickle down affect on a lot of things:
    //str -> melee attacks, str skills, str-based saves for special abilities
    //dex -> ac, init, reflex save, dex skills, dex-based saves for special abilities
    //con -> hp, fortitude save, con-based saves for special abilities
    //int -> skill points, int-based skills, int-based saves for special abilities
    //wis -> will save, wis skills, wis-based saves for special abilities
    //cha -> maybe deflection ac, cha skills, cha-based saves for special abilities
export const advanceByAbilityScores = (statblock, abilityScoreChanges, chainedAdvancement = false) => {
    const newHitDice = statblock.hitDice;
    const newAbilityScores = applyAbilityScoreChanges(statblock.ability_scores, abilityScoreChanges);
    const savingThrowChangeStat = getSavingThrowChangesFromStatChanges(statblock.ability_scores, newAbilityScores, statblock.creature_type);
    //eventually figure out how to not even include change sets that are basically blank - zeroes for all 3 saving throws

    const statBonusDiffs = getStatBonusDifference(statblock.ability_scores, newAbilityScores);
    console.log("Advancing ability scores", statblock.name)
    const attacks = attackChanges(statblock.melee_attacks, statBonusDiffs);
    const acFields = acChanges(statblock.armor_class.ac_modifiers.slice(0), statBonusDiffs);
    const hpFields = hpChanges(newHitDice, statblock.hdType, statblock.creature_type, statBonusFromAbilityScore(newAbilityScores.con), statBonusFromAbilityScore(newAbilityScores.cha), statblock.size);
    const existingAdvancements = (statblock.advancements) ? statblock.advancements : [];
    const advancements = (chainedAdvancement) ? {} : {advancements: [...existingAdvancements, `Stats Altered`]};
    const existingAbilityScoreChanges = (statblock.abilityScoreChanges) ? statblock.abilityScoreChanges : [];

    const newSkills = statblock.skills.map(x => {
        const skillName = x.name.trim();
        const skillInfo = Skills.find(x => x.name === skillName);
        if (!skillInfo) throw new Error(`Did not find ${skillName}`)
        const skillStat = skillInfo.abilityScore;
        if (skillStat === 'Str') return {name: skillName, value: x.value + statBonusDiffs.str}
        if (skillStat === 'Dex') return {name: skillName, value: x.value + statBonusDiffs.dex}
        if (skillStat === 'Con') return {name: skillName, value: x.value + statBonusDiffs.con}
        if (skillStat === 'Int') return {name: skillName, value: x.value + statBonusDiffs.int}
        if (skillStat === 'Wis') return {name: skillName, value: x.value + statBonusDiffs.wis}
        if (skillStat === 'Cha') return {name: skillName, value: x.value + statBonusDiffs.cha}
        return {name: skillName, value: x.value};
    });

    const cmbChange = statBonusDiffs.str;
    const cmdChange = statBonusDiffs.str + statBonusDiffs.dex;
    const combatManeuverFields = combatManeuverChanges(statblock, cmbChange, cmdChange);
    return {
        ...advancements,
        ...hpFields,
        ...acFields,
        ...combatManeuverFields,
        skills: newSkills,
        skill_details: newSkills.map(x => x.name + ' ' + withPlus(x.value)).join(', '),
        init: statblock.init + statBonusDiffs.dex,
        saving_throws: applyChangesToSavingThrows(statblock.saving_throws, [savingThrowChangeStat]),
        ability_scores: newAbilityScores,
        abilityScoreChanges: [...existingAbilityScoreChanges, ...abilityScoreChanges],
    };
}

/** Since we are just returning a list of alterations to the main creature we can chain our advancements
 * We advance by hit dice and get those changes and then merge those with the original creature before doing
 * the abilityScore advancements that we are chaining together and then just merging the resulting field changes
 * and returning them all. It is a big of extra work but makes for a much better overlap when their are upstream stat changes
 */
export const advanceByHitDice = (statblock, hdChange) => {
    //TODO: cr, exp, melee attacks from str, ranged attacks from dex, skills, deflection ac from cha, special ability saves
    const newHitDice = statblock.hitDice + hdChange;

    /** http://legacy.aonprd.com/bestiary/monsterAdvancement.html Step 3 ability scores states that every 4 hd added should result in a stat increase */
    const statPointsPer4HitDiceAdded = Math.floor(hdChange/4);
    const abilityScoreChange = assignAbilityScoreChangeToHighestStat(statblock.ability_scores, statPointsPer4HitDiceAdded, `Advanced Creature ${hdChange} Hit Dice`);
    const savingThrowChange =  getSavingThrowChangesFromHitDice(statblock, newHitDice);
    const hpFields = hpChanges(newHitDice, statblock.hdType, statblock.creature_type, statBonusFromAbilityScore(statblock.ability_scores.con), statBonusFromAbilityScore(statblock.ability_scores.con), statblock.size);
    const hitDiceAdvancements = {
        advancements: [`Advanced ${hdChange} Hit Dice`],
        ...hpFields,
        saving_throws: applyChangesToSavingThrows(statblock.saving_throws, [savingThrowChange]),
        featCount: racialFeatCount(newHitDice),
    }

    const hitDiceAdvancedCreature = {
        ...statblock,
        ...hitDiceAdvancements,
    }

    const statAdvancements = advanceByAbilityScores(hitDiceAdvancedCreature, [abilityScoreChange], true);
    return {
        ...hitDiceAdvancements,
        ...statAdvancements
    }
}

