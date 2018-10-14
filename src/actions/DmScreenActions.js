export const ADD_RESULT = 'ADD_RESULT'
export const ADD_CUSTOM_BUTTON = 'ADD_CUSTOM_BUTTON'
export const TOGGLE_FORM = 'TOGGLE_FORM'
export const ADD_MONSTER_RESULT = 'ADD_MONSTER_RESULT'
export const S3_SELECT_DMSCREEN_SHOW = 'S3_SELECT_DMSCREEN_SHOW'

export const addDmScreenResult = (result) => ({
    type: ADD_RESULT,
    result: result
});

export const addCustomButton = (button) => ({
    type: ADD_CUSTOM_BUTTON,
    button: button
});

export const toggleForm = (showForm) => ({
    type: TOGGLE_FORM,
    showForm: showForm
});

export const showS3SelectDMScreenResult = (monsterListJson, searchParams) => ({
    type: S3_SELECT_DMSCREEN_SHOW,
    monsterList: monsterListJson,
    searchParams: searchParams
});

export const addMonsterResult = (result) => ({
    type: ADD_MONSTER_RESULT,
    result: result
});