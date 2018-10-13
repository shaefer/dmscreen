import { addDmScreenResult, addCustomButton, toggleForm } from '../actions/DmScreenActions'

export const dmScreenAddResultAction = (result) => (dispatch, getState) => {
    dispatch(addDmScreenResult(result));
}

export const addCustomButtonAction = (button) => (dispatch) => {
    dispatch(addCustomButton(button))
}

export const toggleFormAction = (showForm) => (dispatch) => {
    dispatch(toggleForm(showForm))
}