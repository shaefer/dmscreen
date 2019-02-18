import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import * as Actions from '../actions'
import Aasimar from '../models/Aasimar'
import dmScreen from './DMScreenReducer'

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

const monster = (state = { statBlock: Aasimar, success: true}, action) => {
  switch (action.type) {
    case Actions.SHOW_MONSTER: 
      return {
        ...state,
        success: true,
        statBlock: action.monster
      };
    case Actions.MONSTER_NOT_FOUND:
      return {
        ...state,
        success: false,
        statBlock: {name: action.monsterName}
      }
    default:
      return state;
  }
}

const s3Select = (state = { monsterList:[]}, action) => {
  switch (action.type) {
    case Actions.S3_SELECT_SHOW: 
      return {
        ...state,
        monsterList: action.monsterList
      };
    default:
      return state;
  }
}

const monsterAdvancer = (state = { monster:{} }, action) => {
  switch (action.type) {
    case Actions.DISPLAY_35_MONSTER: 
      return {
        ...state,
        monster: action.monster
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  config, select, monster, s3Select, dmScreen, monsterAdvancer, form: formReducer
})

export default rootReducer