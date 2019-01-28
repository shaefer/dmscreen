import fs from 'fs';
import readline from 'readline';
import stream from 'stream';
import commandLineArgs from 'command-line-args';

/**
 * Used this method to create the skills_base.json in the data folder. This data is used to determine appropriate ability score as well as training and armor check. 
 * @param {*} folderPath 
 * @param {*} output 
 */
const processFile = (folderPath, output) => {
    const items = fs.readdirSync(folderPath);
    const skills = items.map(x => {
        const file = fs.readFileSync("files/skills/" + x, {flags:'r'})
        const json = JSON.parse(file);
        const skill = {
            name_key: x.substring(0, x.length - 5),
            name: json.name,
            abilityScore: json.attribute,
            trained: json.trained_only,
            armor_check_penalty: json.armor_check_penalty
        }
        return skill;
    });
    //console.log(skills);
    console.log(output)
    const skillsJson = JSON.stringify(skills);
    fs.writeFile(output, skillsJson, {flags:'w'}, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      }
    );
}

const optionDefinitions = [
    { name: 'src', type: String, defaultOption: true, defaultValue: "files/skills/" }
];
const options = commandLineArgs(optionDefinitions);

const now = new Date();
const dateString = now.toLocaleDateString()+"_"+now.getHours()+"-" + now.getMinutes() + "-" + now.getSeconds();
console.log("Starting skill processing");
processFile(options.src, "files/output/skills_"+dateString+".json");

