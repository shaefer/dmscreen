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