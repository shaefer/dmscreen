import React from 'react'
import Keys from '../models/Keys'
//import Monsters from '../models/AllMonsters'
import { showMonster, selectMonsterOption, showS3SelectResult, 
    showS3SelectDMScreenResult, display35Monster } from '../actions'
import MonstersApi from '../apiClients/MonsterApi'
import rollTimeString from '../utils/ResultTimestamp'
import ReactGA from 'react-ga';

export const fetchMonsterAdvancer35v2 = (monsterName, fields) => (dispatch) => {
    MonstersApi.getMonsterWithCustomizations(monsterName, fields)
        .then(data => {
            ReactGA.event({
                category: "Monster Advancer Generate",
                action: monsterName,
                label: MonstersApi.convertFieldsToHtmlParameters(fields)
            });
            return data;
        })
        .then(data =>  dispatch(display35Monster(data)));
}

export const monsterSelectChangeHandler = (e) => (dispatch, getState) => {
    console.warn('SELECT CHANGE');
    console.log(this)
    if (!e) return "";
    
    const monsterName = (e && e.value) ? e.value : e.label;
    dispatch(selectMonsterOption(monsterName));
    MonstersApi.getMonsterByName(monsterName)
        .then(data => {
            ReactGA.event({
                category: "Monster Find",
                action: monsterName
            });
            return data;
        })
        .then(data =>  dispatch(showMonster(data)))
}

export const keyPressHandler = (e) => {
    return (dispatch, getState) => {
        switch(e.which) {
            case Keys.LEFT:
            console.log("LEFT KEY PRESSED");
            var promise = MonstersApi.getMonsterByName("behir");
            ReactGA.event({
                category: "Monster Secret Key Press",
                action: "behir"
            });
            promise.then(data =>  dispatch(showMonster(data)))
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

//using for DMScreen right now
export const fetchSelectAction = (searchParams) => (dispatch, getState) => {
    const chooseMonster = (monsters, searchParamsAsHtmlParams) => {
        const numOfMonsters = searchParams.num; //special searchParams.
        const monsterNames = monsters.map(x => x.name);
        let selectedMonsters = [];
        
        for(let i = 0;i<numOfMonsters;i++) {
            selectedMonsters.push(monsterNames[Math.floor(Math.random()*monsterNames.length)])
        }
        console.log("Select Multiple Monsters", monsters, numOfMonsters, selectedMonsters);
        const monsterButtons = selectedMonsters.map(x => {
            const lookupMonster = () => {
                var promise = MonstersApi.getMonsterByName(x);
                promise.then(data => {
                    ReactGA.event({
                        category: "DM Screen",
                        action: x
                    })
                    return data;
                });
                promise.then(data =>  dispatch(showMonster(data)));
            }
            return <button type="button" onClick={lookupMonster} className="purpleAwesome">{x}</button>
        })

        const countStr = (numOfMonsters > 1) ? numOfMonsters + " " : "";
        const s = (numOfMonsters > 1) ? "s" : "";
        const desc = `(${rollTimeString()}) ${countStr}CR ${searchParams.cr} Monster${s}`
        const result = [<span>{desc}</span>, ...monsterButtons]
        return showS3SelectDMScreenResult(result, searchParamsAsHtmlParams);
    }
    var resultsPromise = MonstersApi.getMonstersByCriteria(searchParams);
    resultsPromise.then(monsters => {
        if (monsters && monsters.length > 0) {
            var searchFieldsAsHtmlParams = MonstersApi.convertCriteriaToHtmlParameters(searchParams);
            ReactGA.event({
                category: 'Monster Search',
                action: searchFieldsAsHtmlParams
            });
            dispatch(chooseMonster(monsters, searchFieldsAsHtmlParams));
        }    
    });
}

export const monsterS3SelectChangeHandler = (values) => (dispatch, getState) => {
    console.warn('Search via S3 select');
    var resultsPromise = MonstersApi.getMonstersByCriteria(values);
    resultsPromise.then(monsters => {
        if (monsters && monsters.length > 0) {
            var searchFieldsAsHtmlParams = MonstersApi.convertCriteriaToHtmlParameters(values);
            ReactGA.event({
                category: 'Monster Search',
                action: searchFieldsAsHtmlParams
            });
            dispatch(showS3SelectResult(monsters, searchFieldsAsHtmlParams));
        }
    });
} 