import Advancement from './DruidAdvancement'
import AngelSolar from '../../models/AngelSolar'

const getSkill = (skillList, name, subName) => {
    if (subName) {
        return skillList.find(x => x.name.toLowerCase().trim() === name.toLowerCase() && x.subName.toLowerCase() === subName.toLowerCase());
    }
    return skillList.find(x => x.name.toLowerCase().trim() === name.toLowerCase());
}

it('if knowledge nature exists add 2', () => {
    const skills = Advancement.natureSense({monster: AngelSolar, level: 1});
    expect(getSkill(AngelSolar.skills, 'Knowledge', 'nature').value).toEqual(31);
    expect(getSkill(skills, 'knowledge', 'nature').value).toEqual(33);
});

it('if survival exists add 2', () => {
    const skills = Advancement.natureSense({monster: AngelSolar, level: 1});
    expect(getSkill(AngelSolar.skills, 'Survival').value).toEqual(31);
    expect(getSkill(skills, 'Survival').value).toEqual(33);
});

it('other knowledge skills do not change', () => {
    const skills = Advancement.natureSense({monster: AngelSolar, level: 1});
    expect(getSkill(AngelSolar.skills, 'Knowledge', 'history').value).toEqual(31);
    expect(getSkill(skills, 'knowledge', 'history').value).toEqual(31);
});