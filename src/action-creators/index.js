import React from 'react'
import Keys from '../models/Keys'
//import Monsters from '../models/AllMonsters'
import { showMonster, selectMonsterOption, showS3SelectResult, display35Monster } from '../actions'
import MonstersApi from '../apiClients/MonsterApi'
import rollTimeString from '../utils/ResultTimestamp'
import ReactGA from 'react-ga'
import { addMonsterResult, showS3SelectDMScreenResult, addDmScreenResult } from '../actions/DmScreenActions'
import MonsterDisplay from '../components/MonsterDisplay'

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

const chooseMonster = (monsters, searchParamsAsHtmlParams, numOfMonsters, searchParams, dispatch) => {
    const monsterNames = monsters.map(x => x.name);
    console.log("CHOOSING MONSTERS");
    console.log(monsters);
    let selectedMonsters = [];
    
    for(let i = 0;i<numOfMonsters;i++) {
        selectedMonsters.push(monsterNames[Math.floor(Math.random()*monsterNames.length)])
    }

    const isRange = searchParams.crEnd;
    console.log("Select Multiple Monsters", monsters, numOfMonsters, selectedMonsters);
    const monsterButtons = selectedMonsters.map(x => {
        const lookupMonster = () => {
            MonstersApi.getMonsterByName(x)
                .then(data => {
                    ReactGA.event({
                        category: "DM Screen",
                        action: x
                    })
                    return data;
                })
                .then(data => {
                    const result = <MonsterDisplay monster={{statBlock: data}}/>
                    dispatch(addDmScreenResult(result))
                });
        }
        const monsterEntry = monsters.find(y => y.name === x);
        const crNote = (isRange) ? `(CR ${monsterEntry.cr})` : "";
        return <button type="button" onClick={lookupMonster} className="purpleAwesome">{x}{crNote}</button>
    });

    const countStr = (numOfMonsters > 1) ? numOfMonsters + " " : "";
    const s = (numOfMonsters > 1) ? "s" : "";
    const range = (isRange) ? `${searchParams.cr}-${searchParams.crEnd}` : searchParams.cr;
    const desc = `(${rollTimeString()}) ${countStr}CR ${range} Monster${s}`
    const result = [<span>{desc}</span>, ...monsterButtons]
    return showS3SelectDMScreenResult(result, searchParamsAsHtmlParams);
}

//using for DMScreen right now
export const fetchSelectAction = (searchParams) => (dispatch, getState) => {
    MonstersApi.getMonstersByCriteria(searchParams)
        .then(monsters => {
            if (monsters && monsters.length > 0) {
                var searchFieldsAsHtmlParams = MonstersApi.convertCriteriaToHtmlParameters(searchParams);
                ReactGA.event({
                    category: 'DM Screen',
                    action: searchFieldsAsHtmlParams
                });
                dispatch(chooseMonster(monsters, searchFieldsAsHtmlParams, searchParams.num, searchParams, dispatch));
            }    
        })
        .catch(ex => {
            console.log(ex);
        })
}

export const monsterS3SelectChangeHandler = (values) => (dispatch, getState) => {
    console.warn('Search via S3 select');
    MonstersApi.getMonstersByCriteria(values)
        .then(monsters => {
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