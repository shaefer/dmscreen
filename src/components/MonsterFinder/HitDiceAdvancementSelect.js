import React from 'react'
import './MonsterSelect.css';

export default class HitDiceAdvancementSelect extends React.Component {
    render() {
        console.log("HitDiceAdvancementSelect RENDER", this.props.selectedHitDice, this.props.currentHitDice)
        const initialValue =  (this.props.selectedHitDice) ? this.props.selectedHitDice : this.props.currentHitDice;
        const hitDiceItems = [...Array(100).keys()];
        return (
        <select defaultValue={initialValue} onChange={this.props.onSelect} key={`selectHd${this.props.monsterKey}`}>
            {hitDiceItems.map(x => (<option value={x} key={`selectHd${x}`}>{(x === this.props.currentHitDice) ? `Original HD (${x})` : x}</option>))}
        </select>
        );
    }
};
