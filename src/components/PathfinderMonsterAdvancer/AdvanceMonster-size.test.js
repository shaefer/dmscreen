import { advanceBySize } from './AdvanceMonster';
import Behir from '../../models/Behir_v9';

it('advance by size changes main size', () => {
    const result = advanceBySize(Behir, 'Colossal');
    expect(result.size).toBe('Colossal');
});

it('advance by size changes ac', () => {
    console.log("ADVANCE BY SIZE TEST 2", Behir.armor_class.ac_modifiers)
    const result = advanceBySize(Behir, 'Colossal');
    expect(result.ac).toBe('24, touch 3, flat-footed 23 (+1 Dex, +21 natural, -8 size)');
});