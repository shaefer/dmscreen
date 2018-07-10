export const SHOW_MONSTER = 'SHOW_MONSTER'
export const SELECT_MONSTER = 'SELECT_MONSTER'
export const S3_SELECT_SHOW = 'S3_SELECT_SHOW'
export const S3_SELECT_DMSCREEN_SHOW = 'S3_SELECT_DMSCREEN_SHOW'
export const ADD_RESULT = 'ADD_RESULT'
export const ADD_CUSTOM_BUTTON = 'ADD_CUSTOM_BUTTON'
export const TOGGLE_FORM = 'TOGGLE_FORM'

export const showMonster = (monsterJson) => ({
    type: 'SHOW_MONSTER',
    monster: monsterJson
});

export const showS3SelectResult = (monsterListJson, searchParams) => ({
    type:'S3_SELECT_SHOW',
    monsterList: monsterListJson,
    searchParams: searchParams
});

export const showS3SelectDMScreenResult = (monsterListJson) => ({
    type:'S3_SELECT_DMSCREEN_SHOW',
    monsterList: monsterListJson
});

export const selectMonsterOption = (selectedMonsterName) => ({
    type: 'SELECT_MONSTER',
    name: selectedMonsterName
});

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