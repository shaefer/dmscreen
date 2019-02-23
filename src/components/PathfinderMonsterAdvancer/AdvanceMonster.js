import { statBonusFromAbilityScore, racialFeatCount, withPlus, 
    assignAbilityScoreChangeToHighestStat, applyAbilityScoreChanges,
    getSavingThrowChangesFromHitDice, applyChangesToSavingThrows, hpDisplay,
    getSavingThrowChangesFromStatChanges, getStatBonusDifference, displayArmorClass,
    calcTotalAc, calcFlatFootedAc, calcTouchAc, calcAvgHitPoints } from './AdvancementUtils'

export const advanceMonster = (statblock, advancement) => {
    if (advancement.hd) {
        return advanceByHitDice(statblock, advancement.hd);
    }
}

const hpChanges = (newHitDice, hdType, hpStatBonus) => {
    const newHitPointsAdjustment = hpStatBonus * newHitDice;
    return {
        hp: hpDisplay(newHitDice, hdType, newHitPointsAdjustment),
        hitDice: newHitDice,
        hitPointAdjustment: newHitPointsAdjustment,
        hitPoints: calcAvgHitPoints(newHitDice, hdType) + newHitPointsAdjustment
    }
}

const acChanges = (acMods, statBonusDiffs) => {
    let dexModIndex = acMods.findIndex(x => x.type === 'Dex');
    if (dexModIndex !== -1) {
        acMods[dexModIndex] = {mod: acMods[dexModIndex].mod + statBonusDiffs.dex, type: "Dex"};
    } else {
        acMods.push({mod: statBonusDiffs.dex, type: "Dex"});
    }
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

export const advanceByHitDice = (statblock, hdChange) => {
    //add hd -> namechange, increases hd, increases hp, saves, feat count, bonus stat point awards, cr, exp
    //is current save good or bad based on creatureType. (this probably is not enough with specialized feats)
    //determine increase to base from old and new hitDice change using good or bad save calculation.

    //increases stats has trickle down affect on a lot of things:
    //str -> melee attacks, str skills, str-based saves for special abilities
    //dex -> ac, init, reflex save, dex skills, dex-based saves for special abilities
    //con -> hp, fortitude save, con-based saves for special abilities
    //int -> skill points, int-based skills, int-based saves for special abilities
    //wis -> will save, wis skills, wis-based saves for special abilities
    //cha -> maybe deflection ac, cha skills, cha-based saves for special abilities
    const newHitDice = statblock.hitDice + hdChange;

    /** http://legacy.aonprd.com/bestiary/monsterAdvancement.html Step 3 ability scores states that every 4 hd added should result in a stat increase */
    const statPointsPer4HitDiceAdded = Math.floor(hdChange/4);
    const abilityScoreChange = assignAbilityScoreChangeToHighestStat(statblock.ability_scores, statPointsPer4HitDiceAdded, `${withPlus(hdChange)} Hit Dice`);
    const newAbilityScores = applyAbilityScoreChanges(statblock.ability_scores, [abilityScoreChange]);
    
    const savingThrowChange =  getSavingThrowChangesFromHitDice(statblock, newHitDice);
    const savingThrowChangeStat = getSavingThrowChangesFromStatChanges(statblock.ability_scores, newAbilityScores);
    //eventually figure out how to not even include change sets that are basically blank - zeroes for all 3 saving throws

    const statBonusDiffs = getStatBonusDifference(statblock.ability_scores, newAbilityScores);

    const acFields = acChanges(statblock.armor_class.ac_modifiers.slice(0), statBonusDiffs);
    const hpFields = hpChanges(newHitDice, statblock.hdType, statBonusFromAbilityScore(statblock.ability_scores.con));
    return {
        advancedName: `${statblock.name} (Advanced ${hdChange} Hit Dice)`,
        ...hpFields,
        ...acFields,
        init: statblock.init + statBonusDiffs.dex,
        saving_throws: applyChangesToSavingThrows(statblock.saving_throws, [savingThrowChange, savingThrowChangeStat]),
        featCount: racialFeatCount(newHitDice),
        ability_scores: newAbilityScores,
        abilityScoreChanges: [abilityScoreChange],
    }
}

