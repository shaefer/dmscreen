import Keys from '../models/Keys'
import { showMonster } from '../actions'

export const fetchMonsterAction = (monsterName) => (dispatch, getState) => {
    fetchMonster(monsterName, dispatch);
}

const fetchMonster = (monsterName, dispatch) => {
    console.log("ABOUT TO FETCH: " + monsterName);
    return fetch(`https://api.cleverorc.com/monsters/${monsterName}`)
        .then(resp => resp.json())
        .then(data =>  dispatch(showMonster(data)))
        .catch(err => console.log(err));
}

export const keyPressHandler = (e) => {
    return (dispatch, getState) => {
        const currentState = getState();
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
        e.preventDefault(); // prevent the default action (scroll / move caret)
    }
};