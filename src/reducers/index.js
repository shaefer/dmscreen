import { combineReducers } from 'redux'

import * as Actions from '../actions'

import Behir from '../models/Behir'

const config = (state = { initialState: "basicConfig"}, action) => {
  switch (action.type) {
    default:
      return state
  }
}

const monster = (state = { statBlock: Behir}, action) => {
  console.log("LAYOUT REDUCER");
  switch (action.type) {
    case Actions.SHOW_MONSTER: 
      console.log("SHOW MONSTER");
      console.log(action.monster);
      return {
        ...state,
        statBlock: action.monster
      };
    default:
      return state
  }
}

const rootReducer = combineReducers({
  config, monster
})

export default rootReducer