import React from 'react'
import MonsterDisplay from '../MonsterDisplay';
import {calculateCr} from '../PathfinderMonsterAdvancer/AdvancementTools/ChallengeRatingCalculator';
import {advanceMonster, advanceByAbilityScores, recalculateMonster} from '../PathfinderMonsterAdvancer/AdvanceMonster'
import {genericMonster} from './BaseMonsters'
import {Human} from './Human'
import {Dwarf} from './Dwarf'
import './MonsterCreator.css'
import AbilityScores from './AbilityScores';

class PathfinderMonsterCreator extends React.Component {
    constructor(props) {
        super(props);
        this.nameChanged = this.nameChanged.bind(this);
        this.statChanged = this.statChanged.bind(this);
        this.updateField = this.updateField.bind(this);
        
        //const advancedMonster = advanceMonster(baseMonster, {hd: 0});
        //console.log("ADVANCED", advancedMonster)
        this.state = {
            monster: {
                success: true,
                statBlock: Dwarf
            }
        }
    }

    updateField(field, val) {
        const statBlockWithChanges = {
            ...this.state.monster.statBlock,
            [field]: val
        };
        const newMonster = recalculateMonster(statBlockWithChanges);
        const finalMonster = {
            ...this.state,
            monster: {
                ...this.state.monster,
                statBlock: newMonster
            }
        }
        this.setState(finalMonster);
    }

    nameChanged(e) {
        this.updateField('name', e.target.value);
    }

    statChanged(stat, val) {
        const currentStat = this.state.monster.statBlock.ability_scores[stat];
        const statChanges = {
            [stat] : (val - currentStat)
        }
        const newMonster = advanceMonster(this.state.monster.statBlock, statChanges);
        //TODO: Remove advance ment specific things like displayName (Stats Altered) since we are building to a new base.
        this.setState({
            ...this.state,
            monster: {
                ...this.state.monster,
                statBlock: newMonster
            }
        });
    }
    
    render() {
        const hdTypeOptions = () => {
            const hdTypes = [4,6,8,10,12];
            return hdTypes.map(x => <option value={x} key={`hdType${x}`}>{x}</option>)
        };
        const onAbilityScoreChange = (fieldName, val) => {
            return this.statChanged(fieldName, val);
        };
        return (
        <main>
            <div className="flex-container">
                <div className="flex-item flex3">
                    <MonsterDisplay monster={this.state.monster}/>
                </div>
                <div className="flex-item">
                    <div className="flexSelect" style={{backgroundColor: 'white'}}>
                        <label>Name: </label><input name="name" onChange={this.nameChanged}/>
                        <div>
                            <AbilityScores abilityScores={this.state.monster.statBlock.ability_scores} onAbilityScoreChange={onAbilityScoreChange}/>
                        </div>
                        <div>
                            <label>Hit Die Type</label>
                            <select value={this.state.monster.statBlock.hdType} onChange={(e) => this.updateField('hdType', parseInt(e.target.value))}>
                                {hdTypeOptions(this.state.monster.statBlock.hdType)}
                            </select>
                        </div>
                    </div>
                </div>
               <pre className="jsonDisplayBox">{JSON.stringify(this.state.monster.statBlock, null, 4)}</pre>
            </div>
        </main>
        );
    }
}

export default PathfinderMonsterCreator;