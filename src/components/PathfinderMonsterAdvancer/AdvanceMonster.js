import { statBonusFromAbilityScore, racialFeatCount, withPlus, 
    assignAbilityScoreChangeToHighestStat, applyAbilityScoreChanges,
    getSavingThrowChangesFromHitDice, applyChangesToSavingThrows, hpDisplay } from './AdvancementUtils'

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
    
    const hpFields = hpChanges(newHitDice, statblock.hdType, statBonusFromAbilityScore(statblock.ability_scores.con));
    return {
        advancedName: `${statblock.name} (Advanced ${hdChange} Hit Dice)`,
        ...hpFields,
        saving_throws: applyChangesToSavingThrows(statblock.saving_throws, [savingThrowChange]),
        featCount: racialFeatCount(newHitDice),
        ability_scores: newAbilityScores,
        abilityScoreChanges: [abilityScoreChange],
    }
}

