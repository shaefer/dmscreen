import { getConstructBonusHitPoints } from '../AdvancementUtils'

it('getConstructBonusHitPoints for Diminutive 10', () => {
    const bonus = getConstructBonusHitPoints('Fine');
    expect(bonus).toBe(10);
});

it('getConstructBonusHitPoints for Diminutive 10', () => {
    const bonus = getConstructBonusHitPoints('Diminutive');
    expect(bonus).toBe(10);
});

it('getConstructBonusHitPoints for Tiny 10', () => {
    const bonus = getConstructBonusHitPoints('Tiny');
    expect(bonus).toBe(10);
});

it('getConstructBonusHitPoints for Small 10', () => {
    const bonus = getConstructBonusHitPoints('Small');
    expect(bonus).toBe(10);
});

it('getConstructBonusHitPoints for Medium 20', () => {
    const bonus = getConstructBonusHitPoints('Medium');
    expect(bonus).toBe(20);
});

it('getConstructBonusHitPoints for Large 30', () => {
    const bonus = getConstructBonusHitPoints('Large');
    expect(bonus).toBe(30);
});

it('getConstructBonusHitPoints for Huge 40', () => {
    const bonus = getConstructBonusHitPoints('Huge');
    expect(bonus).toBe(40);
});

it('getConstructBonusHitPoints for Gargantuan 60', () => {
    const bonus = getConstructBonusHitPoints('Gargantuan');
    expect(bonus).toBe(60);
});

it('getConstructBonusHitPoints for Colossal 80', () => {
    const bonus = getConstructBonusHitPoints('Colossal');
    expect(bonus).toBe(80);
});