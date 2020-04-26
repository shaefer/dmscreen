import Advancement from './RangerAdvancement'
import Behir from '../../models/Behir_v9'
import seedrandom from 'seedrandom'

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
    const favoredEnemy3 = {
        name: "C Beast",
        parentName: "Favored Enemy"
    }
    const favoredEnemy4 = {
        name: "D Beast",
        parentName: "Favored Enemy"
    }
    const someOtherClassAbility = {
        name: 'Favored Terrain'
    }
    const opts = {
        monster: Behir,
        level: 1,
        classAbilities: [favoredEnemy, favoredEnemy2, favoredEnemy3, favoredEnemy4, someOtherClassAbility],
        generator: seedrandom("fixedSeed3")
    }
    const result = Advancement.favoredEnemy(opts);
    expect(result.special_qualities).toEqual("Favored Enemies: Some Beast +2/Another Beast +6/C Beast +4/D Beast +2");
});

it('favored terrain should add a special quality', () => {
    const favoredEnemy = {
        name: "Some Beast",
        parentName: "Favored Enemy",
        fieldToUpdate: ['special_qualities']
    }
    const favoredTerrain = {
        name: 'Planes',
        parentName: "Favored Terrain"
    }
    const favoredTerrain2 = {
        name: 'Hills',
        parentName: "Favored Terrain"
    }
    const favoredTerrain3 = {
        name: 'Underground',
        parentName: "Favored Terrain"
    }
    const opts = {
        monster: Behir,
        classAbilities: [favoredEnemy, favoredTerrain, favoredTerrain2, favoredTerrain3],
        generator: seedrandom("fixedSeed3")
    }
    const result = Advancement.favoredTerrain(opts);
    expect(result.special_qualities).toEqual("Favored Terrain: Planes +2/Hills +4/Underground +4");
});


it('combat style selections should add to feat lists', () => {
    const combatStyle = {
        name: 'Combat Style Feat',
        isParent: true
    }
    const combatStyleSelection = {
        name: 'Crossbow',
        parentName: 'Combat Style Feat',
        originalName: 'Combat Style Selection'
    }
    
    const combatStyleFeatSelection2 = {
        name: 'Crossbow Mastery',
        parentName: "Combat Style"
    }
    const combatStyleFeatSelection = {
        name: 'Precise Shot',
        parentName: "Combat Style"
    }
    const opts = {
        monster: Behir,
        level: 6,
        classAbilities: [combatStyle, combatStyleSelection, combatStyleFeatSelection, combatStyleFeatSelection2]
    }
    const result = Advancement.combatStyle(opts);
    expect(result.classFeats['Ranger']).toEqual([{name: 'Crossbow Mastery'}, {name: 'Precise Shot'}]);
});