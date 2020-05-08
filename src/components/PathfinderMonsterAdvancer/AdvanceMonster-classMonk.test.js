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
    expect(result.special_qualities).toBe("flurry of blows, monk fast movement +30 ft.")

    expect(behir.cmb).toBe(18);
    //25 was with monk bab...actual should be 3 higher
    expect(result.cmb).toBe(28) //maneuver training uses monk level instead of bab when calculating cmb. In this case it is the diff between 7 and 10.
});
