import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import * as Actions from '../actions'
import Aasimar from '../models/AasimarV2'
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

const advancement = (state = {}, action) => {
  switch (action.type) {
    case Actions.ADVANCE_HIT_DICE:
      console.log(`Reduce to advance by hit dice ${action.hitDice}`)
      return {
        ...state,
        hd: action.hitDice
      };
    case Actions.ADVANCE_SIZE:
      return {
        ...state,
        size: action.size
      }
    case Actions.ADVANCE_ABILITY_SCORE:
      const newAbilityScores = {
        ...state.ability_scores,
        [action.abilityScore] : action.value
      }
      return {
        ...state,
        ...newAbilityScores
      }
    case Actions.RESET_HD_ADVANCEMENT:
      const newHdState = {
        ...state
      };
      delete newHdState['hd'];
      return newHdState;
    case Actions.RESET_SIZE_ADVANCEMENT:
      const newSizeState = {
        ...state
      };
      delete newSizeState['size'];
      return newSizeState;
    case Actions.RESET_ABILITY_SCORE_ADVANCEMENT:
      const newAbilityScoreState = {
        ...state
      }
      delete newAbilityScoreState['str'];
      delete newAbilityScoreState['dex'];
      delete newAbilityScoreState['con'];
      delete newAbilityScoreState['int'];
      delete newAbilityScoreState['wis'];
      delete newAbilityScoreState['cha'];
      return newAbilityScoreState;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  config, monster, s3Select, dmScreen, monsterAdvancer, form: formReducer, advancement
})

export default rootReducer