import Advancement from './FighterAdvancement'
import AngelSolar from '../../models/AngelSolar'
import Human from '../../models/Human'

it('armor master adds an entry to DR', () => {
    const advancementOpts = {
        monster: AngelSolar,
        level: 1,
        className: 'Fighter',
        classAbilities: [],
    }
    const dr = Advancement.armorMastery(advancementOpts);
    expect(AngelSolar.dr).toEqual('15/epic and evil')
    expect(dr).toEqual('5/- (while wearing armor or using a shield), 15/epic and evil');
});

it('alters ac with maxDex', () => {
    const advancementOpts = {monster: Human, level: 11}
    const newAC = Advancement.armorTraining(advancementOpts);
    const newACArmor = newAC.ac_modifiers.find(x => x.maxDex); //assumes only 1 ac with maxDex...
    const armorAC = Human.armor_class.ac_modifiers.find(x => x.maxDex);
    expect(armorAC).toEqual({
        "mod": 5,
        "type": "armor",
        "maxDex": 3
    });
    expect(newACArmor).toEqual({
        "mod": 5,
        "type": "armor[with armor training 3]",
        "maxDex": 6
    });
});

it('bravery adds a special fear bonus to will save', () => {
    const opts = {monster: AngelSolar, level: 12};
    const newSaves = Advancement.bravery(opts);
    const saves = {
        "fort": 25,
        "ref": 14,
        "will": 23,
        "willDetails": [{
            bonus: 3,
            "details": "fear",
            "source": "bravery"
        }],
        "will_details": "+23; +4 vs. poison, +4 resistance vs. evil"
    }
    expect(newSaves).toEqual(saves);
});

it('bonusFeats adds to additionalFeats Field', () => {
    const opts = {monster: AngelSolar, level: 12};
    const additionalFeats = Advancement.bonusFeat(opts);
    expect(additionalFeats).toEqual([{featRestrictions: 'combat', featCount: 7, source: 'fighter', name: 'Fighter Bonus Feats'}]);
});