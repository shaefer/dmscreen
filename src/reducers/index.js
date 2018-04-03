import { combineReducers } from 'redux'

import * as Actions from '../actions'

const config = (state = { initialState: "basicConfig"}, action) => {
  switch (action.type) {
    default:
      return state
  }
}

const layout = (state = { initialLayout: "basicLayout"}, action) => {
  switch (action.type) {
    case Actions.SHOW_MONSTER: 
      return action.monster;
    default:
      return state
  }
}



const rootReducer = combineReducers({
  config, layout
})

export default rootReducer