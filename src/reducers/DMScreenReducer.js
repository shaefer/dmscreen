import * as DmScreenActions from '../actions/DmScreenActions'
import { DMScreenDefaultState } from '../components/DMScreen/DMScreen';

const isDiceButton = (button) => {
  const buttonType = button.type.WrappedComponent.name;
  return buttonType === 'DiceButton' || buttonType === 'StatsButton'
}
const isMonsterButton = (button) => {
  const buttonType = button.type.WrappedComponent.name;
  return buttonType === 'CRButton' || buttonType === 'CRRangeButton'
}

const dmScreen = (state = DMScreenDefaultState, action) => {
    switch (action.type) {
      case DmScreenActions.ADD_RESULT:
        return {
          ...state,
          results: [...state.results, action.result]
        };
      case DmScreenActions.ADD_CUSTOM_BUTTON:
        if (isDiceButton(action.button)) {
          return {
            ...state,
            diceAndStatsButtons: [...state.diceAndStatsButtons, action.button]
          };
        }
        if (isMonsterButton(action.button)) {
          return {
            ...state,
            monsterButtons: [...state.monsterButtons, action.button]
          };
        }
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