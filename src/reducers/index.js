import { combineReducers } from 'redux'

import * as Actions from '../actions'

const config = (state = { initialState: "basicConfig"}, action) => {
  switch (action.type) {
    default:
      return state
  }
}

const monster = (state = { statBlock: {}}, action) => {
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