import { advanceMonster } from '../AdvanceMonster'
import Behir from '../../../models/Behir_v9'
import { statBonusFromAbilityScore } from '../AdvancementUtils'

it('damage data should change on str change and get appropriate multiplier for type of attack', () => {
    expect(Behir.melee_attacks[0][0].damage_details[0].dice[0].numOfDice).toBe(2);
    expect(Behir.melee_attacks[0][0].damage_details[0].dice[0].numOfSides).toBe(6);
    expect(Behir.melee_attacks[0][0].damage_details[0].dice[0].adjustment).toBe(9);
    expect(Behir.ability_scores.str).toBe(23);
    expect(statBonusFromAbilityScore(Behir.ability_scores.str)).toBe(6);
    const advancedBehir = advanceMonster(Behir, {str:26});
    expect(advancedBehir.ability_scores.str).toBe(26);
    expect(statBonusFromAbilityScore(advancedBehir.ability_scores.str)).toBe(8);
    //Data needs update to manage str multipliers for natural attacks.
    expect(advancedBehir.melee_attacks[0][0].damage_details[0].dice[0].adjustment).toBe(11);
});