import Keys from '../models/Keys'
import { showMonster, selectMonsterOption } from '../actions'

export const fetchMonsterAction = (monsterName) => (dispatch, getState) => {
    fetchMonster(monsterName, dispatch);
}

const fetchMonster = (monsterName, dispatch) => {
    console.log("ABOUT TO FETCH: " + monsterName);
    let monster = monsterName.toLowerCase().replace(", ", "_").replace(" ", "_").replace("(", "").replace(")", "");
    return fetch(`https://api.cleverorc.com/monsters/${monster}`)
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