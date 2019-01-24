const condenseAbilityScores = (line) => {
    const json = JSON.parse(line);
    //verify that each field exists...b/c there should be a value for everyone one...if not there is an error we should correct.
    //Ifrit is currently missing con b/c of bad parse of dex that ate it.
    //Owl, Giant ate the cha score because of bad wis parse.
    //Best guess looks like no stats should have extra data (we do display - instead of 0 for constructs and undead but they are all just a dash)
    json.ability_scores = {
        str: json.strength,
        dex: json.dexterity,
        con: json.constitution,
        int: json.intelligence,
        wis: json.wisdom,
        cha: json.charisma,
    }

    json.strength = undefined;
    json.dexterity = undefined;
    json.constitution = undefined;
    json.intelligence = undefined;
    json.wisdom = undefined;
    json.charisma = undefined;
    
    //TODO: remove the original top level fields.

    if (json.strength_details) {
        console.error(json.name + " has strength_details")
        const result = JSON.stringify(json) + "\n";
        return {result: result, success: false, id: json.name};
    }
    if (json.dexterity_details) {
        console.error(json.name + " has dexterity_details")
        console.log(json.ability_scores)
        const result = JSON.stringify(json) + "\n";
        return {result: result, success: false, id: json.name};
    }
    if (json.constitution_details) {
        console.error(json.name + " has constitution_details")
        const result = JSON.stringify(json) + "\n";
        return {result: result, success: false, id: json.name};
    }
    if (json.intelligence_details) {
        console.error(json.name + " has intelligence_details")
        const result = JSON.stringify(json) + "\n";
        return {result: result, success: false, id: json.name};
    }
    if (json.wisdom_details) {
        console.error(json.name + " has wisdom_details")
        console.log(json.ability_scores)
        const result = JSON.stringify(json) + "\n";
        return {result: result, success: false, id: json.name};
    }
    if (json.charisma_details) {
        console.error(json.name + " has charisma_details")
        const result = JSON.stringify(json) + "\n";
        return {result: result, success: false, id: json.name};
    }

    const result = JSON.stringify(json) + "\n";
    return {result: result, success: true, id: json.name};
}

export default condenseAbilityScores;