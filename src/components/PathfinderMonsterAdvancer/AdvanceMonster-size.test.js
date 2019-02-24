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