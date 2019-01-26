import getCaptureGroups from '../utils/RegexHelper';

const parseSpecialAbilities = (line) => {
    const json = JSON.parse(line);
    if (json.sections) {
        const specialAbilityBlock = json.sections.filter(x => x.name == 'Special Abilities') //other sections include description paragraphs.
        if (specialAbilityBlock.length == 1) {
            const saSection = specialAbilityBlock[0];
            let specialAbilities = [];
            for(let i = 0;i<saSection.sections.length; i++) {
                const sa = saSection.sections[i];
                
                const specialAbility = {
                    name: sa.name,
                    description: sa.body,
                    savingThrow: parseForSaveInfo(sa.body)
                }
               
                if (sa.ability_types) specialAbility.type = sa.ability_types.ability_type;
                specialAbilities.push(specialAbility)   
            }
            json.special_abilities = specialAbilities;
        }
        json.sections = json.sections.filter(x => x.name != "Special Abilities")
    }
    const result = JSON.stringify(json) + "\n";
    return {result: result, success: true, id: json.name};
}

const parseForSaveInfo = (text) => {
     //TODO: Parse sa.body for saving throws and stat basis for saving throws: DC 20 Fortitude save. The save DC is Constitution-based
    const regex = /DC (\d+) (Fortitude|Reflex|Will) save.*The save DC is (Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma)-based/g;
    const matches = getCaptureGroups(regex, text);
    //we expect only one set of matches.
    if (matches && matches.length == 1) {
        return {
            hasSave: true,
            SaveDc: matches[1],
            SaveType: matches[2],
            SaveAbilityScore: matches[3]
        }
    } else {
        return {
            hasSave: false
        }
    }
    
}

export default parseSpecialAbilities;