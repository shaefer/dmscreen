import Keys from '../models/Keys'
//import Monsters from '../models/AllMonsters'
import { showMonster, selectMonsterOption, showS3SelectResult } from '../actions'
import Crypto from 'crypto-js'
import AWS from 'aws-sdk';
import dateformat from 'dateformat'
import aws4 from 'aws4'

export const fetchMonsterAction = (monsterName) => (dispatch, getState) => {
    fetchMonster(monsterName, dispatch);
}

const fetchMonster = (monsterName, dispatch) => {
    console.log("ABOUT TO GET: " + monsterName);
    let monsterKey = monsterName.toLowerCase()
        .replace(new RegExp("[,()']", 'g'), "")
        .replace(new RegExp(" ", 'g'), "_");

    // const baseKey = monsterKey.substring(0, nthIndexOf(monsterKey, "_", 3));
    // const baseMonster = (monsterKey.startsWith("dragon_")) ? Monsters[baseKey] : undefined;
    // const monster = Monsters[monsterKey];

    // if (baseMonster) {
    //     const mergedMonster = {
    //         ...baseMonster,
    //         ...monster
    //     }
    //     return dispatch(showMonster(mergedMonster));
    // }
    // return dispatch(showMonster(monster));
    return fetch(`https://api.cleverorc.com/monsters/${monsterKey}`)
        .then(resp => resp.json())
        .then(data =>  dispatch(showMonster(data)))
        .catch(err => console.log(err));
}

export const monsterSelectChangeHandler = (e) => (dispatch, getState) => {
    console.warn('SELECT CHANGE');
    console.log(this)
    if (!e) return "";
    
    const monsterName = (e && e.value) ? e.value : e.label;
    dispatch(selectMonsterOption(monsterName));
    fetchMonster(monsterName, dispatch);
}

export const keyPressHandler = (e) => {
    return (dispatch, getState) => {
        switch(e.which) {
            case Keys.LEFT:
            console.log("LEFT KEY PRESSED");
            fetchMonster("behir", dispatch);
            break;
    
            case Keys.UP:
            break;
    
            case Keys.RIGHT:
            break;
    
            case Keys.DOWN:
            break;

            case Keys.D:
            break;

            case Keys.U:
            break;

            default: return; // exit this handler for other keys
        }
        //e.preventDefault(); // prevent the default action (scroll / move caret)
    }
};

const s3SelectBody = `<?xml version="1.0" encoding="UTF-8"?>
<SelectRequest>
    <Expression>Select s.name, CAST(s.strength as INT) str, cast(s.cr as INT) cr from S3Object s where CAST(s.strength as INT) > 50 and CAST(s.cr as INT) >= 20</Expression>
    <ExpressionType>SQL</ExpressionType>
    <InputSerialization>
        <JSON>
            <Type>DOCUMENT</Type>
        </JSON>
    </InputSerialization>
    <OutputSerialization>
        <JSON>
            <RecordDelimiter>,</RecordDelimiter>
        </JSON>                                  
    </OutputSerialization>
    <RequestProgress>
        <Enabled>FALSE</Enabled>
    </RequestProgress>                                  
</SelectRequest>`;

const getSignatureKey = (key, dateStamp, regionName, serviceName) => {
    var kDate = Crypto.HmacSHA256(dateStamp, "AWS4" + key);
    var kRegion = Crypto.HmacSHA256(regionName, kDate);
    var kService = Crypto.HmacSHA256(serviceName, kRegion);
    var kSigning = Crypto.HmacSHA256("aws4_request", kService);
    return kSigning;
}

const signAndFetchWithAWS4 = () => {
    let opts = {
        service: 's3', 
        region: 'us-west-2', 
        path: '/cleverorc/pathfinder/allCreatures.json?select&select-type=2',
        headers: {
            'Content-Type': 'application/json'
        },
        body: s3SelectBody
    }
    const awsAccessKey = 'fakeAccessKey';
    const awsSecret = 'fakeSecret'
    aws4.sign(opts, {accessKeyId: awsAccessKey, secretAccessKey: awsSecret});
    console.log(opts);
    return fetch('https://s3-us-west-2.amazonaws.com/cleverorc/pathfinder/allCreatures.json?select&select-type=2', opts)
    .then(resp => {
        console.log(resp);
        console.log(resp.body);
        resp.headers.forEach(function(val, key) { console.log(key + ' -> ' + val); });
        const transformedBody = resp.text();
        //I feel like the answer is here: https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream
        console.log(transformedBody);
        return transformedBody;
    })
    .then(data => {
        console.log(data);
        //Data is actually returned a series of events...one of those is the record data. We have created a way to handle this (as it will probably be necessary in some browser even if we find the "correct way")
        //https://aws.amazon.com/blogs/developer/introducing-support-for-amazon-s3-select-in-the-aws-sdk-for-ruby/
        const coercedData = data.slice(data.indexOf("{"), data.lastIndexOf("}") + 1);
        const forcedJsonStr = "{ \"data\":[" + coercedData + "]}";
        const forcedJson = JSON.parse(forcedJsonStr);
        console.log(forcedJsonStr);
        console.log(forcedJson);
        return forcedJson.data;
    });
}

const fetchSelect = (monsterName, dispatch) => {
    console.log("ABOUT TO GET: " + monsterName);
    let monsterKey = monsterName.toLowerCase()
        .replace(new RegExp("[,()']", 'g'), "")
        .replace(new RegExp(" ", 'g'), "_");

    const results = signAndFetchWithAWS4();
    return results.then(monsters => {
        dispatch(showS3SelectResult(monsters));
    });
}

export const fetchSelectAction = (monsterName) => (dispatch, getState) => {
    fetchSelect(monsterName, dispatch);
}

export const monsterS3SelectChangeHandler = (e) => (dispatch, getState) => {
    console.warn('Search via S3 select');
    
    fetchSelect("SomeMonster", dispatch);
} 