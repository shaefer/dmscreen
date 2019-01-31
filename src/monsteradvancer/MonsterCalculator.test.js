import {calculateFastBaseAttackBonus, calculateMediumBaseAttackBonus, calculateSlowBaseAttackBonus, cal, getBaseAttackBonusByHitDiceAndCreatureType} from './MonsterCalculator'


//http://legacy.aonprd.com/bestiary/monsterCreation.html
it('fast base attack bonus is same as hd', () => {
    expect(calculateFastBaseAttackBonus(12)).toBe(12);
    expect(calculateFastBaseAttackBonus(20)).toBe(20);
    expect(calculateFastBaseAttackBonus(1)).toBe(1);
  });

  it('fast base attack bonus for <1hd is 1', () => {
    expect(calculateFastBaseAttackBonus(0.5)).toBe(1);
  });

  it('medium base attack bonus is about 3/4', () => {
    expect(calculateMediumBaseAttackBonus(0.5)).toBe(0);
    expect(calculateMediumBaseAttackBonus(1)).toBe(0);
    expect(calculateMediumBaseAttackBonus(8)).toBe(6);
    expect(calculateMediumBaseAttackBonus(9)).toBe(6);
    expect(calculateMediumBaseAttackBonus(10)).toBe(7);
    expect(calculateMediumBaseAttackBonus(11)).toBe(8);
    expect(calculateMediumBaseAttackBonus(12)).toBe(9);
    expect(calculateMediumBaseAttackBonus(13)).toBe(9);
  });

  it('slow base attack bonus is about 1/2', () => {
    expect(calculateSlowBaseAttackBonus(0.5)).toBe(0);
    expect(calculateSlowBaseAttackBonus(1)).toBe(0);
    expect(calculateSlowBaseAttackBonus(2)).toBe(1);
    expect(calculateSlowBaseAttackBonus(3)).toBe(1);
    expect(calculateSlowBaseAttackBonus(4)).toBe(2);
    expect(calculateSlowBaseAttackBonus(5)).toBe(2);
  });

  it('getBaseAttackBonusByHitDiceAndCreatureType returns results for valid creature types', () => {
    expect(getBaseAttackBonusByHitDiceAndCreatureType(8, "dragon")).toBe(8);
    expect(getBaseAttackBonusByHitDiceAndCreatureType(8, "fey")).toBe(4);
    expect(getBaseAttackBonusByHitDiceAndCreatureType(8, "humanoid")).toBe(6);
    expect(getBaseAttackBonusByHitDiceAndCreatureType(8, "animal")).toBe(6);
  });

  it('getBaseAttackBonusByHitDiceAndCreatureType throws for invalid creature types', () => {
    expect(() => {
      getBaseAttackBonusByHitDiceAndCreatureType(8, "somethingunknown")
    }).toThrow("No creature type found for: somethingunknown");
  });
