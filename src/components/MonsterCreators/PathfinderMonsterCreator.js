import React from 'react'
import MonsterDisplay from '../MonsterDisplay';
import {calculateCr} from '../PathfinderMonsterAdvancer/AdvancementTools/ChallengeRatingCalculator';
import {advanceMonster, advanceByAbilityScores} from '../PathfinderMonsterAdvancer/AdvanceMonster'
import {convertToMonsterForDisplay} from '../MonsterDisplayConverter/MonsterDisplayConverter'

import './MonsterCreator.css'

class PathfinderMonsterCreator extends React.Component {
    constructor(props) {
        super(props);
        this.nameChanged = this.nameChanged.bind(this);
        this.statChanged = this.statChanged.bind(this);
        this.updateField = this.updateField.bind(this);
        const baseMonster = {
            name: 'No Monster Yet!',
            ability_scores: {
                str: 10,
                dex: 10,
                con: 10,
                int: 10,
                wis: 10,
                cha: 10
            },
            "alignment": "N",
            armor_class: {
                ac: {
                    "standard": 10,
                    "flat_footed": 10,
                    "touch": 10
                },
                //ac_details: "15, touch 10, flat-footed 15 (+5 armor)",
                ac_details: "10, touch 10, flat-footed 10",
                ac_modifiers: [
                //   {
                //     "mod": 5,
                //     "type": "armor"
                //   }
                ],
                //"ac_modifiers_details": "+5 armor"
            },
            "base_attack": 0,
            "cmb": 0,
            "cmd": 0,
            "cr": "0",
            "crAsNum": 0,
            "creature_subtype": "",
            "creature_type": "Humanoid",
            "description": "This is a creature.",
            "environment": "any land",
            "feats": "",
            "hdType": 8,
            "hitDice": 0,
            "hitPointAdjustment": 0,
            "hitPoints": 5,
            "hp": "5 (1d8+0)",
            "init": 0,
            "languages": "Common",
            "melee": "heavy mace +0 (1d8)",
            "melee_attacks": [
                [
                    {
                        "attackText": "heavy mace ",
                        "attackBonus": "0",
                        "damage": "(1d8)",
                        "toHit": 0,
                        "attackCount": 1,
                        "damage_details": [
                        {
                            "dice": [
                            {
                                "numOfDice": 1,
                                "numOfSides": 8,
                                "adjustment": 0
                            }
                            ]
                        }
                        ]
                    }
                ]
            ],
            "organization": "solitary, pair, or team (3-6)",
            "racial_modifiers": "",//"+2 Diplomacy, +2 Perception",
            "ranged": "light crossbow +0 (1d8/19-20)",
            "ranged_attacks": [
                [
                    {
                        "attackText": "light crossbow ",
                        "attackBonus": "+0",
                        "damage": "(1d8/19-20)",
                        "toHit": 0,
                        "attackCount": 1,
                        "damage_details": [
                        {
                            "dice": [
                            {
                                "numOfDice": 1,
                                "numOfSides": 8,
                                "adjustment": 0
                            }
                            ],
                            "critRangeAndMultiplier": "19-20"
                        }
                        ]
                    }
                ]
            ],
            "resist": "", //"acid 5, cold 5, electricity 5",
            saving_throws: {
                "fort": 0,
                "ref": 0,
                "will": 0
            },
            "senses": "Perception +0",
            "size": "Medium",
            "skill_details": "Knowledge (religion) +5",
            "skills": [
                {
                "name": "Knowledge ",
                "value": 5,
                "subName": "religion"
                }
            ],
            "source": "Bestiary",
            "special_attacks": "",
            "speed": "30 ft. (20 ft. in armor)",
            "spells": [],
            "treasure": "NPC gear (scale mail, heavy mace, light crossbow with 10 bolts, other treasure)",
            "type": "creature",
            "xp": "200"
        };
        //const advancedMonster = advanceMonster(baseMonster, {hd: 0});
        //console.log("ADVANCED", advancedMonster)
        this.state = {
            monster: {
                success: true,
                statBlock: baseMonster
            }
        }
    }

    updateField(field, val) {
        console.log("UPDATE FIELD", field, val)
        this.setState({
            ...this.state,
            monster: {
                ...this.state.monster,
                statBlock: {
                    ...this.state.monster.statBlock,
                    [field]: val
                }
            }
        });
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
        //TODO: Remove advancment specific things like displayName (Stats Altered) since we are building to a new base.
        this.setState({
            ...this.state,
            monster: {
                ...this.state.monster,
                statBlock: newMonster
            }
        });
    }
    
    render() {
        const monster = {
            ...this.state.monster,
            statBlock: convertToMonsterForDisplay(this.state.monster.statBlock, 2)
        }
        return (
        <main>
            <div className="flex-container">
                <div className="flex-item flex3">
                    <MonsterDisplay monster={monster}/>
                </div>
                <div className="flex-item">
                    <div className="flexSelect" style={{backgroundColor: 'white'}}>
                        <label>Name: </label><input name="name" onChange={this.nameChanged}/>
                        <label>Str: </label><input onChange={(e) => this.statChanged('str', parseInt(e.target.value))}/>
                        <label>Dex: </label><input onChange={(e) => this.statChanged('dex', parseInt(e.target.value))}/>
                        <label>Con: </label><input onChange={(e) => this.statChanged('con', parseInt(e.target.value))}/>
                        <label>Int: </label><input onChange={(e) => this.statChanged('int', parseInt(e.target.value))}/>
                        <label>Wis: </label><input onChange={(e) => this.statChanged('wis', parseInt(e.target.value))}/>
                        <label>Cha: </label><input onChange={(e) => this.statChanged('cha', parseInt(e.target.value))}/>
                    </div>
                </div>
               <pre className="jsonDisplayBox">{JSON.stringify(monster.statBlock, null, 4)}</pre>
            </div>
        </main>
        );
    }
}

export default PathfinderMonsterCreator;