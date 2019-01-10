var fs = require('fs');
var readline = require('readline');
var stream = require('stream');
var commandLineArgs = require('command-line-args');


const processFile = (fileNameAndPath, outputPath, alterLineFunc) => {

    var instream = fs.createReadStream(fileNameAndPath);
    var outstream = new stream;
    var rl = readline.createInterface(instream, outstream);
    
    //the current output path assumed an output folder inside the file folder...if one of the parent folders don't exist this will error.
    var writeStream = fs.createWriteStream(outputPath, {flags:'a+'});
    console.log("About to write lines");
    let lncnt = 0;
    let failures = [];
    let successes = [];
    rl.on('line', function(line) {
        lncnt++;
        const lineOutput = alterLineFunc(line);
        //console.log("Line " + lncnt + " creature: " + lineOutput.id + " Success:" + lineOutput.success);
        lineOutput.success ? successes.push(lineOutput.id) : failures.push(lineOutput.id);
        writeStream.write(lineOutput.result);
    });
    
    rl.on('close', function() {
      console.log(`Finished. Wrote file ${outputPath}`);
      console.log("Failures: " + failures.length + " " + failures.join("|"))
      console.log("Successes: " + successes.length) + " " + successes.join("|")
    });
}

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

const addAcAsInt = (json) => {
    if (json.ac) {
        //console.log(json.ac.split(",")[0] + " | " + json.ac);
        json.acAsInt = parseInt(json.ac.split(",")[0]);
    }
}

const replaceEnDashWithDash = (line) => {
    let updated = line.replace(/–/g, "-");
    updated = updated.replace(/&mdash/g, "-");
    return updated.replace(/\\u2013/g, "-");
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

const convertSpecialFields = (line) => {
    const json = JSON.parse(line);
    parseAcField(json);
    const result = JSON.stringify(json) + "\n";
    return {result: result, success: true, id: json.name};
}

const sortByKeys = (line) => {
    const json = JSON.parse(line);
    const ordered = {};
    Object.keys(json).sort().forEach(function(key) {
        ordered[key] = json[key];
    });
    const result = JSON.stringify(ordered) + "\n";
    return {result: result, success: true, id: json.name};
}

const examineFeats = (line) => {
    const json = JSON.parse(line);
    console.log(json.feats)
    const result = JSON.stringify(json) + "\n";
    return {result: result, success: true, id: json.name};
}

const optionDefinitions = [
    { name: 'src', type: String, defaultOption: true, defaultValue: "files/test.txt" }
];
const options = commandLineArgs(optionDefinitions);

const now = new Date();
const dateString = now.toLocaleDateString()+"_"+now.getHours()+"-" + now.getMinutes() + "-" + now.getSeconds();
console.log("About to process file");
processFile(options.src, "files/output/allCreatures_"+dateString+".json", examineFeats);

//v3 is all int based fields converted to ints. 
//v4 parsed ac into individual fields as well as mods
//v5 has sorted keys

//TODO: parse speed
//TODO: parse hitpoints and hitdice from hp field
//TODO: parse skills into array and objects
//TODO: parse feats into array (Trick is: Weapon Focus (bite, claw) which will prevent clean splitting)
//TODO: parse languages into an array
//TODO: parse resistances into array and objects

//TODO: parse senses into array
//TODO: parse special qualities into array
//TODO: parse special abilities from random section blocks
//TODO: parse immunities into array
//TODO: parse aura into array (probably)
//TODO: parse creature_subtypes into array (probably)
//TODO: parse DR into int and type
//TODO: parse exp into int
