import { statBonusFromAbilityScore, racialFeatCount, withPlus, 
    assignAbilityScoreChangeToHighestStat, applyAbilityScoreChanges,
    getSavingThrowChangesFromHitDice, applyChangesToSavingThrows, hdDisplay,
    getSavingThrowChangesFromStatChanges, getStatBonusDifference, displayArmorClass,
    calcTotalAc, calcFlatFootedAc, calcTouchAc, calcAvgHitPoints, getConstructBonusHitPoints, getSavingThrowChangesFromClass,
    assignAbilityScoreChangeToStat, getStatByKey } from './AdvancementUtils'
import { calculateCR, roundDecimal } from './AdvancementTools/ChallengeRatingCalculator'
import {MonsterSizes, MonsterSizeChanges, sumSizeChanges} from './AdvancementTools/MonsterSizes'
import Skills from './AdvancementTools/Skills'
import { getBaseAttackBonusByHitDiceAndCreatureType, calculateBaseAttackBonus } from '../../monsteradvancer/BaseAttackBonusCalculator'
import { TemplatesMap } from './AdvancementTools/Templates'
import barbarian from '../../data/Classes/Barbarian'
import bard from '../../data/Classes/Bard'
import cleric from '../../data/Classes/Cleric'
import druid from '../../data/Classes/Druid'
import fighter from '../../data/Classes/Fighter'
import paladin from '../../data/Classes/Paladin'
import {rollDice} from '../../utils/DiceBag'

import seedrandom from 'seedrandom';

export const recalculateMonster = (monster) => {
    const newMonster = {
        ...monster,
        totalHitDice: monster.hitDice,
        hpEntries: [hpChanges("racial", monster.hitDice, monster.hdType, monster.creature_type, 
                    statBonusFromAbilityScore(monster.ability_scores.con), 
                    statBonusFromAbilityScore(monster.ability_scores.cha), 
                    monster.size)],
    };
    const recalcHdMonster = {
        ...newMonster,
        ...advanceByHitDice(newMonster, 0)
    };
    const recalcAbilityScoresMonster = {
        ...recalcHdMonster,
        ...advanceByAbilityScores(recalcHdMonster, [{str:0,dex:0,con:0,int:0,wis:0,cha:0,reason:'recalc'}])
    }
    const recalcSizeMonster = {
        ...recalcAbilityScoresMonster,
        ...advanceBySize(recalcAbilityScoresMonster, recalcAbilityScoresMonster.size)
    }
    const advancedNamePrefixes = (recalcSizeMonster.advancedNamePrefixes) ? recalcSizeMonster.advancedNamePrefixes : [];
    const namePrefix = (advancedNamePrefixes.length > 0) ? (advancedNamePrefixes.sort().join(", ") + " ") : '';
    const finalMonster = {
        ...recalcSizeMonster,
        advancedName: `${namePrefix}${recalcSizeMonster.name}`,
    }
    return finalMonster;
}

