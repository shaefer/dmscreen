import React from 'react'

const AbilityScores = ({abilityScores, onAbilityScoreChange}) => {
    const numOptions = [...Array(100).keys()];
    return (
        <React.Fragment>
            <label>Str: </label>
            <select onChange={(e) => onAbilityScoreChange('str', parseInt(e.target.value))}>
                {numOptions.map(x => <option value={x} selected={(x === abilityScores.str ? 'true': '')}>{x}</option>)}
            </select>
            <label>Dex: </label>
            <select onChange={(e) => onAbilityScoreChange('dex', parseInt(e.target.value))}>
                {numOptions.map(x => <option value={x} selected={(x === abilityScores.dex ? 'true': '')}>{x}</option>)}
            </select>
            <label>Con: </label>
            <select onChange={(e) => onAbilityScoreChange('con', parseInt(e.target.value))}>
                {numOptions.map(x => <option value={x} selected={(x === abilityScores.con ? 'true': '')}>{x}</option>)}
            </select>
            <label>Int: </label>
            <select onChange={(e) => onAbilityScoreChange('int', parseInt(e.target.value))}>
                {numOptions.map(x => <option value={x} selected={(x === abilityScores.int ? 'true': '')}>{x}</option>)}
            </select>
            <label>Wis: </label>
            <select onChange={(e) => onAbilityScoreChange('wis', parseInt(e.target.value))}>
                {numOptions.map(x => <option value={x} selected={(x === abilityScores.wis ? 'true': '')}>{x}</option>)}
            </select>
            <label>Cha: </label>
            <select onChange={(e) => onAbilityScoreChange('cha', parseInt(e.target.value))}>
                {numOptions.map(x => <option value={x} selected={(x === abilityScores.cha ? 'true': '')}>{x}</option>)}
            </select>
        </React.Fragment>
    );
}

export default AbilityScores;