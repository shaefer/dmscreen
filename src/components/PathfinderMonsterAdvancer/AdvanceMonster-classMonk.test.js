import { advanceByClassLevel, prepareMonster } from './AdvanceMonster';
import Behir from '../../models/Behir_v9';

it('advance by monk level calculates stunning fist correctly', () => {
    const behir = prepareMonster(Behir);
    const result = advanceByClassLevel(behir, {level: 10, className: 'Monk'});
    expect(result.hpEntries.length).toBe(2);
    expect(result.totalHitDice).toBe(20);
    expect(result.specialAttacksAcquired.find(x => x.abilitySource === 'Stunning Fist').displayFn(result)).toBe('stunning fist (12/day, DC 23)');
    expect(result.armor_class.ac_details).toBe('26, touch 14, flat-footed 25 (+1 Dex, +2 Monk, +12 natural, -2 size, +3 Wis)')
    expect(result.additionalFeats).toBeTruthy();
    expect(result.additionalFeats.find(x => x.source === 'monk')).toBeTruthy();
    expect(result.additionalFeats.find(x => x.source === 'monk').featCount).toBe(4);
});
