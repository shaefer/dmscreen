import React, { Component } from 'react';
import { connect } from 'react-redux'
import MonsterDisplay from '../MonsterDisplay'
import Behir from '../../models/Behir_v9';
import Aasimar from '../../models/Aasimar';
import {convertToMonsterForDisplay} from '../MonsterDisplayConverter/MonsterDisplayConverter'
import {advanceMonster} from './AdvanceMonster'

export class PathfinderMonsterAdvancer extends Component {
    render() {
        const monster = {statBlock:Behir, success: true};
        const advancement = {
            hd: 4
        }
        const advancedMonsterChanges = advanceMonster(monster.statBlock, advancement);
        const newMonster = {
            ...monster.statBlock,
            ...advancedMonsterChanges
        };
        console.log(newMonster)
        monster.statBlock = convertToMonsterForDisplay(monster.statBlock, 2);
        return <MonsterDisplay monster={monster}/>
    }
}

export default connect(state => state, {})(PathfinderMonsterAdvancer)