import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import * as Actions from '../actions'

import Aasimar from '../models/Aasimar'

const config = (state = { initialState: "basicConfig"}, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

const select = (state = { selectedMonsterName: Aasimar.name}, action) => {
  switch (action.type) {
    case Actions.SELECT_MONSTER:
      return {
        ...state,
        selectedMonsterName: action.name
      }
    default:
      return state;
  }
}

const monster = (state = { statBlock: Aasimar}, action) => {
  //console.log("LAYOUT REDUCER");
  switch (action.type) {
    case Actions.SHOW_MONSTER: 
      //console.log("SHOW MONSTER");
      //console.log(action.monster);
      return {
        ...state,
        statBlock: action.monster
      };
    default:
      return state;
  }
}

const s3Select = (state = { monsterList:[]}, action) => {
  switch (action.type) {
    case Actions.S3_SELECT_SHOW: 
      //console.log("SHOW MONSTER");
      //console.log(action.monster);
      return {
        ...state,
        monsterList: action.monsterList
      };
    default:
      return state;
  }
}

const dmScreen = (state = {results:[], buttons:[], showForm: false}, action) => {
  switch (action.type) {
    case Actions.ADD_RESULT:
      return {
        ...state,
        results: state.results.concat(action.result)
      };
    case Actions.ADD_CUSTOM_BUTTON:
      return {
        ...state,
        buttons: state.buttons.concat(action.button)
      };
    case Actions.TOGGLE_FORM:
      return {
        ...state,
        showForm: action.showForm
      };
    case Actions.S3_SELECT_SHOW:
    //TODO: Pull this logic up into the actionCreatorSteps so that only the final result makes it here.
      const monsterNames = action.monsterList.map(x => x.name);
      const selectedMonster = monsterNames[Math.floor(Math.random()*monsterNames.length)] 
      return {
        ...state,
        results: state.results.concat(selectedMonster)
      }
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  config, select, monster, s3Select, dmScreen, form: formReducer
})

export default rootReducer