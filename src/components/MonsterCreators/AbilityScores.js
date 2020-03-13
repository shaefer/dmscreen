import React from 'react'

const numOptions = [...Array(100).keys()];
const AbilityScoreSelect = ({field, value, onChange}) => {
    return (
        <React.Fragment>
            <label style={{textTransform:'capitalize'}}>{field}: </label>
            <select value={value} onChange={(e) => onChange(field, parseInt(e.target.value))}>
                {numOptions.map(x => <option value={x} key={`${field}${x}`}>{x}</option>)}
            </select>
        </React.Fragment>
    );
}

const AbilityScores = ({abilityScores, onAbilityScoreChange}) => {
    return (
        <React.Fragment>
            <AbilityScoreSelect field="str" value={abilityScores.str} onChange={onAbilityScoreChange}/>
            <AbilityScoreSelect field="dex" value={abilityScores.dex} onChange={onAbilityScoreChange}/>
            <AbilityScoreSelect field="con" value={abilityScores.con} onChange={onAbilityScoreChange}/>
            <AbilityScoreSelect field="int" value={abilityScores.int} onChange={onAbilityScoreChange}/>
            <AbilityScoreSelect field="wis" value={abilityScores.wis} onChange={onAbilityScoreChange}/>
            <AbilityScoreSelect field="cha" value={abilityScores.cha} onChange={onAbilityScoreChange}/>
        </React.Fragment>
    );
}

export default AbilityScores;