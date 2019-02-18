export const advanceMonster = (statblock, advancement) => {
    if (advancement.hd || true) {
        //add hd -> increases hd, increases hp, saves, feat count, saving throws, bonus stat point awards, cr, exp
        const newHitDice = statblock.hitDice + advancement.hd;
        const newHitPointsAdjustment = statBonusFromAbilityScore(statblock.ability_scores.con) * newHitDice;
        return {
            hp: hpDisplay(newHitDice, statblock.hdType, newHitPointsAdjustment),
            hitDice: newHitDice,
            hitPointAdjustment: newHitPointsAdjustment
        }
    }
}

const statBonusFromAbilityScore = (abilityScore) => {
    return Math.floor((abilityScore - 10) / 2);
}

const hpDisplay = (hd, hdType, bonusHp) => {
    const bonusHpStr = (bonusHp > 0) ? "+"+bonusHp : bonusHp;
    return Math.floor(hd * avgHitPoints(hdType)) + bonusHp + " (" + hd + "d" + hdType + bonusHpStr + ")";
}

const avgHitPoints = (hdType) => {
    return hdType / 2 + 0.5;
}