import { combineReducers } from 'redux'

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

const rootReducer = combineReducers({
  config, select, monster
})

export default rootReducer