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
    expect(result.special_qualities).toBe("flurry of blows, ki pool (8 points, cold iron and silver, lawful, magic), monk fast movement +30 ft., slow fall (50 ft.)")

    expect(behir.cmb).toBe(18);
    expect(behir.cmb_details).toBe("+18 (+22 grapple)")
    expect(behir.cmd).toBe(29);
    
    expect(result.cmb).toBe(28) //maneuver training uses monk level instead of bab when calculating cmb. In this case it is the diff between 7 and 10.
    expect(result.cmb_details).toBe("+28 (+32 grapple)")

    //Saving throws
    expect(Behir.saving_throws.will).toBe(5); //level 9 monk adds 6 will.

    expect(result.saving_throws.will).toBe(13); //5 base + 2 from wis advances, +6 from class, +2 vs. enchantment from still mind.
    expect(result.saving_throws.willDetails[0]).toEqual({bonus: 2, details: 'enchantment', source: 'Still Mind'});

    //defensive abilities
    expect(result.defensive_abilities).toBe("improved evasion")

    expect(result.immune).toBe('disease, electricity')
});
