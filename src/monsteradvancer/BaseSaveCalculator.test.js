import {calculateBadSave, calculateGoodSave} from './BaseSaveCalculator'

it('bad Save is about 1/3', () => {
    expect(calculateBadSave(1)).toBe(0);
    expect(calculateBadSave(2)).toBe(0);
    expect(calculateBadSave(3)).toBe(1);
    expect(calculateBadSave(15)).toBe(5);
    expect(calculateBadSave(16)).toBe(5);
    expect(calculateBadSave(17)).toBe(5);
    expect(calculateBadSave(18)).toBe(6);
});

it('good Save is about 1/2 + 2', () => {
    expect(calculateGoodSave(1)).toBe(2);
    expect(calculateGoodSave(2)).toBe(3);
    expect(calculateGoodSave(12)).toBe(8);
    expect(calculateGoodSave(20)).toBe(12);
});