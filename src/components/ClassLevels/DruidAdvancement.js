const natureSense = (monster, level) => {
    const newSkills = monster.skills.map(x => {
        if ((x.name === 'Knowledge' && x.subName === 'nature') || x.name === 'Survival') {
            return {
                ...x,
                value: x.value + 2
            }
        }
        return x;
    }).slice(0);
    return newSkills;
}

const venomImmunity = (monster, level) => {

}
const wildShape = (monster, level) => {

}

const DruidAdvancement = {
    natureSense,
    'Nature Sense': natureSense,
}
export default DruidAdvancement;