const condenseArmorClass = (line) => {
    const json = JSON.parse(line);

    json.armor_class = {
        ac: {
            standard: json.ac_standard,
            flat_footed: json.ac_flat_footed,
            touch: json.ac_touch
        },
        ac_details: json.ac,
        ac_modifiers: json.ac_modifiers,
        ac_modifiers_details: json.ac_modifiers_details,
    }

    json.ac = undefined;
    json.ac_modifiers = undefined;
    json.ac_modifiers_details = undefined;
    json.ac_standard = undefined;
    json.ac_flat_footed = undefined;
    json.ac_touch = undefined;

    const result = JSON.stringify(json) + "\n";
    return {result: result, success: true, id: json.name};
}

const parseAcField = (json) => {
    //17, touch 15, flat-footed 14 (+3 Dex, +2 natural, +2 size)
    if (json.ac) {
        const acSplit = json.ac.split(" ");

        json["ac_standard"] = parseInt(acSplit[0]);
        json["ac_touch"] = parseInt(acSplit[2]);
        json["ac_flat_footed"] = parseInt(acSplit[4]);

        const acPartSplit = json.ac.split("("); //split to find modifiers string
        if (acPartSplit[1]) {
            const modString = acPartSplit[1].replace(")", "");
            const modStringParts = modString.split("; "); //split to find specific modifiers -- usually deflection only vs. evil see: Angel, Monadic Deva

            const convertModObj = (modStr) => {
                const modStrParts = modStr.split(" ");
                return {
                    mod: parseInt(modStrParts[0]),
                    type: modStrParts[1]
                };
            }

            const acModifiers = modStringParts[0].split(", ").map(convertModObj);
            json["ac_modifiers"] = acModifiers;
            json["ac_modifiers_details"] = modString;
        }
    }
}

const parseArmorClassFields = (line) => {
    const json = JSON.parse(line);
    parseAcField(json);
    const result = JSON.stringify(json) + "\n";
    return {result: result, success: true, id: json.name};
}

export {condenseArmorClass, parseArmorClassFields};