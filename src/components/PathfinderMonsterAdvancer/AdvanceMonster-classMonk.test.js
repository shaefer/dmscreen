import { advanceByClassLevel, prepareMonster } from './AdvanceMonster';
import Behir from '../../models/Behir_v9';

it('advance by monk level calculates stunning fist correctly', () => {
    const behir = prepareMonster(Behir);
    const result = advanceByClassLevel(behir, {level: 10, className: 'Monk'});
    expect(result.hpEntries.length).toBe(2);
    expect(result.totalHitDice).toBe(20);
    expect(result.specialAttacksAcquired.find(x => x.abilitySource === 'Stunning Fist').displayFn(result)).toBe('stunning fist (12/day, DC 23)');
});
