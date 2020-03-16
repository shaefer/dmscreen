//https://aws.amazon.com/sdk-for-node-js/

//Lookup all items from bucket s3://cleverorc/pathfinder/v1/monsters
//get item, JSON.stringify. Resave to a bucket (v2?)
//Show that this works with Athena (Hadoop only handles single line JSON.)

//Similar Script to rename some of these files?
import AWS from 'aws-sdk'
import fs from 'fs'
import Monsters from './MonstersToUpload' //This needs to refer to a local file to work with babel-node 6. This file should match what we are testing in src/models/Monsters (We can't upgrade to babel-node 7 because of non-support of import/export)
import {Elf} from './Elf'
import {Human} from './Human'
import {Dwarf} from './Dwarf'
import {Gnome} from './Gnome'
import {HalfElf} from './Half-elf'
import {HalfOrc} from './Half-orc'

console.log("Starting AWS Script");
const s3 = new AWS.S3();

const params = {
    Bucket: "cleverorc",
    Prefix: "pathfinder/v1/monsters/",
    MaxKeys: 1000
};

const writeAllMonstersToS3 = () => {
    Monsters.map(x => {
        writeS3JsonFileForMonster(x);
    });
}

const writeS3JsonFileForMonster = (monster, bucket='cleverorc', path='pathfinder/v2/monsters/') => {
    const monsterKey = `${path}${monster.name}.json`;
    const s3PutParams = {
        Body: JSON.stringify(monster), 
        Bucket: bucket,
        Key: monsterKey
    };

    s3.putObject(s3PutParams, (err, data) => {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(`${monster.name} SUCCESSFULLY UPDATED`, data);           // successful response
    });
}

const getMonsterFromS3 = (monsterName, bucket='cleverorc', path='pathfinder/v2/monsters/') => {
    const monsterKey = `${path}${monsterName}.json`;
    const getParams = {
        Bucket: bucket,
        Key: monsterKey
    }
    s3.getObject(getParams, (err, data) => {
        if (err) console.log(err, err.stack); // an error occurred
        else {
            const monster = JSON.parse(data.Body.toString());
            console.log(`Found monster ${monster.name} with str: ${monster.ability_scores.str}`);           // successful response
        }
    });
}

//writeS3JsonFileForMonster(Monsters.find(x => x.name === 'Aasimar'))
console.log("Trying to upload Npcs", HalfOrc)
writeS3JsonFileForMonster(HalfOrc)
//writeAllMonstersToS3();
//getMonsterFromS3('Elf')

const writeS3DataToFile = (err, data, fileName) => {
    if (err) { console.log(err, err.stack); return; }
    if (data.ContentLength > 0) {
        const bodyAsStr = data.Body.toString();
        const cleanStr = bodyAsStr.replace(/\n|\r/g, ""); //remove all line breaks;
        const pathAndFileName = "tmp/" + fileName;
        const nameNoSuffix = fileName.substring(0, fileName.length - 5);
        const result =  JSON.parse(bodyAsStr);
        let monsterName = result.name.toLowerCase()
            .replace(new RegExp("[\,\(\)\']", 'g'), "")
            .replace(new RegExp(" ", 'g'), "_");
        // fs.writeFile(pathAndFileName, cleanStr, {encoding: 'utf8', flags:'w'}, function (err) {
        //     if (err) { return console.log(err); }
        //     console.log("The file was saved!!! " + pathAndFileName);
        // }); 
        fs.appendFile("tmp/allCreaturesByName.json", "\"" + monsterName + "\":" + cleanStr + ",\n", {encoding: 'utf8', flags:'a'}, function (err) {
            if (err) { return console.log(err); }
            console.log("The all file was saved!!! ");
        }); 
        // let monsterName = result.name.toLowerCase()
        //     .replace(new RegExp("[\,\(\)\']", 'g'), "")
        //     .replace(new RegExp(" ", 'g'), "_");
        // if (monsterName != nameNoSuffix) {
        //     fs.appendFile("tmp/allCreaturesWithUnparseableNames.json", result.name + "\t\t\t" + nameNoSuffix + "\n", {encoding: 'utf8', flags:'a'}, function (err) {
        //         if (err) { return console.log(err); }
        //         console.log("The allCreaturesWithUnparseableNames file was saved!!! ");
        //     }); 
        // }
        // fs.appendFile("tmp/allCreatureNamesKeyAndSource.json", result.name + "\t" + nameNoSuffix + "\t" + result.source + "\n", {encoding: 'utf8', flags:'a'}, function (err) {
        //     if (err) { return console.log(err); }
        //     console.log("The allCreatureNamesKeyAndSource file was saved!!! ");
        // }); 
        // fs.appendFile("tmp/allCreatureNames.json", result.name + "\n", {encoding: 'utf8', flags:'a'}, function (err) {
        //     if (err) { return console.log(err); }
        //     console.log("The allCreatureNames file was saved!!! ");
        // }); 
        // const sourceName = result.source.toLowerCase().replace(" ", "_");
        // fs.appendFile("tmp/allCreature_"+sourceName+".json", result.name + "\n", {encoding: 'utf8', flags:'a'}, function (err) {
        //     if (err) { return console.log(err); }
        //     console.log("The "+sourceName+" file was saved!!! ");
        // });
    }
}

const listObjectsCallback = (err, data) => {
    if (err) { console.log(err, err.stack); return; }
    console.log(data.Contents.map(x => x.Key.substring(x.Key.lastIndexOf("/") + 1))); 
    const marker = data.Contents[data.Contents.length - 1].Key

    data.Contents.map(creature => {
        const fileName = creature.Key.substring(creature.Key.lastIndexOf("/") + 1);
        if (!fileName) return;
        console.log("Get Object: " + creature.Key);
        s3.getObject({Bucket: params.Bucket, Key: creature.Key}, (err, data) => writeS3DataToFile(err, data, fileName));
    });
    if (data.IsTruncated) {
        console.log("Was truncated. Make another request with marker: " + marker);
        s3.listObjects({Bucket: "cleverorc", Marker: marker}, listObjectsCallback);
    }
};

//s3.listObjects(params, listObjectsCallback);