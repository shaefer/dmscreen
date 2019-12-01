import {advanceByHitDice} from './AdvanceMonster'
import Behir from '../../models/Behir_v9';
it('advance by hit dice sets hp fields', () => {
    const behirPlus4Hd = advanceByHitDice(Behir, 4);
    expect(behirPlus4Hd.hp).toBe("147 (14d10+70)")
    expect(behirPlus4Hd.hitDice).toBe(14);
    expect(behirPlus4Hd.hitPointAdjustment).toBe(70);
});

it('advance by hit dice creates abilityScore changes', () => {
    const behirPlus4Hd = advanceByHitDice(Behir, 4);
    expect(behirPlus4Hd.ability_scores).toEqual({
        str: 24,
        dex: 12,
        con: 21,
        int: 7,
        wis: 14,
        cha: 12
    });
    expect(behirPlus4Hd.abilityScoreChanges).toEqual([
        {
            str: 1,
            dex: 0,
            con: 0,
            int: 0,
            wis: 0,
            cha: 0,
            reason: "Advanced Creature 4 Hit Dice"
        }
    ]);
});

it('advance by hit dice creates featCount', () => {
    const behirPlus4Hd = advanceByHitDice(Behir, 4);
    expect(behirPlus4Hd.featCount).toBe(7);
});

it('advance by hit dice creates advancename field', () => {
    const behirPlus4Hd = advanceByHitDice(Behir, 4);
    expect(behirPlus4Hd.advancements[0]).toBe("+4 Hit Dice");
});

//TODO: Should each advancement provide a calculated change to CR? That might be awesome.
