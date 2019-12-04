import { advanceMonster } from '../AdvanceMonster'
import Behir from '../../../models/Behir_v9'
import AngelAstralDeva from '../../../models/AngelAstralDeva'
import { Fiendish } from '../AdvancementTools/Templates';

it('add resistance if none exists', () => {
    expect(Behir.resist).toBeUndefined();
    const advancedBehir = advanceMonster(Behir, {template:Fiendish});
    expect(advancedBehir.resist).toBe('cold 10, fire 10');
    expect(advancedBehir.dr).toBe('5/good');
});

it ('change resistance if one exists', () => {
    expect(AngelAstralDeva.resist).toBe('electricity 10, fire 10');
    expect(AngelAstralDeva.dr).toBe('10/evil');
    const advancedAngel = advanceMonster(AngelAstralDeva, {template:Fiendish});
    expect(advancedAngel.resist).toBe('cold 15, electricity 10, fire 15');
    expect(advancedAngel.dr).toBe('10/good');
});