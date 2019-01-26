import getCaptureGroups from '../utils/RegexHelper';

const parseSkills = (line) => {
    const json = JSON.parse(line);

    const regex = /([a-zA-Z]+ *[a-zA-Z]*) ?(\(([\w, ]*)\))* ?([\+\-\d]+) ?(\(([\+\-]*[\d\w ]*)\))*,? ?/gm
    const matches = getCaptureGroups(regex, json.skills);

    console.log(json.name)
    //console.log(matches)
    console.log(json.skills)
    let skills = [];
    for(let i = 0;i<matches.length;i++) {
        const match = matches[i];
        const skill = {
            name: match[1],
            value: parseInt(match[4])
        }
        if (match[3])
            skill.subName = match[3]
        if (match[6])
            skill.details = match[6]
        skills.push(skill)
    }
    console.log(skills);

    const result = JSON.stringify(json) + "\n";
    return {result: result, success: true, id: json.name};
}

export default parseSkills;