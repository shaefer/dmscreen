import BardAdvancement from './BardAdvancement'
import Behir from '../../models/Behir_v9'

//Currently class abilities that add special attacks add them to a new property acquiredSpecialAttacks (like a template) instead of trying to alter special_attacks field. This is due to special attacks being a string rather than an array of special attack objects.
it('inspire courage improves based on level', () => {
    const inspireCourage = BardAdvancement.inspireCourage({monster: Behir, level: 1});
    expect(inspireCourage()).toEqual("inspire courage +1")
});

it('inspire courage improves based on level', () => {
    const inspireCourage = BardAdvancement.inspireCourage({monster: Behir, level: 2});
    expect(inspireCourage()).toEqual("inspire courage +1")
});

it('inspire courage improves based on level', () => {
    const inspireCourage = BardAdvancement.inspireCourage({monster: Behir, level: 5});
    expect(inspireCourage()).toEqual("inspire courage +2")
});

it('inspire courage improves based on level', () => {
    const inspireCourage = BardAdvancement.inspireCourage({monster: Behir, level: 6});
    expect(inspireCourage()).toEqual("inspire courage +2")
});

it('inspire courage improves based on level', () => {
    const inspireCourage = BardAdvancement.inspireCourage({monster: Behir, level: 9});
    expect(inspireCourage()).toEqual("inspire courage +3")
});

it('inspire courage improves based on level', () => {
    const inspireCourage = BardAdvancement.inspireCourage({monster: Behir, level: 16});
    expect(inspireCourage()).toEqual("inspire courage +4")
});

it('inspire courage improves based on level', () => {
    const inspireCourage = BardAdvancement.inspireCourage({monster: Behir, level: 17});
    expect(inspireCourage()).toEqual("inspire courage +5")
});

it('inspire competence improves based on level', () => {
    const inspireCompetence = BardAdvancement.inspireCompetence({monster: Behir, level: 1});
    expect(inspireCompetence()).toEqual("")
});

it('inspire competence improves based on level', () => {
    const inspireCompetence = BardAdvancement.inspireCompetence({monster: Behir, level: 2});
    expect(inspireCompetence()).toEqual("")
});

it('inspire competence improves based on level', () => {
    const inspireCompetence = BardAdvancement.inspireCompetence({monster: Behir, level: 3});
    expect(inspireCompetence()).toEqual("inspire competence +2")
});

it('inspire competence improves based on level', () => {
    const inspireCompetence = BardAdvancement.inspireCompetence({monster: Behir, level: 4});
    expect(inspireCompetence()).toEqual("inspire competence +2")
});

it('inspire competence improves based on level', () => {
    const inspireCompetence = BardAdvancement.inspireCompetence({monster: Behir, level: 7});
    expect(inspireCompetence()).toEqual("inspire competence +3")
});

it('inspire competence improves based on level', () => {
    const inspireCompetence = BardAdvancement.inspireCompetence({monster: Behir, level: 11});
    expect(inspireCompetence()).toEqual("inspire competence +4")
});

it('inspire competence improves based on level', () => {
    const inspireCompetence = BardAdvancement.inspireCompetence({monster: Behir, level: 17});
    expect(inspireCompetence()).toEqual("inspire competence +5")
});

it('inspire competence improves based on level', () => {
    const inspireCompetence = BardAdvancement.inspireCompetence({monster: Behir, level: 17});
    expect(inspireCompetence()).toEqual("inspire competence +5")
});

it('inspire competence improves based on level', () => {
    const inspireCompetence = BardAdvancement.inspireCompetence({monster: Behir, level: 19});
    expect(inspireCompetence()).toEqual("inspire competence +6")
});