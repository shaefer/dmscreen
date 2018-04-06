export const SHOW_MONSTER = 'SHOW_MONSTER'
export const SELECT_MONSTER = 'SELECT_MONSTER'

export const showMonster = (monsterJson) => ({
    type: 'SHOW_MONSTER',
    monster: monsterJson
});

export const selectMonsterOption = (selectedMonsterName) => ({
    type: 'SELECT_MONSTER',
    name: selectedMonsterName
});