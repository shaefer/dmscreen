import { advanceMonster } from '../AdvanceMonster'
import Behir from '../../../models/Behir_v9'
import AngelAstralDeva from '../../../models/AngelAstralDeva'
import ProteanVoidWorm from '../../../models/ProteanVoidworm'
import Allosaurus from '../../../models/DinosaurAllosaurus'
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

it ('update sr if newCr + 5 is greater in this case no', () => {
    expect(AngelAstralDeva.sr).toBe(25);
    const advancedAngel = advanceMonster(AngelAstralDeva, {template:Fiendish});
    expect(advancedAngel.sr).toBe(25);
});

it ('add sr newCr + 5 ', () => {
    expect(Behir.sr).toBeUndefined();
    const advancedCreature = advanceMonster(Behir, {template:Fiendish});
    expect(advancedCreature.sr).toBe(14);
});

it ('update Darkvision when lower than 60ft.', () => {
    expect(ProteanVoidWorm.senses).toBe('blindsense 30 ft., darkvision 30 ft., detect law; Perception +8');
    const advancedCreature = advanceMonster(ProteanVoidWorm, {template:Fiendish});
    expect(advancedCreature.senses).toBe('blindsense 30 ft., darkvision 60 ft., detect law; Perception +8');
});

it ('add Darkvision when not exists', () => {
    expect(Allosaurus.senses).toBe('low-light vision, scent; Perception +28');
    const advancedCreature = advanceMonster(Allosaurus, {template:Fiendish});
    expect(advancedCreature.senses).toBe('darkvision 60 ft., low-light vision, scent; Perception +28');
});
