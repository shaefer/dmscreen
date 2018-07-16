var fs = require('fs');
var readline = require('readline');
var stream = require('stream');
var commandLineArgs = require('command-line-args');


const processFile = (fileNameAndPath, outputPath, alterLineFunc) => {

    var instream = fs.createReadStream(fileNameAndPath);
    var outstream = new stream;
    var rl = readline.createInterface(instream, outstream);
    
    var writeStream = fs.createWriteStream(outputPath, {flags:'a+'});

    rl.on('line', function(line) {
        writeStream.write(alterLineFunc(line));
    });
    
    rl.on('close', function() {
      console.log(`Finished. Wrote file ${outputPath}`);
    });
}

const addUpdatedStringToLine = (line) => {
    return line + "updated" + "\n";
}

const addStrengthAsInt = (json) => {
    //console.log(json.strength + " | " + (parseInt(json.strength)));
    var strAsNum = parseInt(json.strength);
    if (!isNaN(strAsNum)) json.strengthInt = strAsNum;
}

const addDexterityAsInt = (json) => {
    //console.log(json.strength + " | " + (parseInt(json.strength)));
    var asNum = parseInt(json.dexterity);
    if (!isNaN(asNum)) json.dexterityInt = asNum;
}

const addStatJson = (json, fieldName, outputFieldName) => {
    var asNum = parseInt(json[fieldName]);
    if (!isNaN(asNum)) json[outputFieldName] = asNum;
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
    return line.replace(/\\u2013/g, "-");
}

const readStrAndCreateStrInt = (line) => {
    line = replaceEnDashWithDash(line);

    const json = JSON.parse(line);


    /* Include/exclude parsers here...for the most part we've set this up to only need it once as long as we are reconsuming the output from the last time we updated. */
    //addStrengthAsInt(json);
    //addCrAsNum(json);
    //addAcAsInt(json);
    addStatJson(json, "dexterity", "dexterityInt");
    addStatJson(json, "constitution", "constitutionInt");
    addStatJson(json, "intelligence", "intelligenceInt");
    addStatJson(json, "wisdom", "wisdomInt");
    addStatJson(json, "charisma", "charismaInt");


    return JSON.stringify(json) + "\n";
}

const optionDefinitions = [
    { name: 'src', type: String, defaultOption: true, defaultValue: "files/test.txt" }
];
const options = commandLineArgs(optionDefinitions);

const now = new Date();
const dateString = now.toLocaleDateString()+"_"+now.getHours()+"-" + now.getMinutes() + "-" + now.getSeconds();
processFile(options.src, "files/output/allCreatures_"+dateString+".json", readStrAndCreateStrInt);
