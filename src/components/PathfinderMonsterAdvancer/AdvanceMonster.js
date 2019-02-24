import { statBonusFromAbilityScore, racialFeatCount, withPlus, 
    assignAbilityScoreChangeToHighestStat, applyAbilityScoreChanges,
    getSavingThrowChangesFromHitDice, applyChangesToSavingThrows, hpDisplay,
    getSavingThrowChangesFromStatChanges, getStatBonusDifference, displayArmorClass,
    calcTotalAc, calcFlatFootedAc, calcTouchAc, calcAvgHitPoints } from './AdvancementUtils'
import {MonsterSizes, MonsterSizeChanges, sumSizeChanges} from './AdvancementTools/MonsterSizes'
import Skills from './AdvancementTools/Skills'

//There are a few fields we add as we go such as advancements that each stage might add to. If we could start with the assupmtion that that field is initialized properly the spread operator could be used with less coersion. 
export const advanceMonster = (statblock, advancement) => {
    let advancedCreature = statblock;
    if (advancement.hd) {
        const advancesFromHitDice = advanceByHitDice(statblock, advancement.hd);
        advancedCreature = {
            ...statblock,
            ...advancesFromHitDice
        };
    }
    if (advancement.abilityScores) {
        const advancesFromAbilityScores = advanceByAbilityScores(advancedCreature, advancement.abilityScores);
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
    return {
        ...advancedCreature,
        advancedName: `${advancedCreature.name}${displayName(advancedCreature.advancements)}`
    };
}

const displayName = (advancements) => {
    return (advancements) ? ` (${advancements.join(", ")})` : '';
}

const hpChanges = (hitDice, hdType, hpStatBonus) => {
    const newHitPointsAdjustment = hpStatBonus * hitDice;
    return {
        hp: hpDisplay(hitDice, hdType, newHitPointsAdjustment),
        hitDice: hitDice,
        hitPointAdjustment: newHitPointsAdjustment,
        hitPoints: calcAvgHitPoints(hitDice, hdType) + newHitPointsAdjustment
    }
}

const changeAcMods = (acMods, acModChanges) => {
    let changedMods = acMods;
    acModChanges.forEach(x => {
        changedMods = changeAcMod(changedMods, x);
    });
    return changedMods;
}

const changeAcMod = (origAcMods, acModChange) => {
    return origAcMods.map(x => {
        if (x.type !== acModChange.type) return x;
        return {mod: x.mod + acModChange.mod, type: x.type};
    });
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

const acChanges = (origAcMods, statBonusDiffs) => {
    const dexChange = {mod: statBonusDiffs.dex, type: 'Dex'};
    const acMods = changeAcMod(origAcMods, dexChange);
    return acFieldsFromMods(acMods);
}

export const advanceBySize = (statblock, sizeChange) => {
    const startSize = statblock.size;
    const endSize = sizeChange;

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
    const acNaturalArmorMod = {mod:totalChanges.naturalArmor, type: 'natural'};
    const acSizeMod = {mod: totalChanges.ac, type: 'size'};
    const acMods = changeAcMods(statblock.armor_class.ac_modifiers, [acNaturalArmorMod, acSizeMod]);

    const newSkills = statblock.skills.map(x => {
        const skillName = x.name.trim();
        if (skillName === 'Stealth') return {name: skillName, value: x.value + totalChanges.stealth};
        if (skillName === 'Fly') return {name: skillName, value: x.value + totalChanges.fly};
        return {name: skillName, value: x.value};
    });

    const newCmb = statblock.cmb + totalChanges.cmb;
    //Find better way to note special rules like this. Probably have all special abilities marked with bonus to field cmb and special case to know whether to add to base score or not.
    const cmbSpecial = (statblock.special_abilities.find(x => x.name === 'Grab')) ? ` (${withPlus(newCmb + 4)} grapple)` : '';
    const cmbDisplay = withPlus(newCmb) + cmbSpecial;
    const newCmd = statblock.cmd + totalChanges.cmd;
    const cmdSpecial = (statblock.cmd_details.indexOf('can\'t be tripped') !== -1) ? ' (can\'t be tripped)' : ''
    const cmdDisplay = newCmd + cmdSpecial;
    const advancementDirection = (IsUp) ? "Increased" : "Decreased";
    const advancementsFromSize = {
        skills: newSkills,
        skills_details: newSkills.map(x => x.name + ' ' + withPlus(x.value)).join(', '),
        cmb: newCmb,
        cmb_details: cmbDisplay,
        cmd: newCmd,
        cmd_details: cmdDisplay,
        size: sizeChange,
        ...acFieldsFromMods(acMods),
        advancements: [`${advancementDirection} size from ${startSize} to ${endSize}`]
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
    const savingThrowChangeStat = getSavingThrowChangesFromStatChanges(statblock.ability_scores, newAbilityScores);
    //eventually figure out how to not even include change sets that are basically blank - zeroes for all 3 saving throws

    const statBonusDiffs = getStatBonusDifference(statblock.ability_scores, newAbilityScores);

    const acFields = acChanges(statblock.armor_class.ac_modifiers.slice(0), statBonusDiffs);
    const hpFields = hpChanges(newHitDice, statblock.hdType, statBonusFromAbilityScore(newAbilityScores.con));
    const advancements = (chainedAdvancement) ? {} : {advancements: [...statblock.advancements, `Stats Altered`]};
    const existingAbilityScoreChanges = (statblock.abilityScoreChanges) ? statblock.abilityScoreChanges : [];

    const newSkills = statblock.skills.map(x => {
        const skillName = x.name.trim();
        const skillInfo = Skills.find(x => x.name === skillName);
        const skillStat = skillInfo.abilityScore;
        if (skillStat === 'Str') return {name: skillName, value: x.value + statBonusDiffs.str}
        if (skillStat === 'Dex') return {name: skillName, value: x.value + statBonusDiffs.dex}
        if (skillStat === 'Con') return {name: skillName, value: x.value + statBonusDiffs.con}
        if (skillStat === 'Int') return {name: skillName, value: x.value + statBonusDiffs.int}
        if (skillStat === 'Wis') return {name: skillName, value: x.value + statBonusDiffs.wis}
        if (skillStat === 'Cha') return {name: skillName, value: x.value + statBonusDiffs.cha}
    });

    const newCmb = statblock.cmb + statBonusDiffs.str;
    const cmbSpecial = (statblock.special_abilities.find(x => x.name === 'Grab')) ? ` (${withPlus(newCmb + 4)} grapple)` : '';
    const cmbDisplay = withPlus(newCmb) + cmbSpecial;

    const newCmd = statblock.cmd + statBonusDiffs.str + statBonusDiffs.dex;
    const cmdSpecial = (statblock.cmd_details.indexOf('can\'t be tripped') !== -1) ? ' (can\'t be tripped)' : ''
    const cmdDisplay = newCmd + cmdSpecial;

    return {
        ...advancements,
        ...hpFields,
        ...acFields,
        cmb: newCmb,
        cmb_details: cmbDisplay,
        cmd: newCmd,
        cmd_details: cmdDisplay,
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
    const hpFields = hpChanges(newHitDice, statblock.hdType, statBonusFromAbilityScore(statblock.ability_scores.con));
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

