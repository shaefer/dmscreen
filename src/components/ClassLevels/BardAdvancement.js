const inspireCourage = ({monster, level: bardLevel}) => {
    //1->1, 5->2, 9->3, 13->4, 17->5
    const bonus = Math.floor((bardLevel - 1) / 4) + 1;
    const displayFn = () => "inspire courage +" + bonus;
    return displayFn;
}

const inspireCompetence = ({monster, level: bardLevel}) => {
    //1,3,7,11,15,19
    //0,2,3,4 ,5 ,6
    if (bardLevel < 3)
        return () => {return ''};
    const bonus = Math.floor((bardLevel + 1) / 4) + 1;
    const displayFn = () => "inspire competence +" + bonus;
    return displayFn;
}

const BardAdvancement = {
    inspireCourage,
    'Inspire Courage': inspireCourage,
    inspireCompetence,
    'Inspire Competence': inspireCompetence,
}
export default BardAdvancement;