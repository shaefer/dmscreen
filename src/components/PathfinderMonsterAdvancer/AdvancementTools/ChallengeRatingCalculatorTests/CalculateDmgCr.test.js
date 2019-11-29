import {calculateDamageCr, calculateDamageFromAttackSequence} from '../ChallengeRatingCalculator'

it('calculate the cr of an attack sequence damage', () => {
    const attack = [[{damage: "(2d6+4 plus 1d4 acid and grab)", damage_details:[{"dice":[{"numOfDice":2,"numOfSides":6,"adjustment":4}, {"numOfDice":1,"numOfSides":4,"adjustment":0}]}] }]];
    expect(calculateDamageFromAttackSequence(attack[0])).toBe(13.5);
});

it('calculate the cr of an attack sequence damage', () => {
    const attack = [[{damage: "(2d6+4 plus 1d4 acid and grab)", damage_details:[{"dice":[{"numOfDice":2,"numOfSides":6,"adjustment":4}, {"numOfDice":1,"numOfSides":4,"adjustment":0}]}]  }]];
    expect(calculateDamageCr(attack)).toBe(3);
});