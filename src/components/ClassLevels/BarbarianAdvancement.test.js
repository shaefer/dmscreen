import BarbarianAdvancement from './BarbarianAdvancement'
import Behir from '../../models/Behir_v9'
it('increases land speed by 10', () => {
    const newFastMovement = BarbarianAdvancement.fastMovement(Behir);
    expect(newFastMovement).toEqual("50 ft., climb 20 ft.")
});

it('if no land speed change nothing', () => {
    const newFastMovement = BarbarianAdvancement.fastMovement({speed: 'swim 40 ft.'});
    expect(newFastMovement).toEqual("swim 40 ft.")
});

it('if no untyped DR exists, add it', () => {
    const newDr = BarbarianAdvancement.damageReduction({dr: '10/adamantine, 5/magic, 15/silver'}, 10);
    expect(newDr).toEqual("2/-, 10/adamantine, 5/magic, 15/silver")
});

it('ignore barbarian dr if untyped is already higher', () => {
    const newDr = BarbarianAdvancement.damageReduction({dr: '3/-'}, 10);
    expect(newDr).toEqual("3/-")
});

it('replace untyped DR if higher', () => {
    const newDr = BarbarianAdvancement.damageReduction({dr: '3/-'}, 16);
    expect(newDr).toEqual("4/-")
});

it('max 5 dr', () => {
    const newDr = BarbarianAdvancement.damageReduction({dr: '3/-'}, 30);
    expect(newDr).toEqual("5/-")
});

it('add dr with details when improved damage reduction is selected', () => {
    const improvedDr = { 
        "name":"Increased Damage Reduction",
        "minLevel":8,
        "multipleSelection":true,
        "specialAbilityType":"ex",
        "description":"The barbarian's damage reduction increases by 1/—. This increase is always active while the barbarian is raging. A barbarian can select this rage power up to three times. Its effects stack. A barbarian must be at least 8th level before selecting this rage power.",
        fieldToUpdate: 'dr'
      }
    const newDr = BarbarianAdvancement.increasedDamageReduction({dr: '5/-'}, null, [improvedDr])
    expect(newDr).toEqual("5/- (6/- while raging)")
});

it('add dr multiple times with details when improved damage reduction is selected', () => {
    const improvedDr = { 
        "name":"Increased Damage Reduction",
        "minLevel":8,
        "multipleSelection":true,
        "specialAbilityType":"ex",
        "description":"The barbarian's damage reduction increases by 1/—. This increase is always active while the barbarian is raging. A barbarian can select this rage power up to three times. Its effects stack. A barbarian must be at least 8th level before selecting this rage power.",
        fieldToUpdate: 'dr'
      }
    const newDr = BarbarianAdvancement.increasedDamageReduction({dr: '5/-'}, null, [improvedDr, improvedDr, improvedDr])
    expect(newDr).toEqual("5/- (8/- while raging)")
});