const addStatJson = (json, fieldName, outputFieldName) => {
    let success = false;
    if (!json.hasOwnProperty(fieldName)) {
        console.warn("No field exists by name: " + fieldName + " for creature: " + json.name); //some base creature parts such as elementals may not have all the stats fields (dragons work similarly but still have stats for everything).
        return {success: true};
    }
    const fieldValue = json[fieldName];
    
    let asNum = parseInt(fieldValue);
    if (!isNaN(asNum)) {
        if (asNum === 0) {
            console.log("Stat " + fieldName + " was actual Zero for creature: " + json.name);
        }
         json[outputFieldName] = asNum
         if (asNum.length != fieldValue.length && asNum.toString().length < fieldValue.length - 1) {
             console.log("Original field "+fieldName+" had additional information.[" + asNum + "] vs [" + fieldValue + "]")
             json[outputFieldName + "_details"] = fieldValue;
         }
         success = true;
    }
    else if (fieldValue == "-") {
        json[outputFieldName] = 0;
         success = true;
    }
    else if (fieldValue == "- (can't be tripped)") {
        json[outputFieldName]  = 0;
        json[outputFieldName + "_details"] = fieldValue;
        success = true;
    }
    else {
        console.error(fieldName + " did not parse to number for creature: " + json.name);
    }
    return {success: success};
}

const replaceEnDashWithDash = (line) => {
    let updated = line.replace(/–/g, "-");
    updated = updated.replace(/&mdash/g, "-");
    return updated.replace(/\\u2013/g, "-");
}

/** Converts original field to its parsed int and if there is more data in the field saves the original as fieldName_details */
const convertFieldsToInt = (line) => {
    const updatedLine = replaceEnDashWithDash(line);
    const json = JSON.parse(updatedLine);
    //special parsing -> speed
    const fields = ["cmb", "cmd", "sr", "space", "reach", "base_attack", 
                    "strength", "dexterity", "constitution", "intelligence", "wisdom", 
                    "charisma", "init", "fortitude", "reflex", "will"];
    let results = [];
    for(let i = 0; i< fields.length; i++) {
        const result = addStatJson(json, fields[i], fields[i]);
        results.push(result.success);
    }

    const isSuccess = (x) => x === true;
    const allSuccess = results.every(isSuccess);
    const result = JSON.stringify(json) + "\n";
    return allSuccess ? {result: result, success: true, id: json.name} : {result: result, success: false, id: json.name};
}

/** Original way we added cr int...we need to change lambda before we can remove this field. */
const addCrAsNum = (json) => {
    if (json.cr && json.cr.indexOf("/") !== -1) {
        if (json.cr == '1/2')
            json.crAsNum = .5
        if (json.cr == '1/3')
            json.crAsNum = .33
        if (json.cr == '1/4')
            json.crAsNum = .25
        if (json.cr == '1/6')
            json.crAsNum = .166
        if (json.cr == '1/8')
            json.crAsNum = .125
    } else {
        const crAsNum = parseInt(json.cr);
        if (!isNaN(crAsNum)) json.crAsNum = crAsNum;
    }
}

/** Original way we added ac int...we need to change lambda before we can remove this field. */
const addAcAsInt = (json) => {
    if (json.ac) {
        //console.log(json.ac.split(",")[0] + " | " + json.ac);
        json.acAsInt = parseInt(json.ac.split(",")[0]);
    }
}

export default convertFieldsToInt;