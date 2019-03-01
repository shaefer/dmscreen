import React, { Component } from 'react';
import { connect } from 'react-redux'
import MonsterDisplay from '../MonsterDisplay'
import Behir from '../../models/Behir_v9';
import MonstersV2 from '../../models/MonstersV2';
import {convertToMonsterForDisplay} from '../MonsterDisplayConverter/MonsterDisplayConverter'
import {advanceMonster} from './AdvanceMonster'

export default class PathfinderMonsterAdvancer extends Component {
    render() {
        const opts = {
            // displayOptions: {
            //     showStatBonuses: true,
            //     showStatChanges: true,
            // }
        }
        const monsterV2 = MonstersV2.find(x => x.name === this.props.monster.statBlock.name); //current lookups use old data...how do we upgrade the data?
        const monster = {
            ...this.props.monster,
            statBlock: monsterV2
        }
        // const advancement = {
        //     //hd: 4,
        //     //abilityScores: [{str: 2, dex: 4, reason: "Custom Ability Score Adjustments"}],
        //     //size: 'Colossal'
        // }
        const advancement = this.props.advancement;
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
    }
}