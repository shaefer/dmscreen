export const avgHitPoints = (hdType) => {
    return hdType / 2 + 0.5;
}

export const statBonusFromAbilityScore = (abilityScore) => {
    return Math.floor((abilityScore - 10) / 2);
}

export const racialFeatCount = (hitDice) => {
    return Math.round(hitDice / 2); //every 2 hitdice at odd levels 1 + 1 for every 2 so 1 = 1, 2 = 1, 3 = 2;
}

export const withPlus = (stat) => {
    return (stat >= 0) ? `+${stat}` : stat;
}

const getHighestStat = (abilityScores) => {
    const stats = Object.entries(abilityScores);
    const highestStat = stats.sort((a,b) => b[1] - a[1])[0];
    return highestStat;
}

export const increaseHighestStat = (abilityScores, statChange, reason) => {
    //TODO: Ensure we have polyfilled.
    const highestStat = getHighestStat(abilityScores);
    const newAbilityScore = {
        [highestStat[0]]: highestStat[1] + statChange,
        reason
    }
    return {
        ...abilityScores,
        ...newAbilityScore
    };
}

export const assignAbilityScoreChangeToHighestStat = (abilityScores, statChange, reason) => {
    //TODO: Ensure we have polyfilled.
    const highestStat = getHighestStat(abilityScores);
    const newAbilityScore = {[highestStat[0]]: statChange}
    const emptyAbilityScores = {
        str:0,dex:0,con:0,int:0,wis:0,cha:0,
        reason
    };
    return {
        ...emptyAbilityScores,
        ...newAbilityScore
    };
}