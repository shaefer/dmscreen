import {racialFeatCount, increaseHighestStat, assignAbilityScoreChangeToHighestStat, applyAbilityScoreChanges,
        getSavingThrowChangesFromStatChanges, displayArmorClass} from './AdvancementUtils'
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

it('apply changes changes stats', () => {
    const abilityScores = {
        str: 10,
        dex: 11,
        con: 12,
        int: 16,
        wis: 13,
        cha: 8
    };
    const changes = {
        str: 10,
        dex: 10,
        con: 10,
        int: 10,
        wis: 10,
        cha: 10
    };
    const changes2 = {
        str: 1,
        dex: 1,
        con: 1,
        int: 1,
        wis: 1,
        cha: 1
    };
    const result = applyAbilityScoreChanges(abilityScores, [changes, changes2]);
    expect(result.str).toBe(21);
    expect(result.dex).toBe(22);
    expect(result.con).toBe(23);
    expect(result.int).toBe(27);
    expect(result.wis).toBe(24);
    expect(result.cha).toBe(19);
});

it('armor class function builds ac display line', () => {
    const acMods = [
    {
        "mod": 1,
        "type": "Dex"
    },
    {
        "mod": 12,
        "type": "natural"
    },
    {
        "mod": -2,
        "type": "size"
    }];
    expect(displayArmorClass({}, acMods)).toBe('21, touch 9, flat-footed 20 (+1 Dex, +12 natural, -2 size)')
});
