import { addDmScreenResult, addCustomButton, toggleForm, reorderButtonList } from '../actions/DmScreenActions'

export const dmScreenAddResultAction = (result) => (dispatch, getState) => {
    dispatch(addDmScreenResult(result));
}

export const addCustomButtonAction = (button) => (dispatch) => {
    dispatch(addCustomButton(button))
}

export const toggleFormAction = (showForm) => (dispatch) => {
    dispatch(toggleForm(showForm))
}

export const reorderButtonListAction = (listKey, previousIndex, nextIndex) => (dispatch) => {
    dispatch(reorderButtonList(listKey, previousIndex, nextIndex))
}
