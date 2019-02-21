import {racialFeatCount, increaseHighestStat, assignAbilityScoreChangeToHighestStat} from './AdvancementUtils'
it('feat count is 1 + 1 per 2 hitdice beyond the first', () => {
    expect(racialFeatCount(1)).toBe(1);
    expect(racialFeatCount(2)).toBe(1);
    expect(racialFeatCount(3)).toBe(2);
    expect(racialFeatCount(4)).toBe(2);
    expect(racialFeatCount(5)).toBe(3);
});

it('increaseHighestStat finds highest stat and increases it', () => {
    const abilityScores = {
        str: 10,
        dex: 11,
        con: 12,
        int: 16,
        wis: 13,
        cha: 8
    };
    const result = increaseHighestStat(abilityScores, 10);
    expect(result.int).toBe(26);
});

it('create a set of changes to abilityScores', () => {
    const abilityScores = {
        str: 10,
        dex: 11,
        con: 12,
        int: 16,
        wis: 13,
        cha: 8
    };
    const result = assignAbilityScoreChangeToHighestStat(abilityScores, 10);
    expect(result.str).toBe(0);
    expect(result.dex).toBe(0);
    expect(result.con).toBe(0);
    expect(result.int).toBe(10);
    expect(result.wis).toBe(0);
    expect(result.cha).toBe(0);
});

it('create a set of changes to abilityScores with 0 sent as change.', () => {
    const abilityScores = {
        str: 10,
        dex: 11,
        con: 12,
        int: 16,
        wis: 13,
        cha: 8
    };
    const reason = "because"
    const result = assignAbilityScoreChangeToHighestStat(abilityScores, 0, reason);
    expect(result.str).toBe(0);
    expect(result.dex).toBe(0);
    expect(result.con).toBe(0);
    expect(result.int).toBe(0);
    expect(result.wis).toBe(0);
    expect(result.cha).toBe(0);
    expect(result.reason).toBe(reason)
});