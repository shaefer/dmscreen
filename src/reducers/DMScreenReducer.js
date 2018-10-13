import React from 'react'
import * as DmScreenActions from '../actions/DmScreenActions'
import * as Actions from '../actions'
import MonsterDisplay from '../components/MonsterDisplay'
import ReactGA from 'react-ga';

const dmScreen = (state = {results:[], buttons:[], showForm: false}, action) => {
    const category = "DM Screen";
    switch (action.type) {
      case DmScreenActions.ADD_RESULT:
        return {
          ...state,
          results: state.results.concat(action.result)
        };
      case DmScreenActions.ADD_CUSTOM_BUTTON:
        return {
          ...state,
          buttons: state.buttons.concat(action.button)
        };
      case DmScreenActions.TOGGLE_FORM:
        return {
          ...state,
          showForm: action.showForm
        };
      case Actions.S3_SELECT_DMSCREEN_SHOW:
        ReactGA.event({
          category: category,
          action: action.searchParams
        })
        return {
          ...state,
          results: [...state.results, action.monsterList]
        }
      case Actions.SHOW_MONSTER:
        if (action.source === category) {
          ReactGA.event({
            category: category,
            action: action.monster.name
          })
        }
        return {
          ...state,
          results: [...state.results, <MonsterDisplay monster={{statBlock: action.monster}}/>]
        }
      default:
        return state;
    }
  }

  export default dmScreen;