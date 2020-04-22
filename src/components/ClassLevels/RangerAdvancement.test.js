import Advancement from './RangerAdvancement'
import Behir from '../../models/Behir_v9'

it('favored enemy should add a special quality', () => {
    const favoredEnemy = {
        name: "Some Beast",
        parentName: "Favored Enemy",
        fieldToUpdate: ['special_qualities']
    }
    const someOtherClassAbility = {
        name: 'Favored Terrain'
    }
    const opts = {
        monster: Behir,
        level: 1,
        classAbilities: [favoredEnemy, someOtherClassAbility]
    }
    const result = Advancement.favoredEnemy(opts);
    expect(result.special_qualities).toEqual("Favored Enemies: Some Beast +2");
});

it('favored enemy should sort and arrange each one', () => {
    const favoredEnemy = {
        name: "Some Beast",
        parentName: "Favored Enemy",
        fieldToUpdate: ['special_qualities']
    }
    const favoredEnemy2 = {
        name: "Another Beast",
        parentName: "Favored Enemy",
        fieldToUpdate: ['special_qualities']
    }
    const someOtherClassAbility = {
        name: 'Favored Terrain'
    }
    const opts = {
        monster: Behir,
        level: 1,
        classAbilities: [favoredEnemy, favoredEnemy2, someOtherClassAbility]
    }
    const result = Advancement.favoredEnemy(opts);
    expect(result.special_qualities).toEqual("Favored Enemies: Some Beast +4/Another Beast +2");
});

it('favored enemy should add a special quality', () => {
    const favoredEnemy = {
        name: "Some Beast",
        parentName: "Favored Enemy",
        fieldToUpdate: ['special_qualities']
    }
    const favoredTerrain = {
        name: 'Planes',
        parentName: "Favored Terrain"
    }
    const opts = {
        monster: Behir,
        level: 1,
        classAbilities: [favoredEnemy, favoredTerrain]
    }
    const result = Advancement.favoredTerrain(opts);
    expect(result.special_qualities).toEqual("Favored Terrain: Planes +2");
});