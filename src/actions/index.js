export const SHOW_MONSTER = 'SHOW_MONSTER'
export const SELECT_MONSTER = 'SELECT_MONSTER'
export const S3_SELECT_SHOW = 'S3_SELECT_SHOW'
export const ADD_RESULT = 'ADD_RESULT'

export const showMonster = (monsterJson) => ({
    type: 'SHOW_MONSTER',
    monster: monsterJson
});

export const showS3SelectResult = (monsterListJson) => ({
    type:'S3_SELECT_SHOW',
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