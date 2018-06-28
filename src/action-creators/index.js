import Keys from '../models/Keys'
//import Monsters from '../models/AllMonsters'
import { showMonster, selectMonsterOption, showS3SelectResult, addDmScreenResult, addCustomButton, toggleForm } from '../actions'

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


//using for DMScreen right now
export const fetchSelectAction = (searchParams) => (dispatch, getState) => {
    fetchSelect(searchParams, dispatch);
}

export const monsterS3SelectChangeHandler = (values) => (dispatch, getState) => {
    console.warn('Search via S3 select');
    fetchSelect(values, dispatch);
} 

const fetchSelect = (searchParams, dispatch, action = showS3SelectResult) => {
    console.log("ABOUT TO SEARCH ON", searchParams);

    let searchFields = [];
    if (searchParams.cr) {
        const through = (searchParams.crOperator === 'btw') ? "-" + searchParams.crEnd : "";
        searchFields.push(`cr=${searchParams.crOperator}${searchParams.cr}${through}`);
    }
    if (searchParams.str) {
        const through = (searchParams.strOperator === 'btw') ? "-" + searchParams.strEnd : "";
        searchFields.push(`str=${searchParams.strOperator}${searchParams.str}${through}`);
    }
    if (searchParams.ac) {
        const through = (searchParams.acOperator === 'btw') ? "-" + searchParams.acEnd : "";
        searchFields.push(`ac=${searchParams.acOperator}${searchParams.ac}${through}`);
    }
    if (searchParams.environment) {
        searchFields.push(`environment=${searchParams.environmentOperator}${searchParams.environment}`)
    }
    
    const searchFieldsAsHtmlParams = searchFields.join("&");

    //https://monstersearchapi.cleverorc.com/?
    const baseUri = 'https://99hy8krr49.execute-api.us-west-2.amazonaws.com/prod';
    const url = `${baseUri}?${searchFieldsAsHtmlParams}`;
    console.log("URL TO FETCH: ", url);
    const results = fetch(url)
        .then(resp => resp.json())
        .then(json => {
            console.log("REAL RESPONSE FROM S3 Select URL");
            console.log(json);
            return json.results
        });
    return results.then(monsters => {
        dispatch(action(monsters));
    });
}

export const dmScreenAddResultAction = (result) => (dispatch, getState) => {
    dispatch(addDmScreenResult(result));
}

export const addCustomButtonAction = (button) => (dispatch) => {
    dispatch(addCustomButton(button))
}

export const toggleFormAction = (showForm) => (dispatch) => {
    dispatch(toggleForm(showForm))
}