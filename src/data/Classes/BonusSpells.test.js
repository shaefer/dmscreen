import {bonusSpellsChart, calcBonusSpells} from './BonusSpells';

const checkRowMatch = (array1, array2) => {
    expect(array1).toEqual(array2);
}

it('calculation should match the chart', () => {
    for (let i = 0;i <= bonusSpellsChart.length - 1; i++) {
        const bonusSpellsForPlus = bonusSpellsChart[i];
        const calculatedBonusSpellsForPlus = calcBonusSpells(i);
        checkRowMatch(bonusSpellsForPlus, calculatedBonusSpellsForPlus);
    }
});

it('calculation should work beyond the chart', () => {
    const extrapolatedRow18Bonus = [0, 5, 5, 4, 4, 4, 4, 3, 3, 3];
    const extrapolatedRow19Bonus = [0, 5, 5, 5, 4, 4, 4, 4, 3, 3];
    const extrapolatedRow20Bonus = [0, 5, 5, 5, 5, 4, 4, 4, 4, 3];
    checkRowMatch(extrapolatedRow18Bonus, calcBonusSpells(18));
    checkRowMatch(extrapolatedRow19Bonus, calcBonusSpells(19));
    checkRowMatch(extrapolatedRow20Bonus, calcBonusSpells(20));
});

//if you don't have at least a +0 (10 or above score) you can't cast spells for that ability/class anyway.
it('calculation returns all zeros for negative ability score bonuses', () => {
    checkRowMatch([0,0,0,0,0,0,0,0,0,0], calcBonusSpells(-1));
    checkRowMatch([0,0,0,0,0,0,0,0,0,0], calcBonusSpells(-10));
});