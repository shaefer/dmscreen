import Advancement from './RogueAdvancement'
import Behir from '../../models/Behir_v9'
import seedrandom from 'seedrandom'
import Monsters from '../../models/Monsters'

it('sneak attack should add to special attacks', () => {
    const opts = {
        monster: Behir,
        level: 19,
    }
    const acquiredSpecialAttackFn = Advancement.sneakAttack(opts);
    expect(acquiredSpecialAttackFn()).toEqual("sneak attack +10d6");
});
it('sneak attack should add to special attacks', () => {
    const opts = {
        monster: Behir,
        level: 18,
    }
    const acquiredSpecialAttackFn = Advancement.sneakAttack(opts);
    expect(acquiredSpecialAttackFn()).toEqual("sneak attack +9d6");
});
it('sneak attack should add to special attacks', () => {
    const opts = {
        monster: Behir,
        level: 17,
    }
    const acquiredSpecialAttackFn = Advancement.sneakAttack(opts);
    expect(acquiredSpecialAttackFn()).toEqual("sneak attack +9d6");
});
it('sneak attack should add to special attacks', () => {
    const opts = {
        monster: Behir,
        level: 16,
    }
    const acquiredSpecialAttackFn = Advancement.sneakAttack(opts);
    expect(acquiredSpecialAttackFn()).toEqual("sneak attack +8d6");
});

it('trap sense should calculate as you level', () => {
    const alteredBehir = {
        ...Behir,
        defensive_abilities: 'defensive awesomeness'
    }
    const opts = {
        monster: alteredBehir,
        level: 16
    }
    const trapSense = Advancement.trapSense(opts);
    expect(trapSense.defensive_abilities).toEqual("defensive awesomeness, trap sense +5");
});

it('add evasion to defensive abilities', () => {
    const alteredBehir = {
        ...Behir,
        defensive_abilities: 'defensive awesomeness'
    }
    const opts = {monster: alteredBehir};
    const changes = Advancement.evasion(opts);
    expect(changes.defensive_abilities).toEqual("defensive awesomeness, evasion")
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

it('add improved evasion to defensive abilities', () => {
    const alteredBehir = {
        ...Behir,
        defensive_abilities: 'defensive awesomeness'
    }
    const opts = {monster: alteredBehir};
    const changes = Advancement.improvedEvasion(opts);
    expect(changes.defensive_abilities).toEqual("defensive awesomeness, improved evasion")
});

it('improved evasion replaces normal evasion on defensive abilities', () => {
    const alteredBehir = {
        ...Behir,
        defensive_abilities: 'defensive awesomeness, evasion'
    }
    const opts = {monster: alteredBehir};
    const changes = Advancement.improvedEvasion(opts);
    expect(changes.defensive_abilities).toEqual("defensive awesomeness, improved evasion")
});

it('add uncanny dodge to defensive abilities', () => {
    const alteredBehir = {
        ...Behir,
        defensive_abilities: 'defensive awesomeness'
    }
    const opts = {monster: alteredBehir};
    const changes = Advancement.uncannyDodge(opts);
    expect(changes.defensive_abilities).toEqual("defensive awesomeness, uncanny dodge")
});

it('add improved uncanny dodge to defensive abilities', () => {
    const alteredBehir = {
        ...Behir,
        defensive_abilities: 'defensive awesomeness'
    }
    const opts = {monster: alteredBehir};
    const changes = Advancement.improvedUncannyDodge(opts);
    expect(changes.defensive_abilities).toEqual("defensive awesomeness, improved uncanny dodge")
});

it('add improved uncanny dodge and replace uncanny dodge on defensive abilities', () => {
    const alteredBehir = {
        ...Behir,
        defensive_abilities: 'defensive awesomeness, uncanny dodge'
    }
    const opts = {monster: alteredBehir};
    const changes = Advancement.improvedUncannyDodge(opts);
    expect(changes.defensive_abilities).toEqual("defensive awesomeness, improved uncanny dodge")
});

it('master strike added special attack with scaled DC', () => {
    //The DC of this save is equal to 10 + 1/2 the rogue’s level + the rogue’s Intelligence modifier.
    expect(Behir.ability_scores.int).toBe(7);
    const smarterBehir = {
        ...Behir,
        ability_scores: {
            ...Behir.ability_scores,
            int: 11 
        }
    }
    const opts = {
        monster: smarterBehir,
        level: 20,
    }
    const acquiredSpecialAttackFn = Advancement.masterStrike(opts);
    expect(acquiredSpecialAttackFn()).toEqual('master strike (DC 20)')
});

// it('print out some fields on all monsters', () => {
//     const abilitiesToCheck = [];
//     Monsters.forEach(x => {
//         if (x.defensive_abilities && x.defensive_abilities.includes(",")) abilitiesToCheck.push(x.defensive_abilities);
//     });
//     const test = abilitiesToCheck.filter(x => x === 'reactive strike, split (sonic or slashing, 32 hp)');
//     const re = /, (?![\w\d +-]*\))/
//     console.log(test[0].split(re))
//     console.log(abilitiesToCheck.join("\n"))
// });