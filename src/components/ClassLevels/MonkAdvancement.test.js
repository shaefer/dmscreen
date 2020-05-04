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
    expect(result.armor_class.ac_modifiers.length).toEqual(4);
    expect(result.armor_class.ac_modifiers.find(x => x.type === 'Monk').mod(Behir)).toEqual(6);
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

