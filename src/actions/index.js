export const SHOW_MONSTER = 'SHOW_MONSTER'

export const showMonster = (monsterJson) => ({
    type: 'SHOW_MONSTER',
    monster: monsterJson
});