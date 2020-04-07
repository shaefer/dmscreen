export const bonusSpellsChart = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 2, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 2, 2, 1, 1, 1, 1, 0, 0, 0],
    [0, 2, 2, 2, 1, 1, 1, 1, 0, 0],
    [0, 2, 2, 2, 2, 1, 1, 1, 1, 0],
    [0, 3, 2, 2, 2, 2, 1, 1, 1, 1],
    [0, 3, 3, 2, 2, 2, 2, 1, 1, 1],
    [0, 3, 3, 3, 2, 2, 2, 2, 1, 1],
    [0, 3, 3, 3, 3, 2, 2, 2, 2, 1],
    [0, 4, 3, 3, 3, 3, 2, 2, 2, 2],
    [0, 4, 4, 3, 3, 3, 3, 2, 2, 2],
    [0, 4, 4, 4, 3, 3, 3, 3, 2, 2],
    [0, 4, 4, 4, 4, 3, 3, 3, 3, 2],
    [0, 5, 4, 4, 4, 4, 3, 3, 3, 3],
];

export const calcBonusSpells = (abilityScoreBonus) => {
    const levelBonuses = [
        0,
        Math.max(0, Math.floor((abilityScoreBonus + 3) / 4)),
        Math.max(0, Math.floor((abilityScoreBonus + 2) / 4)),
        Math.max(0, Math.floor((abilityScoreBonus + 1) / 4)),
        Math.max(0, Math.floor((abilityScoreBonus + 0) / 4)),
        Math.max(0, Math.floor((abilityScoreBonus + -1) / 4)),
        Math.max(0, Math.floor((abilityScoreBonus + -2) / 4)),
        Math.max(0, Math.floor((abilityScoreBonus + -3) / 4)),
        Math.max(0, Math.floor((abilityScoreBonus + -4) / 4)),
        Math.max(0, Math.floor((abilityScoreBonus + -5) / 4))
    ];
    return levelBonuses;  
}