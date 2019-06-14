import fs from 'fs';
import readline from 'readline';
import stream from 'stream';
import commandLineArgs from 'command-line-args';
import {condenseArmorClass, parseArmorClassFields} from './lineParsers/ArmorClass'
import parseHpAndHd from './lineParsers/HitPointsAndHitDice'
import condenseSavingThrows from './lineParsers/SavingThrows'
import parseSpecialAbilities from './lineParsers/SpecialAbilities'
import examineField from './lineParsers/FieldExaminer' //examineField("fieldName")
import convertFieldsToInt from './lineParsers/FieldsAsInt'
import condenseAbilityScores from './lineParsers/AbilityScores'
import parseSkills from './lineParsers/Skills'
import {parseMeleeAttacks, parseRangedAttacks, parseRangedAttackToHitAndDamage} from './lineParsers/Attacks'

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

const sortByKeys = (line) => {
    const json = JSON.parse(line);
    const ordered = {};
    Object.keys(json).sort().forEach(function(key) {
        ordered[key] = json[key];
    });
    const result = JSON.stringify(ordered) + "\n";
    return {result: result, success: true, id: json.name};
}

const optionDefinitions = [
    { name: 'src', type: String, defaultOption: true, defaultValue: "files/test.txt" }
];
const options = commandLineArgs(optionDefinitions);

const now = new Date();
const dateString = now.toLocaleDateString()+"_"+now.getHours()+"-" + now.getMinutes() + "-" + now.getSeconds();
console.log("About to process file");
processFile(options.src, "files/output/allCreatures_"+dateString+".json", sortByKeys);

//v2 is what is currently deployed.
//v3 is all int based fields converted to ints. 
//v4 parsed ac into individual fields as well as mods
//v5 has sorted keys --> WILL have to re-sort any time we add new fields
//v6 hp parsed (for hitPoints, hitDice, hdType, hitPointAdjustment) and resorted keys
//v7 stats into object and saving throws into object and armor_class into object
//v8 parsed special abilities into field with meta data about savingThrows.
//v9 parsed skills into new fields skills and skills_details
//v10-11 cleanup
//v12 parsed melee attacks
//v13 parsed ranged attacks
//v14 parsed dice for damage, crit, and toHit from attacks.

//DONE parse all stats into fields containing just the ints
//DONE parse ac into individual fields and mods
//DONE parse cr into a number (decimal value 1/8 = 0.125, 1/3 = 0.333, etc.)
//DONE parse hitpoints and hitdice from hp field
//DONE: condense abilityScores into an object
//DONE: parse saving throws into an object
//DONE: condense armorClass into an object
//DONE: Make special abilities section for parsed special abilities
//DONE: parse skills into array and objects

//DONE: parse melee attacks into damage, toHit, and numberOfAttacks and crit parts
//DONE: parse ranged attacks into damage, toHit, and numberOfAttacks and crit parts

//https://www.d20pfsrd.com/bestiary/rules-for-monsters/universal-monster-rules/
//https://dev.to/adnanrahic/building-a-serverless-contact-form-with-aws-lambda-and-aws-ses-4jm0

//TODO: parse melee attacks into numeric crit range and multiplier
//TODO: parse melee attacks into primary, secondary, weapon-based, and full-attacks.


//TODO: parse ranged attacks into numeric crit range and multiplier
//TODO: parse ranged attacks into primary, secondary, weapon-based, and full-attacks.

//TODO: parse regeneration and fast healing from hp field
//TODO: parse speed
//TODO: parse feats into array (Trick is: Weapon Focus (bite, claw) which will prevent clean splitting)
//TODO: parse languages into an array
//TODO: parse resistances into array and objects

//TODO: parse senses into array
//TODO: parse special qualities into array
//TODO: parse immunities into array
//TODO: parse aura into array (probably)
//TODO: parse creature_subtypes into array (probably)
//TODO: parse DR into int and type
//TODO: parse exp into int
