export const SHOW_MONSTER = 'SHOW_MONSTER'

const fetchMonster = (monsterName) => (dispatch, getState) => {
    return fetch(`https://www.cleverorc.com/${monsterName}`)
        .then(resp => resp.json())
        .then(json => dispatch(showMonster(json)))
}

const showMonster = (monsterJson) => ({
    type: 'SHOW_MONSTER',
    monster: monsterJson
});