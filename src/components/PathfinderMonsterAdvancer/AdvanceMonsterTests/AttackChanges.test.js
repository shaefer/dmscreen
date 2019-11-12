import { advanceMonster } from '../AdvanceMonster'
import { displayFullAttack } from '../../MonsterDisplay'
import Behir from '../../../models/Behir_v9'

it('attack data should change on advancement', () => {
    expect(Behir.melee_attacks[0][0].toHit).toBe(15);
    expect(Behir.hitDice).toBe(10);
    const advancedBehir = advanceMonster(Behir, {hd:12});
    expect(Behir.melee_attacks[0][0].toHit).toBe(15);


    expect(advancedBehir.hitDice).toBe(12);
    expect(advancedBehir.hitPoints).toBe(126);
    expect(advancedBehir.melee_attacks[0][0].toHit).toBe(17);
});

it('attack data should change on str change', () => {
    expect(Behir.melee_attacks[0][0].toHit).toBe(15);
    const advancedBehir = advanceMonster(Behir, {str:25}); //23 to 25 = +1 toHit
    expect(advancedBehir.melee_attacks[0][0].toHit).toBe(16);
    expect(advancedBehir.melee).toBe(displayFullAttack(advancedBehir.melee_attacks));
});