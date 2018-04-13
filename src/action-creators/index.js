import Keys from '../models/Keys'
//import Monsters from '../models/AllMonsters'
import { showMonster, selectMonsterOption } from '../actions'

export const fetchMonsterAction = (monsterName) => (dispatch, getState) => {
    fetchMonster(monsterName, dispatch);
}

String.prototype.nthIndexOf = (pattern, n) => {
    var i = -1;
    while (n-- && i++ < this.length) {
        i = this.indexOf(pattern, i);
        if (i < 0) break;
    }
    return i;
}

const nthIndexOf = (str, pat, n) => {
    var L= str.length, i= -1;
    while(n-- && i++<L){
        i= str.indexOf(pat, i);
        if (i < 0) break;
    }
    return i;
}

const fetchMonster = (monsterName, dispatch) => {
    console.log("ABOUT TO GET: " + monsterName);
    let monsterKey = monsterName.toLowerCase()
        .replace(new RegExp("[\,\(\)\']", 'g'), "")
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