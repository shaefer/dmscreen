import React from 'react'
import Keys from '../models/Keys'
//import Monsters from '../models/AllMonsters'
import { showMonster, selectMonsterOption, showS3SelectResult, display35Monster, monsterNotFound } from '../actions'
import MonstersApi from '../apiClients/MonsterApi'
import rollTimeString from '../utils/ResultTimestamp'
import PageViewRecorder from '../components/PageViewRecorder'
import { showS3SelectDMScreenResult, addDmScreenResult } from '../actions/DmScreenActions'
import MonsterDisplay from '../components/MonsterDisplay'

import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';
import '../components/DMScreen/AccordianMonsterDisplay.css'

export const fetchMonsterAdvancer35v2 = (monsterName, fields) => (dispatch) => {
    MonstersApi.getMonsterWithCustomizations(monsterName, fields)
        .then(data => {
            PageViewRecorder.recordEvent({
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
            PageViewRecorder.recordEvent({
                category: "Monster Find",
                action: monsterName
            });
            return data;
        })
        .then(data =>  dispatch(showMonster(data)))
}

export const monsterSelectedHandler = (monsterName) => (dispatch) => {
    dispatch(selectMonsterOption(monsterName));
    MonstersApi.getMonsterByName(monsterName)
        .then(data => {
            PageViewRecorder.recordEvent({
                category: "Monster Find",
                action: monsterName
            });
            return data;
        })
        .then(data => { 
            (data) ? dispatch(showMonster(data)) : dispatch(monsterNotFound(monsterName))
        })
}

export const keyPressHandler = (e) => {
    return (dispatch, getState) => {
        switch(e.which) {
            case Keys.LEFT:
            console.log("LEFT KEY PRESSED");
            var promise = MonstersApi.getMonsterByName("behir");
            PageViewRecorder.recordEvent({
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
    let selectedMonsters = [];
    
    for(let i = 0;i<numOfMonsters;i++) {
        selectedMonsters.push(monsterNames[Math.floor(Math.random()*monsterNames.length)])
    }

    const isRange = searchParams.crEnd;
    console.log("Select Multiple Monsters", monsters, numOfMonsters, selectedMonsters);
    const monsterButtons = selectedMonsters.map(x => {
        const monsterEntry = monsters.find(y => y.name === x);
        const lookupMonster = () => {
            MonstersApi.getMonsterByName(x)
                .then(data => {
                    PageViewRecorder.recordEvent({
                        category: "DM Screen",
                        action: x
                    })
                    return data;
                })
                .then(data => {
                    const result = (
                        <section className="monsterDisplayResult">
                            <Accordion>
                                <AccordionItem>
                                    <AccordionItemTitle>
                                        <div className="u-position-relative">
                                            {`(${rollTimeString()}) `}{x}{` CR ${monsterEntry.cr}`}<div className="accordion__arrow"/>
                                        </div>
                                    </AccordionItemTitle>
                                    <AccordionItemBody>
                                        <MonsterDisplay monster={{statBlock: data, success: true}}/>
                                    </AccordionItemBody>
                                </AccordionItem>
                            </Accordion>
                        </section>
                    )
                    dispatch(addDmScreenResult(result))
                });
        }
       
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
                PageViewRecorder.recordEvent({
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
                PageViewRecorder.recordEvent({
                    category: 'Monster Search',
                    action: searchFieldsAsHtmlParams
                });
                dispatch(showS3SelectResult(monsters, searchFieldsAsHtmlParams));
            }
        });
} 
