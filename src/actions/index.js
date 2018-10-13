export const SHOW_MONSTER = 'SHOW_MONSTER'
export const SELECT_MONSTER = 'SELECT_MONSTER'
export const S3_SELECT_SHOW = 'S3_SELECT_SHOW'
export const S3_SELECT_DMSCREEN_SHOW = 'S3_SELECT_DMSCREEN_SHOW'

export const showMonster = (monsterJson) => ({
    type: 'SHOW_MONSTER',
    monster: monsterJson
});

export const showS3SelectResult = (monsterListJson, searchParams) => ({
    type:'S3_SELECT_SHOW',
    monsterList: monsterListJson,
    searchParams: searchParams
});

export const showS3SelectDMScreenResult = (monsterListJson, searchParams) => ({
    type:'S3_SELECT_DMSCREEN_SHOW',
    monsterList: monsterListJson,
    searchParams: searchParams
});

export const selectMonsterOption = (selectedMonsterName) => ({
    type: 'SELECT_MONSTER',
    name: selectedMonsterName
});

/* Monster Advancer 3.5 v2 Actions */
export const DISPLAY_35_MONSTER = 'LOOKUP_MONSTER'
export const display35Monster = (monster) => ({
    type: DISPLAY_35_MONSTER,
    monster: monster
});