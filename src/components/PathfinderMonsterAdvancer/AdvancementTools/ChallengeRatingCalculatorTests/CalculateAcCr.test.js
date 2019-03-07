import {calculateAcCr} from '../ChallengeRatingCalculator'

it('hps gets the lowest entry that matches or is lower than the hp provided', () => {
    expect(calculateAcCr(23)).toBe(9);
    expect(calculateAcCr(22)).toBe(8);
    expect(calculateAcCr(21)).toBe(8);
});