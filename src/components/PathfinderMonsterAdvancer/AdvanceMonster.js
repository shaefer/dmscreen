import { statBonusFromAbilityScore, racialFeatCount, withPlus, 
    assignAbilityScoreChangeToHighestStat, applyAbilityScoreChanges,
    getSavingThrowChangesFromHitDice, applyChangesToSavingThrows, hpDisplay,
    getSavingThrowChangesFromStatChanges, getStatBonusDifference, displayArmorClass,
    calcTotalAc, calcFlatFootedAc, calcTouchAc, calcAvgHitPoints, getConstructBonusHitPoints } from './AdvancementUtils'
import { calculateCR, roundDecimal } from './AdvancementTools/ChallengeRatingCalculator'
import {MonsterSizes, MonsterSizeChanges, sumSizeChanges} from './AdvancementTools/MonsterSizes'
import Skills from './AdvancementTools/Skills'
import { getBaseAttackBonusByHitDiceAndCreatureType } from '../../monsteradvancer/BaseAttackBonusCalculator'
import getCaptureGroups from '../../utils/RegexHelper'
import { parse } from '@babel/parser'

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
        const statAdvancementsMerged = {
            ...advancement,
            reason: 'User Customized Ability Scores'
        };
        console.log("Advancing by ability scores", statAdvancementsMerged);
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

//currently this is really melee attack changes
const attackChanges = (origAttacks, statBonusChange, baseAttackBonusChange, applyStatToDamage = true) => {
    //console.log("attack changes", origAttacks)
    if (!origAttacks) return origAttacks;
    //const strBonusChange = statBonusDiffs.str;
    return origAttacks.map(attackSeq => {
        return attackSeq.map(attack => {
            //console.log(attack, attack.toHit, statBonusChange, baseAttackBonusChange);
            const damageAdjustment = (applyStatToDamage) ? statBonusChange : 0;
            const newDamageDetails = attack.damage_details.map(dmg  => {
                const newDice = dmg.dice.map(dice => {
                    return {
                        ...dice,
                        adjustment: dice.adjustment + damageAdjustment
                    }
                });
                return {
                    ...dmg,
                    dice: newDice
                };
            });
            return {
                ...attack,
                toHit: attack.toHit + statBonusChange + baseAttackBonusChange,
                damage_details: newDamageDetails
            };
        });
    });
}

const acChanges = (origAcMods, statBonusDiffs) => {
    const dexChange = {mod: statBonusDiffs.dex, type: 'Dex'};
    const acMods = changeAcMod(origAcMods, dexChange);
    return acFieldsFromMods(acMods);
}

export const combatManeuverChanges = (statblock, cmbChange, cmdChange) => {
    const newCmb = statblock.cmb + cmbChange;
    const newCmbDetails = (statblock.cmb_details) ? statblock.cmb_details.toString().replace(/\d+/gm, (x) => {
        return parseInt(x) + cmbChange;
    }) : withPlus(newCmb);

    const newCmd = statblock.cmd + cmdChange; //all touch ac mods http://www.tenebraemush.net/index.php/Understanding_CMB_and_CMD
    const newCmdDetails = (statblock.cmd_details) ? statblock.cmd_details.toString().replace(/\d+/gm, (x) => {
        return parseInt(x) + cmdChange;
    }) : newCmd;

    const result = {
        cmb: newCmb,
        cmb_details: newCmbDetails,
        cmd: newCmd,
        cmd_details: newCmdDetails,
    };
    return result;
}

export const advanceAttacksBySize = (origAttacks, startSizeIndex, endSizeIndex) => {
    if (!origAttacks) return origAttacks;
    return origAttacks.map(attackSeq => {
        return attackSeq.map(attack => {
            const newDamageDetails = attack.damage_details.map(dmg  => {
                const newDice = dmg.dice.map(dice => {
                    const newDmgDice = getNewDamageDice(dice, startSizeIndex, endSizeIndex);
                    return {
                        ...dice,
                        numOfDice: newDmgDice.numOfDice,
                        numOfSides: newDmgDice.numOfSides
                    }
                });
                return {
                    ...dmg,
                    dice: newDice
                };
            });
            return {
                ...attack,
                damage_details: newDamageDetails
            };
        });
    });
}

