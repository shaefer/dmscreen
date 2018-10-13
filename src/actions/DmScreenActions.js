export const ADD_RESULT = 'ADD_RESULT'
export const ADD_CUSTOM_BUTTON = 'ADD_CUSTOM_BUTTON'
export const TOGGLE_FORM = 'TOGGLE_FORM'

export const addDmScreenResult = (result) => ({
    type: 'ADD_RESULT',
    result: result
});

export const addCustomButton = (button) => ({
    type: 'ADD_CUSTOM_BUTTON',
    button: button
});

export const toggleForm = (showForm) => ({
    type: 'TOGGLE_FORM',
    showForm: showForm
});