import { advanceBySize } from './AdvanceMonster';
import Behir from '../../models/Behir_v9';

it('advance by size changes main size', () => {
    const result = advanceBySize(Behir, 'Colossal');
    expect(result.size).toBe('Colossal');
});

it('advance by size to a larger size changes ac', () => {
    const result = advanceBySize(Behir, 'Colossal');
    expect(result.ac).toBe('24, touch 3, flat-footed 23 (+1 Dex, +21 natural, -8 size)');
});

it('advance by size to a smaller size changes ac', () => {
    //21, touch 9, flat-footed 20 (+1 Dex, +12 natural, -2 size)
    const result = advanceBySize(Behir, 'Medium');
    //+4 dex, -5 natural armor, +2 size ac
    expect(result.ac).toBe('20, touch 13, flat-footed 17 (+3 Dex, +7 natural, +0 size)');
});

it('advance by size creates a special name', () => {
    const result = advanceBySize(Behir, 'Medium');
    expect(result.advancements[0]).toBe('Decreased size from Huge to Medium');
});

it('advance by size changes main size', () => {
    const result = advanceBySize(Behir, 'Colossal');
    expect(result.advancements[0]).toBe('Increased size from Huge to Colossal');
});

it('advance by size changes cmb and cmd', () => {
    const result = advanceBySize(Behir, 'Colossal');
    //18 cmb (22 grapple), 29 cmd
    expect(result.cmb).toBe(24);
    expect(result.cmb_details).toBe("+24 (+28 grapple)")
});

it('advance by size changes cmb and cmd', () => {
    const result = advanceBySize(Behir, 'Colossal');
    //18 cmb (22 grapple), 29 cmd
    expect(result.cmd).toBe(35);
    expect(result.cmd_details).toBe("35 (can't be tripped)")
});