import * as DmScreenActions from '../actions/DmScreenActions'

const dmScreen = (state = {results:[], buttons:[], showForm: false}, action) => {
    switch (action.type) {
      case DmScreenActions.ADD_RESULT:
        return {
          ...state,
          results: [...state.results, action.result]
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
      case DmScreenActions.S3_SELECT_DMSCREEN_SHOW:
        return {
          ...state,
          results: [...state.results, action.monsterList]
        }
      default:
        return state;
    }
  }

  export default dmScreen;