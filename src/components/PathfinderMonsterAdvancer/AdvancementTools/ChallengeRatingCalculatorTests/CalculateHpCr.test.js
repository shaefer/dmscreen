import {calculateHpCr} from '../ChallengeRatingCalculator'

it('hps gets the lowest entry that matches or is lower than the hp provided', () => {
    expect(calculateHpCr(15)).toBe(1);
    expect(calculateHpCr(16)).toBe(1);
    expect(calculateHpCr(120)).toBe(9);
});