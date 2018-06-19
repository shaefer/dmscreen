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



export const fetchSelectAction = (monsterName) => (dispatch, getState) => {
    fetchSelect(monsterName, dispatch);
}

export const monsterS3SelectChangeHandler = (values) => (dispatch, getState) => {
    console.warn('Search via S3 select');
    fetchSelect(values, dispatch);
} 

const fetchSelect = (searchParams, dispatch) => {
    console.log("ABOUT TO SEARCH ON", searchParams);

    let searchFields = [];
    if (searchParams.cr)
        searchFields.push(`cr=${searchParams.crOperator}${searchParams.cr}`);
    if (searchParams.str)
        searchFields.push(`str=${searchParams.strOperator}${searchParams.str}`);
    if (searchParams.ac)
        searchFields.push(`ac=${searchParams.acOperator}${searchParams.ac}`);
    
    const searchFieldsAsHtmlParams = searchFields.join("&");

    const defaultParams = `cr=%3C=10&str=%3E=40`;
    const url = `https://99hy8krr49.execute-api.us-west-2.amazonaws.com/prod?${searchFieldsAsHtmlParams}`;
    console.log("URL TO FETCH: ", url);
    const results = fetch(url)
        .then(resp => resp.json())
        .then(json => {
            console.log("REAL RESPONSE FROM S3 Select URL");
            console.log(json);
            return json.results
        });
    return results.then(monsters => {
        dispatch(showS3SelectResult(monsters));
    });
}