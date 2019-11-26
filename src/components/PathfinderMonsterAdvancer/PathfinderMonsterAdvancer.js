import React, { Component } from 'react';
import MonsterDisplay from '../MonsterDisplay'
import {convertToMonsterForDisplay} from '../MonsterDisplayConverter/MonsterDisplayConverter'
import {advanceMonster} from './AdvanceMonster'

export default class PathfinderMonsterAdvancer extends Component {
    render() {
        const opts = {
            displayOptions: {
                showStatBonuses: true,
                showStatChanges: true,
                showCrChanges: true
            }
        }
        const monster = {
            ...this.props.monster,
        }
        // const advancement = {
        //     //hd: 4,
        //     //abilityScores: [{str: 2, dex: 4, reason: "Custom Ability Score Adjustments"}],
        //     //size: 'Colossal'
        // }
        const advancement = this.props.advancement;
        if (advancement) {
            console.log("ADVANCING CREATURE", advancement)
            const advancedMonsterChanges = advanceMonster(monster.statBlock, advancement);
            const newMonster = {
                ...monster.statBlock,
                ...advancedMonsterChanges,
                ...opts
            };
            const statblockVersion = 2;
            const convertedMonster = {
                ...monster,
                statBlock: convertToMonsterForDisplay(newMonster, statblockVersion)
            };
            return <MonsterDisplay monster={convertedMonster}/>
        } else {
            return <MonsterDisplay monster={monster}/>
        }
    }
}