const startingDmgProgressionEquivalent = {"3d4":"2d6", "1d12":"2d6", "2d10":"3d8", "2d4":"1d8", "3d10":"4d8", "4d10":"6d8", "5d6":"4d8", "5d10":"6d8", "7d6":"6d8"}; //dmg amounts not on chart  equated to one that  is on the chart.
//const completeDmgProgression = ["1", "1d2", "1d3", "1d4", "1d6", "1d8", "2d6", "2d8", "4d6", "4d8", "6d6", "6d8", "8d6", "8d8", "10d6", "10d8", "12d6", "12d8"];
const paizoProgression = ["1d1", "1d2", "1d3", "1d4", "1d6", "1d8", "1d10", "2d6", "2d8", "3d6", "3d8", "4d6", "4d8", "6d6", "6d8", "8d6", "8d8", "12d6", "12d8", "16d6", "16d8", "20d6", "20d8"];
const smallIndex = 3;
const mediumIndex = 4;
const d6DamageIndex = 4;
const d8DamageIndex = 5;
//https://paizo.com/paizo/faq/v5748nruor1fm#v5748eaic9t3f
export const getNewDamageDice = (attackDice, startSizeIndex, endSizeIndex) => {
    const startingDmg = `${attackDice.numOfDice}d${attackDice.numOfSides}`
    //convert if non-standard dice
    const dmgProgression = (startingDmgProgressionEquivalent[startingDmg]) ? startingDmgProgressionEquivalent[startingDmg] : startingDmg;
    const startingDmgIndex = paizoProgression.indexOf(dmgProgression);
    if (startingDmgIndex === -1) {
        console.warn("Found a dice sequene")
    }
    const IsUp = startSizeIndex < endSizeIndex;
    //loop for each step
    let dmgIndexChange = 0;
    const stepCnt = Math.abs(endSizeIndex -  startSizeIndex);
    for (let i = 0; i<stepCnt; i++) {
        const sizeIndex  = startSizeIndex + i;
        if (IsUp) {
            if (sizeIndex <= smallIndex || startingDmgIndex + dmgIndexChange <= d6DamageIndex) {
                dmgIndexChange++;
            } else {
                dmgIndexChange = dmgIndexChange + 2;
            }
        } else {
            if (sizeIndex <= mediumIndex || startingDmgIndex + dmgIndexChange <= d8DamageIndex) {
                dmgIndexChange = dmgIndexChange - 1;
            } else {
                dmgIndexChange = dmgIndexChange - 2;
            }
        }
    }
    const newDmgIndex = Math.max(startingDmgIndex + dmgIndexChange, 0);
    console.log(`CHANGE DAMAGE DICE FROM ${paizoProgression[startingDmgIndex]}(${startingDmg})  TO ${paizoProgression[newDmgIndex]}`)
    //if we would go off the chart low leave index at 0...we'll have to check going off the top of the chart eventually too.
    const newDamage = paizoProgression[newDmgIndex];
    const dmgParts = newDamage.split("d");
    return {
        ...attackDice,
        numOfDice: dmgParts[0], 
        numOfSides: dmgParts[1]
    };
    
    
    //{numOfDice: dmgParts[0], numOfSides: dmgParts[1]};
    //parseDamageEntry (or make table preparsed) and return an object with {numOfDice:1, numOfSides:4}

    //D,  F,   T,   S,   M,   L,  H    G   C
    //to handle shrinking damage
    //Everything that is smaller than this will use the bottom progression but set a min of 1 regardless of size --we'll have to track if this happens to keep stacking working properly.
    //For normal progressions
    // 1   1d2  1d3  1d4  1d6  1d8 2d6  3d6 4d6
    // 1d2 1d3  1d4  1d6  1d8  2d6 3d6  4d6 6d6 //same as first
    // 1d3 1d4  1d6  1d8  1d10 2d8 3d8  4d8 6d8 //d10 to 2d8
    // 1d4 1d6  1d8  1d10 2d6  3d6 4d6  6d6 8d6 //d10 to 2d6
    // 1d6 1d8  1d10 2d6  2d8  3d8 4d8  6d8 8d8 //2d6 to 2d8
    // 1d8 1d10 2d6  2d8  3d6  4d6 6d6  8d6 12d6 //2d8 to 3d6
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

    
    //loop through all attacks and call
    const newMeleeAttacks = advanceAttacksBySize(statblock.melee_attacks, startSizeIndex, endSizeIndex);
    const newRangedAttacks = advanceAttacksBySize(statblock.ranged_attacks, startSizeIndex, endSizeIndex);
    

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
        melee_attacks: newMeleeAttacks,
        ranged_attacks: newRangedAttacks,
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
    //console.debug("Advancing ability scores", statblock.name)
    const meleeAttacks = attackChanges(statblock.melee_attacks, statBonusDiffs.str, 0);
    const rangedAttacks = attackChanges(statblock.ranged_attacks, statBonusDiffs.dex, 0, false);
    const acFields = acChanges(statblock.armor_class.ac_modifiers.slice(0), statBonusDiffs);
    const hpFields = hpChanges(newHitDice, statblock.hdType, statblock.creature_type, statBonusFromAbilityScore(newAbilityScores.con), statBonusFromAbilityScore(newAbilityScores.cha), statblock.size);
    const existingAdvancements = (statblock.advancements) ? statblock.advancements : [];
    const advancements = (chainedAdvancement) ? {} : {advancements: [...existingAdvancements, `Stats Altered`]};
    const existingAbilityScoreChanges = (statblock.abilityScoreChanges) ? statblock.abilityScoreChanges : [];

    const newSkills = statblock.skills.map(x => {
        const skillName = x.name.trim();
        const skillInfo = Skills.find(x => x.name === skillName);
        if (!skillInfo) throw new Error(`Did not find skill named: ${skillName} on creature ${statblock.name}`)
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
        melee_attacks: meleeAttacks,
        ranged_attacks: rangedAttacks,
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
    const newBaseAttack =  getBaseAttackBonusByHitDiceAndCreatureType(newHitDice, statblock.creature_type);
    const baseAttackDiff = newBaseAttack - statblock.base_attack;
    //console.log("BAB: " + statblock.base_attack, "BABNEW: " + newBaseAttack)
    const meleeAttacks = attackChanges(statblock.melee_attacks, 0, baseAttackDiff);
    const rangedAttacks = attackChanges(statblock.ranged_attacks, 0, baseAttackDiff, false);
    const newCombatFields = combatManeuverChanges(statblock, baseAttackDiff, baseAttackDiff);

    const hpFields = hpChanges(newHitDice, statblock.hdType, statblock.creature_type, statBonusFromAbilityScore(statblock.ability_scores.con), statBonusFromAbilityScore(statblock.ability_scores.con), statblock.size);
    const hitDiceAdvancements = {
        advancements: [`Advanced ${hdChange} Hit Dice`],
        ...hpFields,
        melee_attacks: meleeAttacks,
        ranged_attacks: rangedAttacks,
        saving_throws: applyChangesToSavingThrows(statblock.saving_throws, [savingThrowChange]),
        featCount: racialFeatCount(newHitDice),
        base_attack: newBaseAttack,
        ...newCombatFields
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

