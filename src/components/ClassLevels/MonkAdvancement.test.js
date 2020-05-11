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

it('add improved evasion to defensive abilities does not duplicate', () => {
    const alteredBehir = {
        ...Behir,
        defensive_abilities: 'defensive awesomeness, evasion'
    }
    const opts = {monster: alteredBehir};
    const changes = Advancement.improvedEvasion(opts);
    expect(changes.defensive_abilities).toEqual("defensive awesomeness, improved evasion")
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

it('still mind adds +2 to wills saves against enchantment', () => {
    const opts = {monster: Behir, level: 9};
    const result = Advancement.stillMind(opts);

    expect(result.saving_throws.willDetails[0]).toEqual({bonus: 2, details: 'enchantment', source: 'Still Mind'});
});

it('ki pool shows in special_qualities', () => {
    const opts = {monster: Behir, level: 10};
    const result = Advancement.kiPool(opts);
//1/2 monk level + wis bonus (2)
//4 - magic, 7 - cold iron and silver, 10 - lawful, 16 - adamantine
    expect(result.special_qualities).toBe("ki pool (7 points, cold iron and silver, lawful, magic)")
});

it('slow fall shows in special_qualities', () => {
    const opts = {monster: Behir, level: 10};
    const result = Advancement.slowFall(opts);

    expect(result.special_qualities).toBe("slow fall (50 ft.)");
});

it('slow fall shows in special_qualities with any distance when maxed out', () => {
    const opts = {monster: Behir, level: 20};
    const result = Advancement.slowFall(opts);

    expect(result.special_qualities).toBe("slow fall (any distance)");
});

it('purity of body adds immune diseases (including magical and supernatural)', () => {
    const opts = {monster: Behir, level: 5};
    const result = Advancement.purityOfBody(opts);

    expect(result.immune).toBe("disease, electricity");
});

it('purity of body adds  to immune list (also alphabetically)', () => {
    const alteredBehir = {
        ...Behir,
        immune: 'ants, electricity'
    }
    const opts = {monster: alteredBehir, level: 5};
    const result = Advancement.purityOfBody(opts);

    expect(result.immune).toBe("ants, disease, electricity");
});

it('diamond body add immune poison', () => {
    const opts = {monster: Behir, level: 11};
    const result = Advancement.diamondBody(opts);

    expect(result.immune).toBe("electricity, poison");
});

it('diamond soul gains sr level + 10', () => {
    const opts = {monster: Behir, level: 13};
    const result = Advancement.diamondSoul(opts);

    expect(result.sr).toBe(23);
});

it('diamond soul higher sr wins', () => {
    const alteredBehir = {
        ...Behir,
        sr: 25
    }
    const opts = {monster: alteredBehir, level: 13};
    const result = Advancement.diamondSoul(opts);

    expect(result.sr).toBe(25);
});

it('quivering palm adds to acquiredSpecialAttacks', () => {
    const opts = {level: 20}; //monster parts are calculated during evaluation of the function.
    const resultFn = Advancement.quiveringPalm(opts);

    //1/2 monk + 10 + wis
    expect(resultFn(Behir)).toBe("quivering palm (DC 22)");
});

it('perfect self grants dr 10/chaotic', () => {
    const opts = {monster: Behir, level: 20};
    const result = Advancement.perfectSelf(opts);

    expect(result.dr).toBe("10/chaotic");
});

it('perfect self adds dr 10/chaotic', () => {
    const alteredBehir = {
        ...Behir,
        dr: "10/-, 5/evil"
    }
    const opts = {monster: alteredBehir, level: 20};
    const result = Advancement.perfectSelf(opts);

    expect(result.dr).toBe("10/-, 10/chaotic, 5/evil");
});


