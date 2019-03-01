import { getSavingThrowChangesFromStatChanges } from '../AdvancementUtils'

it('getSavingThrowChangeFromStatChanges properly handled odd to even stat changes +1', () => {
    const origStats = {
        str: 10,
        dex: 11,
        con: 12,
        int: 16,
        wis: 13,
        cha: 8
    };
    const newStats = {
        str: 10,
        dex: 12,
        con: 12,
        int: 16,
        wis: 13,
        cha: 8
    };
    const result = getSavingThrowChangesFromStatChanges(origStats, newStats);
    expect(result).toEqual({
        fort: 0,
        ref: 1,
        will: 0,
    });
});

it('getSavingThrowChangeFromStatChanges properly handled odd to odd stat changes +1', () => {
    const origStats = {
        str: 10,
        dex: 11,
        con: 12,
        int: 16,
        wis: 13,
        cha: 8
    };
    const newStats = {
        str: 10,
        dex: 13,
        con: 12,
        int: 16,
        wis: 13,
        cha: 8
    };
    const result = getSavingThrowChangesFromStatChanges(origStats, newStats);
    expect(result).toEqual({
        fort: 0,
        ref: 1,
        will: 0,
    });
});

it('getSavingThrowChangeFromStatChanges properly handled even to odd stat changes +0', () => {
    const origStats = {
        str: 10,
        dex: 11,
        con: 12,
        int: 16,
        wis: 13,
        cha: 8
    };
    const newStats = {
        str: 10,
        dex: 11,
        con: 13,
        int: 16,
        wis: 13,
        cha: 8
    };
    const result = getSavingThrowChangesFromStatChanges(origStats, newStats);
    expect(result).toEqual({
        fort: 0,
        ref: 0,
        will: 0,
    });
});

it('getSavingThrowChangeFromStatChanges properly handled even to even stat changes +1', () => {
    const origStats = {
        str: 10,
        dex: 11,
        con: 12,
        int: 16,
        wis: 13,
        cha: 8
    };
    const newStats = {
        str: 10,
        dex: 11,
        con: 14,
        int: 16,
        wis: 13,
        cha: 8
    };
    const result = getSavingThrowChangesFromStatChanges(origStats, newStats);
    expect(result).toEqual({
        fort: 1,
        ref: 0,
        will: 0
    });
});

it('getSavingThrowChangeFromStatChanges properly handles multiple changes', () => {
    const origStats = {
        str: 10,
        dex: 11,
        con: 12,
        int: 16,
        wis: 13,
        cha: 8
    };
    const newStats = {
        str: 10,
        dex: 13,
        con: 14,
        int: 16,
        wis: 15,
        cha: 8
    };
    const result = getSavingThrowChangesFromStatChanges(origStats, newStats);
    expect(result).toEqual({
        fort: 1,
        ref: 1,
        will: 1
    });
});

it('getSavingThrowChangeFromStatChanges properly handles undead', () => {
    const origStats = {
        str: 10,
        dex: 11,
        con: 12,
        int: 16,
        wis: 13,
        cha: 8
    };
    const newStats = {
        str: 10,
        dex: 13,
        con: 14,
        int: 16,
        wis: 15,
        cha: 16
    };
    const result = getSavingThrowChangesFromStatChanges(origStats, newStats, "Undead");
    expect(result).toEqual({
        fort: 4,
        ref: 1,
        will: 1
    });
});