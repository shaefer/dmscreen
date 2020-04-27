const natureSense = ({monster}) => {
    const newSkills = monster.skills.slice(0).map(x => {
        if ((x.name.trim() === 'Knowledge' && x.subName && x.subName.trim() === 'nature') || x.name.trim() === 'Survival') {
            return {
                ...x,
                value: x.value + 2
            }
        }
        return x;
    });
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