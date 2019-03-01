import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import * as Actions from '../actions'
import Aasimar from '../models/Aasimar'
import MonstersV2 from '../models/MonstersV2'
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

const monster = (state = { statBlock: MonstersV2.find(x => x.name == 'Aasimar'), success: true}, action) => {
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

const advancement = (state = {}, action) => {
  switch (action.type) {
    case Actions.ADVANCE_HIT_DICE:
      console.log(`Reduce to advance by hit dice ${action.hitDice}`)
      return {
        ...state,
        hd: action.hitDice
      };
    case Actions.RESET_HD_ADVANCEMENT:
      console.log('RESET HD ADVANCEMENT')
      return {};
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  config, select, monster, s3Select, dmScreen, monsterAdvancer, form: formReducer, advancement
})

export default rootReducer