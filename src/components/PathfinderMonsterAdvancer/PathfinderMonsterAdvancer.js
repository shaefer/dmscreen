import React, { Component } from 'react';
import { connect } from 'react-redux'
import MonsterDisplay from '../MonsterDisplay'
import Behir from '../../models/Behir_v9';
import {convertToMonsterForDisplay} from '../MonsterDisplayConverter/MonsterDisplayConverter'
import {advanceMonster} from './AdvanceMonster'

export class PathfinderMonsterAdvancer extends Component {
    render() {
        const opts = {
            displayOptions: {
                showStatBonuses: true,
                showStatChanges: true,
            }
        }
        const monster = {statBlock:Behir, success: true};
        const advancement = {
            hd: 4
        }
        const advancedMonsterChanges = advanceMonster(monster.statBlock, advancement);
        const newMonster = {
            ...monster.statBlock,
            ...advancedMonsterChanges,
            ...opts
        };
        console.log(newMonster)
        const statblockVersion = 2;
        monster.statBlock = convertToMonsterForDisplay(newMonster, statblockVersion);
        return <MonsterDisplay monster={monster}/>
    }
}

export default connect(state => state, {})(PathfinderMonsterAdvancer)