import Advancement from './MonkAdvancement'
import Behir from '../../models/Behir_v9'
import seedrandom from 'seedrandom'
import Monsters from '../../models/Monsters'

it('ac bonus should return a acMod of type "Monk" with mod function to resolve based on full Monster  (so that wis is calculated at display time)', () => {
    const opts = {
        monster: Behir,
        level: 19,
    }
    const result = Advancement.acBonus(opts);
    expect(result.armor_class.ac_modifiers.length).toEqual(5);
    expect(result.armor_class.ac_modifiers.find(x => x.type === 'Monk').mod).toEqual(4);
    expect(result.armor_class.ac_modifiers.find(x => x.type === 'Wis').mod(Behir)).toEqual(2);
});

it('add monk and wis bonus mods and calculate based on level and wis', () => {
    const behirPlus = {
        ...Behir,
        ability_scores: {
            ...Behir.ability_scores,
            wis: 16
        }
    }
    const opts = {
        monster: behirPlus,
        level: 20,
    }
    const result = Advancement.acBonus(opts);
    expect(result.armor_class.ac_modifiers.length).toEqual(5);
    expect(result.armor_class.ac_modifiers.find(x => x.type === 'Monk').mod).toEqual(5);
    expect(result.armor_class.ac_modifiers.find(x => x.type === 'Wis').mod(behirPlus)).toEqual(3);
});

it('flurry of blows in sq list', () => {
    const opts = {
        monster: Behir,
        level: 1
    };
    const result = Advancement.flurryOfBlows(opts);
    expect(result.special_qualities).toEqual('flurry of blows');
});

it('stunning fist in acquiredSpecialAttacks with times per day equal to monk level plus other hitDice / 4. and DC === wisBonus + 1/2 of all hitDice + 10', () => {
    const monkLevels = 10;
    const opts = {
        level: monkLevels
    };
    const resultFn = Advancement.stunningFist(opts);

    const advancedBehir = {
        totalHitDice: Behir.hitDice + monkLevels,
        ability_scores: {
            wis: 14 //+2
        }
    }
    //times === 2 for the 10 behir hd, and 10 for the 10 monk levels. 
    //DC = 10 for the total of 20 hitdice and 2 for the wis of 14.
    //format:     //stunning fist (20/day, DC 27)
    expect(resultFn(advancedBehir)).toEqual('stunning fist (12/day, DC 22)');
});

it('add evasion to defensive abilities does not duplicate', () => {
    const alteredBehir = {
        ...Behir,
        defensive_abilities: 'defensive awesomeness, evasion'
    }
    const opts = {monster: alteredBehir};
    const changes = Advancement.evasion(opts);
    expect(changes.defensive_abilities).toEqual("defensive awesomeness, evasion")
});

it('bonus feat selects a monk feat', () => {
    //selections of feats will be done at each level and we jsut aggregate them here...
    const selectedFeats = [
        {name: 'Feat1', originalName: 'Bonus Feat Selection', parentName: 'BonusFeat'},
        {name: 'Feat2', originalName: 'Bonus Feat Selection', parentName: 'BonusFeat'},
        {name: 'Feat3', originalName: 'Bonus Feat Selection', parentName: 'BonusFeat'},
        {name: 'Feat4', originalName: 'Bonus Feat Selection', parentName: 'BonusFeat'},
    ];
    const classAbilities = [
        ...selectedFeats,
        {name: 'Other Class Ability'},
    ];
    const opts = {monster: Behir, level: 12, classAbilities: classAbilities};
    const result = Advancement.bonusFeat(opts);
    //, feats: ['featA1', 'featA2', 'featA3', 'featA4', 'featB1', 'featB2', 'featC1']
    expect(result.additionalFeats).toEqual([{featRestrictions: 'monk', featCount: 4, source: 'monk', name: 'Monk Bonus Feats', feats:selectedFeats.map(x => x.name)}])
});

it('fast movement alters land speed and adds special_qualities entry', () => {
    const opts = {monster: Behir, level: 9};
    const result = Advancement.fastMovement(opts);
    expect(result.special_qualities).toBe("monk fast movement +30 ft.");
    expect(result.speed).toBe("70 ft., climb 20 ft.")
});

