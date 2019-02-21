import {racialFeatCount} from './AdvancementUtils'
it('feat count is 1 + 1 per 2 hitdice beyond the first', () => {
    expect(racialFeatCount(1)).toBe(1);
    expect(racialFeatCount(2)).toBe(1);
    expect(racialFeatCount(3)).toBe(2);
    expect(racialFeatCount(4)).toBe(2);
    expect(racialFeatCount(5)).toBe(3);
});