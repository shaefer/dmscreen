const parseSpecialAbilities = (line) => {
    const json = JSON.parse(line);
    let i = 0;
    if (json.sections) {
        const specialAbilityBlock = json.sections.filter(x => x.name == 'Special Abilities') //other sections include description paragraphs.
        if (specialAbilityBlock.length == 1) {
            const saSection = specialAbilityBlock[0];
            let specialAbilities = [];
            console.log("SA CREATURE: " + json.name)
            for(let i = 0;i<saSection.sections.length; i++) {
                const sa = saSection.sections[i];
                
                const specialAbility = {
                    name: sa.name,
                    description: sa.body,
                }
                //TODO: Parse sa.body for saving throws and stat basis for saving throws: DC 20 Fortitude save. The save DC is Constitution-based
                if (sa.ability_types) specialAbility.type = sa.ability_types.ability_type;
                specialAbilities.push(specialAbility)   
            }
            json.special_abilities = specialAbilities;
        }
        else {
            console.log("NO POWERS: " + json.name + " " + specialAbilityBlock.length)
        }
    }
    const result = JSON.stringify(json) + "\n";
    return {result: result, success: true, id: json.name};
}

export default parseSpecialAbilities;