//There are a few fields we add as we go such as advancements that each stage might add to. If we could start with the assupmtion that that field is initialized properly the spread operator could be used with less coersion. 
//We probably should just do an initial spread that initializes fields that aren't always present that we would like to count on for advancement.
//TOOD: Decide if we want to have a single generator for everything for a set of generators for each section to make it easier to randomly generate but customize without saving.
export const advanceMonster = (statblock, advancement, generator = new seedrandom("baseSeed")) => {
    let advancedCreature = statblock;
    advancedCreature = {
        ...advancedCreature,
        advancements: [],
        totalHitDice: statblock.hitDice,
        hpEntries: [hpChanges("racial", statblock.hitDice, statblock.hdType, statblock.creature_type, statBonusFromAbilityScore(statblock.ability_scores.con), statBonusFromAbilityScore(statblock.ability_scores.con), statblock.size)],
    }
    if (advancement.hd) {
        const advancesFromHitDice = advanceByHitDice(advancedCreature, advancement.hd - advancedCreature.hitDice);
        advancedCreature = {
            ...advancedCreature,
            ...advancesFromHitDice
        };
    }
    if (advancement.str || advancement.dex || advancement.con || advancement.int || advancement.wis || advancement.cha) {
        //abilityScores: [{str: 2, dex: 4, reason: "Custom Ability Score Adjustments"}],
        const statAdvancementsMerged = {
            ...advancement,
            reason: 'User Customized Ability Scores'
        };
        //console.log("Advancing by ability scores", statAdvancementsMerged);
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
    advancedCreature = {
        ...advancedCreature,
        crCalculation: {
            originalCr,
            advancedCr,
            crDiff,
            crAdjusted
        }
    }


    if (advancement.classLevels && advancement.classLevels.length > 0) {
        advancement.classLevels.forEach(classLevel => {
            const advancedFromClassLevel = advanceByClassLevel(advancedCreature, classLevel, generator);
            advancedCreature = {
                ...advancedCreature,
                ...advancedFromClassLevel
            }
        });
    }
    if (advancement.templates) {
        //loop through each template provided.
        advancement.templates.forEach(templateName => {
            const template = TemplatesMap[templateName];
            if (template) {
                const advancedFromTemplate = advanceByTemplate(advancedCreature, template);
                advancedCreature = {
                    ...advancedCreature,
                    ...advancedFromTemplate
                }
            }
        })
    }

    const additionalSpecialAttacks = (advancedCreature.specialAttacksAcquired) ? advancedCreature.specialAttacksAcquired : [];
    advancedCreature = {
        ...advancedCreature,
        //specialAttacksAcquired: additionalSpecialAttacks.map(x => x.displayFn(advancedCreature)).sort().join(', ')
        specialAttacksAcquired: acquiredSpecialAttacks(advancedCreature, additionalSpecialAttacks)
    }
    //TODO: resolve all function displays (we will have displays that rely on final data from the creature after all advancements. Such as special attacks that add damage based on total HD.)
    
    const advancedNamePrefixes = (advancedCreature.advancedNamePrefixes) ? advancedCreature.advancedNamePrefixes : [];
    const namePrefix = (advancedNamePrefixes.length > 0) ? (advancedNamePrefixes.sort().join(", ") + " ") : '';
    return {
        ...advancedCreature,
        advancedName: `${namePrefix}${advancedCreature.name}${displayName(advancedCreature.advancements)}`,
    };
}

//https://gist.github.com/robmathers/1830ce09695f759bf2c4df15c29dd22d
const groupBy = (xs, key) => {
    return xs.reduce((rv, x) => {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};

const acquiredSpecialAttacks = (monster, acquired) => {
    if (!acquired || acquired.length === 0) return '';
    const groupedBySource = groupBy(acquired, 'sourceName');
    const sourceKeys = Object.keys(groupedBySource);
    const specialAttacksBySource = sourceKeys.map(key => {
        return {
            source: key, 
            display: groupedBySource[key].map(x => x.displayFn(monster)).sort().join(', ')
        };
    });
    return specialAttacksBySource;
}

const displayName = (advancements) => {
    return (advancements && advancements.length > 0) ? ` (${advancements.join(", ")})` : '';
}

const calculateBonusHp = (hitDice, hdType, creatureType, conBonus, chaBonus, size) => {
    const statBonus = (creatureType === 'Undead') ? chaBonus : conBonus;
    return (creatureType !== 'Construct') ? statBonus * hitDice : getConstructBonusHitPoints(size);
}

const hpChanges = (source, hitDice, hdType, creatureType, conBonus, chaBonus, size) => {
    const hpBonus = calculateBonusHp(hitDice, hdType, creatureType, conBonus, chaBonus, size);
    return {
        source, source,
        hdDisplay: hdDisplay(hitDice, hdType, hpBonus, source),
        hitDice: hitDice,
        hdType: hdType,
        creatureType: creatureType,
        hitPointAdjustment: hpBonus,
        avgHitPoints: calcAvgHitPoints(hitDice, hdType) + hpBonus
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
    const maxDex = Math.min(...acMods.filter(x => x.hasOwnProperty('maxDex')).map(x => x.maxDex))
    return {
        ac: acDisplay,
        armor_class : {
            ac_details: acDisplay,
            ac_modifiers: acMods,
            ac_modifiers_details: acMods.map(x => `${withPlus(x.mod)} ${x.type}`).join(', '),
            ac : {
                standard: calcTotalAc(acMods, maxDex),
                flat_footed: calcFlatFootedAc(acMods),
                touch: calcTouchAc(acMods, maxDex)
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
    const newCmbDetails = (statblock.cmb_details) ? statblock.cmb_details.toString().replace(/[+-]?\d+/gm, (x) => {
        return withPlus(parseInt(x) + cmbChange);
    }) : withPlus(newCmb);

    const newCmd = statblock.cmd + cmdChange; //all touch ac mods http://www.tenebraemush.net/index.php/Understanding_CMB_and_CMD
    const newCmdDetails = (statblock.cmd_details) ? statblock.cmd_details.toString().replace(/[+-]?\d+/gm, (x) => {
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
    //console.log(`CHANGE DAMAGE DICE FROM ${paizoProgression[startingDmgIndex]}(${startingDmg})  TO ${paizoProgression[newDmgIndex]}`)
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
        return {name: skillName, subName: x.subName, value: x.value};
    });

    const combatManeuverFields = combatManeuverChanges(statblock, totalChanges.cmb, totalChanges.cmd);

    const advancementDirection = (IsUp) ? "↑" : "↓";
    const advancements = (statblock.advancements) ? statblock.advancements : [];
    const advancementsFromSize = {
        skills: newSkills,
        ...combatManeuverFields,
        size: sizeChange,
        ...acFieldsFromMods(acMods),
        melee_attacks: newMeleeAttacks,
        ranged_attacks: newRangedAttacks,
        advancements: [...advancements, `${endSize}`]
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
const abilityScoreList = ['str', 'dex', 'con', 'wis', 'int', 'cha'];
const abilityScoreChangesToString = (abilityScoreChanges) => {
    const scores = [];
    Object.keys(abilityScoreChanges).forEach(x => {
        if (abilityScoreList.indexOf(x) !== -1 && abilityScoreChanges[x]) {
            scores.push(`${x} ${withPlus(abilityScoreChanges[x])}`);
        }
    });
    return scores.join(', ');
}

export const advanceByAbilityScores = (statblock, abilityScoreChanges, chainedAdvancement = false) => {
    const newAbilityScores = applyAbilityScoreChanges(statblock.ability_scores, abilityScoreChanges);
    const savingThrowChangeStat = getSavingThrowChangesFromStatChanges(statblock.ability_scores, newAbilityScores, statblock.creature_type);
    //eventually figure out how to not even include change sets that are basically blank - zeroes for all 3 saving throws

    const statBonusDiffs = getStatBonusDifference(statblock.ability_scores, newAbilityScores);
    //console.debug("Advancing ability scores", statblock.name)
    const meleeAttacks = attackChanges(statblock.melee_attacks, statBonusDiffs.str, 0);
    const rangedAttacks = attackChanges(statblock.ranged_attacks, statBonusDiffs.dex, 0, false);
    const acFields = acChanges(statblock.armor_class.ac_modifiers.slice(0), statBonusDiffs);

    const currentHpEntries = statblock.hpEntries||[[hpChanges("racial", statblock.hitDice, statblock.hdType, statblock.creature_type, statBonusFromAbilityScore(statblock.ability_scores.con), statBonusFromAbilityScore(statblock.ability_scores.con), statblock.size)]];
    const hpEntries = currentHpEntries.map(hpe => {
        return hpChanges(hpe.source, hpe.hitDice, hpe.hdType, hpe.creatureType, statBonusFromAbilityScore(newAbilityScores.con), statBonusFromAbilityScore(newAbilityScores.cha), statblock.size);
    });

    const hpFields = {
        hp: hpEntriesDisplay(hpEntries) || statblock.hp,
        hpEntries: hpEntries,
        totalHitDice: calculateTotalHitDice(currentHpEntries)
    }
    const existingAdvancements = (statblock.advancements) ? statblock.advancements : [];
    //On some options change which name version --Pass options through
    const detailedStatsInNameOpt = false;
    const advancementDesc = (detailedStatsInNameOpt) ? `${abilityScoreChangesToString(abilityScoreChanges[0])}` : 'Stats Altered';
    const advancements = (chainedAdvancement) ? {} : {advancements: [...existingAdvancements, advancementDesc]};
    const existingAbilityScoreChanges = (statblock.abilityScoreChanges) ? statblock.abilityScoreChanges : [];

    const newSkills = statblock.skills.map(x => {
        const skillName = x.name.trim();
        const skillInfo = Skills.find(y => y.name === skillName);
        if (!skillInfo) throw new Error(`Did not find skill named: ${skillName} on creature ${statblock.name}`)
        const skillStat = skillInfo.abilityScore.toLowerCase();
        return {name: skillName, subName: x.subName, value: x.value + statBonusDiffs[skillStat]};
        // if (skillStat === 'Str') return {name: skillName, value: x.value + statBonusDiffs.str}
        // if (skillStat === 'Dex') return {name: skillName, value: x.value + statBonusDiffs.dex}
        // if (skillStat === 'Con') return {name: skillName, value: x.value + statBonusDiffs.con}
        // if (skillStat === 'Int') return {name: skillName, value: x.value + statBonusDiffs.int}
        // if (skillStat === 'Wis') return {name: skillName, value: x.value + statBonusDiffs.wis}
        // if (skillStat === 'Cha') return {name: skillName, value: x.value + statBonusDiffs.cha}
        // return {name: skillName, subName: x.subName, value: x.value};
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
        init: statblock.init + statBonusDiffs.dex,
        saving_throws: applyChangesToSavingThrows(statblock.saving_throws, [savingThrowChangeStat]),
        ability_scores: newAbilityScores,
        abilityScoreChanges: [...existingAbilityScoreChanges, ...abilityScoreChanges],
    };
}

const calculateTotalHitDice = (hpEntries) => {
    return hpEntries.map(x => x.hitDice).reduce((acc, cur) => acc + cur);
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
    const meleeAttacks = attackChanges(statblock.melee_attacks, 0, baseAttackDiff);
    const rangedAttacks = attackChanges(statblock.ranged_attacks, 0, baseAttackDiff, false);
    const newCombatFields = combatManeuverChanges(statblock, baseAttackDiff, baseAttackDiff);

    
    const hpEntry = hpChanges("racial", newHitDice, statblock.hdType, statblock.creature_type, statBonusFromAbilityScore(statblock.ability_scores.con), statBonusFromAbilityScore(statblock.ability_scores.con), statblock.size);
    const currentHpEntries = statblock.hpEntries||[hpEntry]
    const racialHpEntryIndex = currentHpEntries.findIndex(x => x.source === 'racial');
    if (racialHpEntryIndex !== -1) currentHpEntries[racialHpEntryIndex] = hpEntry;

    const hpFields = {
        hp: hpEntriesDisplay(currentHpEntries),
        hitDice: newHitDice,
        hpEntries: currentHpEntries,
        totalHitDice: calculateTotalHitDice(currentHpEntries)
    }
    const hitDiceAdvancements = {
        advancements: [`${withPlus(hdChange)} Hit Dice`],
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

    const statAdvancements = (statPointsPer4HitDiceAdded) ? advanceByAbilityScores(hitDiceAdvancedCreature, [abilityScoreChange], true) : {};
    return {
        ...hitDiceAdvancements,
        ...statAdvancements
    }
}

export const advanceByTemplate = (statblock, template) => {
    return {
        ...statblock,
        ...template(statblock)
    }
}

const getClass = (className) => {
    if (className === 'Barbarian')
        return barbarian;
    if (className === 'Bard')
        return bard;
    if (className === 'Cleric')
        return cleric;
    if (className === 'Druid')
        return druid;
    if (className === 'Fighter')
        return fighter;
    if (className === 'Paladin')
        return paladin;
    
}

const hpEntriesDisplay = (hpEntriesAll) => {
    let hpEntries = hpEntriesAll.slice(0);
    if (hpEntries.length === 0) return "";
    // array of hpDisplay, hitDice, hitPointAdjustment, avgHitPoints
    if (hpEntries.length > 1) {
        hpEntries = hpEntries.filter(x => x.hitDice > 0); //if we have other sources of hitDice we hide the 0hd entries
    }
    const totalAvgHp = hpEntries.map(x => x.avgHitPoints).reduce((agg, cur) => agg + cur);
    return `${totalAvgHp} (${hpEntries.map(x => x.hdDisplay).join(", ")})`;
}

const selectItems = (itemList, amount, generator, allowDuplicates = false) => {
    const selectableItems = itemList.slice(0);
    const selectedItems = [];
    for(let i = 1; i <= amount; i++) {
        const index = rollDice(1, selectableItems.length, generator).total - 1;
        const item = selectableItems[index];
        selectedItems.push(item);
        selectableItems.splice(index, 1);
    }
    return selectedItems;
}

const buildClassAbilitiesForLevel = (classInfo, level, generator) => {
    const classLevelsToApply = classInfo.levels.filter(x => x.level <= level);
    const selectedAbilities = [];
    const classAbilities = classLevelsToApply.map(classLevel => {
        const abilitiesForThisLevel = classLevel.classAbilities.map(x => {
            const fullAbility = classInfo.specialAbilities.find(sa => {
                return sa.name === x;
            });
            if (!fullAbility)
                console.error("FULL ABILITY MISSING", x)
            if (fullAbility.selection) {
                const validForLevelAbilities = (fullAbility.selectionLevelRestrictions) ? classInfo[fullAbility.selection].filter(x => classLevel.level >= x.minLevel) : classInfo[fullAbility.selection];
                const validAbilities = validForLevelAbilities.filter(x => !selectedAbilities.map(x => x.name).includes(x.name) || (x.multipleSelection))
                const preferredAbilities = (fullAbility.selectionLevelRestrictions && classLevel.level >= 8) ? validAbilities.filter(x => x.minLevel >= 8) : validAbilities; //basic preference for high level powers at 8th or above
                const index = rollDice(1, preferredAbilities.length, generator).total - 1;
                let selectedAbility = preferredAbilities[index];
                
                //The prereq for Night Vision is LowLight vision rage power or racial low light...this is not checking for racial as well...
                if (selectedAbility.prerequisite && (!selectedAbilities.map(x => x.name).includes(selectedAbility.prerequisite))) {
                    //has a prereq and we don't have it yet....so instead of this selection assign the prereq.
                    selectedAbility = validAbilities.find(x => x.name === selectedAbility.prerequisite);
                }
                selectedAbilities.push(selectedAbility);
                return {
                    ...fullAbility,
                    ...selectedAbility,
                    level: classLevel.level,
                    parentName: fullAbility.parentName,
                    name: `${selectedAbility.name}` //we depend on this name to trigger special class functions like Increased Damage Reduction
                }
            } else {
                return {
                    ...fullAbility,
                    level: classLevel.level
                }
            }
        });
        return abilitiesForThisLevel;
    });
    return classAbilities.flat();
}

const buildSpellsKnownOrPreparedSection = (statblock, classInfo, classLevel, generator) => {
    if (!classInfo.isCaster) return;
    //create prepared Spells info for Prepared Spells Section
    const spellsField = (classInfo.prepareSpells) ? 'spellsPerDay' : 'spellsKnown';
    const spellsFieldName = (classInfo.prepareSpells) ? 'spellsPreparedPerLevel': 'spellsKnownPerLevel';
    const level = classLevel.level;
    const className = classLevel.className;
    const spellCastingStatModifier = statBonusFromAbilityScore(statblock.ability_scores[classInfo.primaryAbilityScore]);
    const classLevelInfo = classInfo.levels.find(x => x.level === level);
    const spellsCountArray = classLevelInfo[spellsField];
    //TODO add in bonus spells to array. Better way to know what level classes start getting spells at all...?
    const zeroLevelSpells = (classInfo.hasOwnProperty('zeroLevelSpells')) ? classInfo.zeroLevelSpells : true;
    const spellLevelAdjust = (zeroLevelSpells) ? 0 : 1;
    const spellsByLevel = classInfo.spellsByLevel.slice(0);
    const spellsPerLevel = [];
    spellsCountArray.filter(x => x > 0).forEach((amountOfSpells, spellIndex) => {
        const spellLevel = spellIndex + spellLevelAdjust;
        if (amountOfSpells === 0) return;
        const spellsPerDayPerLevelSection = {
            level: spellLevel,
            spellsPerDay: (spellLevel === 0) ? 'infinite' : classLevelInfo[spellsField][spellLevel - 1],
            saveDc: 10 + spellLevel + spellCastingStatModifier,
            spells: selectItems(spellsByLevel[spellIndex], amountOfSpells, generator)
        }
        spellsPerLevel.push(spellsPerDayPerLevelSection);
    });
    const casterLevelAdjustment =  (classInfo.casterLevelAdjustment) ? classInfo.casterLevelAdjustment : 0;
    const casterLevel = level + casterLevelAdjustment;
    const spellsPerDaySectionWrapper = {
        source: className,
        casterLevel: casterLevel,
        concentration: casterLevel + spellCastingStatModifier,
        [spellsFieldName]: spellsPerLevel
    }

    const spellsKnownOrPrepared = (classInfo.prepareSpells) ? 'spellsPrepared' : 'spellsKnown';
    const spellsSection = (statblock[spellsKnownOrPrepared]) ? statblock[spellsKnownOrPrepared].push(spellsPerDaySectionWrapper) : [spellsPerDaySectionWrapper];
    return {
        [spellsKnownOrPrepared]: spellsSection
    };
}

//this assumes a simple max...eventually each skill might have a different max depending on it being a base class skill vs. racial hd as well as class.
const selectSkills = (itemList, amount, maxPoints, generator) => {
    const selectableItems = itemList.slice(0);
    const selectedItems = [];
    for(let i = 1; i <= amount; i++) {
        if (selectableItems.length === 0) break;
        const index = rollDice(1, selectableItems.length, generator).total - 1;
        const item = selectableItems[index];
        const currentSelected = selectedItems.find(x => x.skill.name === item.name && x.skill.subName === item.subName);
        const newVal = (currentSelected) ? currentSelected.value + 1 : 1
        if (currentSelected) {
            currentSelected.value++
        } else {
            selectedItems.push({skill: item, value: 1});
        }
        if (newVal === maxPoints)
            selectableItems.splice(index, 1);
    }
    return selectedItems;
}

export const advanceByClassLevel = (statblock, classLevel, generator) => {
    const classDisplayName = `${classLevel.className} ${classLevel.level}`;
    const newHitDice = classLevel.level;

    const classInfo = getClass(classLevel.className);
    if (!classInfo) return statblock;

    //hp changes are additive with classes. 
    const hpEntry = hpChanges(classDisplayName, newHitDice, classInfo.hitDieType, classLevel.className, statBonusFromAbilityScore(statblock.ability_scores.con), statBonusFromAbilityScore(statblock.ability_scores.con), statblock.size);
    const hpEntries = [...statblock.hpEntries, hpEntry];
    const hpFields = {
        hp: hpEntriesDisplay(hpEntries),
        hpEntries: hpEntries,
        totalHitDice: calculateTotalHitDice(statblock.hpEntries)
    }

    const goodSavingThrows = classInfo.good_saving_throws;
    const savingThrowBonusesFromClass = getSavingThrowChangesFromClass(newHitDice, goodSavingThrows);
    //const newBaseAttack =  getBaseAttackBonusByHitDiceAndCreatureType(newHitDice, statblock.creature_type);
    const newBaseAttack = calculateBaseAttackBonus(newHitDice, classInfo.base_attack_bonus);
    const baseAttackDiff = newBaseAttack;
    const meleeAttacks = attackChanges(statblock.melee_attacks, 0, baseAttackDiff);
    const rangedAttacks = attackChanges(statblock.ranged_attacks, 0, baseAttackDiff, false);
    const newCombatFields = combatManeuverChanges(statblock, baseAttackDiff, baseAttackDiff);

    const skillRanksEarned = (classInfo.skillRanksPerLevel + statBonusFromAbilityScore(statblock.ability_scores.int)) * classLevel.level;
    const currentSkills = statblock.skills.map(x => {
        return {
            ...x,
            name: x.name.trim(),
        }
    }).slice(0);
    const newClassSkillsFromClass = classInfo.classSkills.filter(x => {

        return !currentSkills.find(y => y.name === x.name && y.subName === x.subName);
    });
    //pick strategy - use all skills and just assign each point randomly.
    const skillsAssignedPoints = selectSkills([...classInfo.classSkills], skillRanksEarned, classLevel.level, generator);
    const pointsSpent = skillsAssignedPoints.map(x => x.value).reduce((acc, i) => acc + i);
    //console.log("Earned", skillRanksEarned, "Spent", pointsSpent, "assignments", skillsAssignedPoints)
    //update the current skills with the new values.  Then calculate the new ones.
    const updatedSkills = statblock.skills.map(x => {
        const skillName = x.name.trim();
        const matchingSkill = skillsAssignedPoints.find(y => y.skill.name === skillName && y.skill.subName === x.subName);
        const ranks = (matchingSkill) ? matchingSkill.value : 0;
        return {
            ...x,
            value: x.value + ranks
        };
    });

    const newSkills = newClassSkillsFromClass.filter(x => {
        const skillInfo = Skills.find(y => y.name === x.name);
        if (!skillInfo) throw new Error(`Did not find skill named: ${x} on creature ${statblock.name}`)
        const matchingSkill = skillsAssignedPoints.find(y => y.skill.name === x.name && y.skill.subName === x.subName);
        return matchingSkill;
    }).map(x => {
        const skillInfo = Skills.find(y => y.name === x.name);
        if (!skillInfo) throw new Error(`Did not find skill named: ${x} on creature ${statblock.name}`)
        const skillStat = skillInfo.abilityScore.toLowerCase();
        const abilityScoreBonus = statBonusFromAbilityScore(statblock.ability_scores[skillStat]) || 0;
        const matchingSkill = skillsAssignedPoints.find(y => y.skill.name === x.name && y.skill.subName === x.subName);
        //TODO: Probably not a ton of work to match skill focus for any skill...
        const skillFocusBonus = (x.name === 'Perception' && statblock.feats.includes('Skill Focus (Perception)')) ? 3 : 0;
        if (matchingSkill) {
            return {
                name: x.name,
                subName: x.subName,
                value: matchingSkill.value + 3 + abilityScoreBonus + skillFocusBonus
            };
        }
    });

    const allSkills = [...updatedSkills, ...newSkills];

    statblock = {
        ...statblock,
        skills: allSkills.sort((x, y) => {
            if (x.name < y.name) {
                return -1;
            }
            if (x.name > y.name) {
                return 1;
            }
            if (x.subName < y.subName) {
                return -1;
            }
            if (x.subName > y.subName) {
                return 1;
            }
            // names must be equal
            return 0;
        })
    }

    const classAbilities = buildClassAbilitiesForLevel(classInfo, classLevel.level, generator);
    const classAbilitiesToAdd = {
        source: classLevel.className,
        specialAbilities: classAbilities
    }

    const classAbilitiesWithAlterations = classAbilitiesToAdd.specialAbilities.filter(x => x.fieldToUpdate);
    const spellsKnownOrPrepared = buildSpellsKnownOrPreparedSection(statblock, classInfo, classLevel, generator);
    let classAbilityAdvancements = {
        ...statblock,
        ...spellsKnownOrPrepared,
    };
    const classAdvancement = classInfo.advancement;
    classAbilitiesWithAlterations.forEach(ca => {
        const classAdvancementFn = classAdvancement[ca.name];
        if (classAdvancementFn) {
            const field = classAdvancementFn(classAbilityAdvancements, classLevel.level, [...classAbilitiesWithAlterations]);
            if (ca.fieldToUpdate === 'acquiredSpecialAttacks') {
                //Currently class abilities that add special attacks add them to a new property acquiredSpecialAttacks (like a template) instead of trying to alter special_attacks field. This is due to special attacks being a string rather than an array of special attack objects. Using this approach we expect the output of the classAbilityFunction to be a display Function that will be resolved near the end of advancement
                const newSpecialAttack = [{sourceName: classLevel.className + " Class", displayFn: field}];
                const specialAttacksAcquired = (classAbilityAdvancements.specialAttacksAcquired) ? classAbilityAdvancements.specialAttacksAcquired.concat(newSpecialAttack) : newSpecialAttack;
                classAbilityAdvancements.specialAttacksAcquired = specialAttacksAcquired;
            } else {
                classAbilityAdvancements[ca.fieldToUpdate] = field;
            }
        }
    });
    const existingAdjustments = (classAbilityAdvancements.crAdjustments) ? classAbilityAdvancements.crAdjustments : [];

    //For Feats and featCount there is also a field additionalFeats that we started using with fighters to keep track of special additional feats with restrictions.

    const classAdvancements = {
        advancements: [...classAbilityAdvancements.advancements, classDisplayName],
        ...hpFields,
        base_attack: newBaseAttack + statblock.base_attack,
        melee_attacks: meleeAttacks,
        ranged_attacks: rangedAttacks,
        saving_throws: applyChangesToSavingThrows(classAbilityAdvancements.saving_throws, [savingThrowBonusesFromClass]),
        featCount: racialFeatCount(classAbilityAdvancements.hd + newHitDice), //this calculation is basically an aggregate of other advancements...we can recalculate each time however without a lot of cost.
        ...newCombatFields,
        classLevelAbilities: [...(classAbilityAdvancements.classLevelAbilities||[]), classAbilitiesToAdd],
        crAdjustments : [
            ...existingAdjustments,
            {source: classDisplayName, val: classLevel.level} //TODO: Adjust CR adjustment based on creature role.
        ],
    }

    const classAdvancedCreature = {
        ...classAbilityAdvancements,
        ...classAdvancements,
    }

    const statPointsPer4HitDiceAdded = Math.floor(newHitDice/4);
    const primaryAbilityScoreEntry = getStatByKey(classAdvancedCreature.ability_scores, classInfo.primaryAbilityScore);
    const abilityScoreChange = assignAbilityScoreChangeToStat(primaryAbilityScoreEntry, statPointsPer4HitDiceAdded, `${classLevel.className} ${classLevel.level}`);
    const statAdvancements = advanceByAbilityScores(classAdvancedCreature, [abilityScoreChange], true);
    return {
        ...classAdvancedCreature,
        ...statAdvancements
    }
}

