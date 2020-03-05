import React, { Component } from 'react';
import MonsterDisplay from '../MonsterDisplay'
import {advanceMonster} from './AdvanceMonster'
import { Fiendish } from './AdvancementTools/Templates';

const PathfinderMonsterAdvancer = (monster, advancement, options) => {
    const opts = {
        ...options,
        displayOptions: {
            showStatBonuses: true,
            showStatChanges: true,
            showCrChanges: true
        }
    }
    if (advancement) {
        const advancedMonsterChanges = advanceMonster(monster.statBlock, advancement);
        const newMonster = {
            ...monster,
            statBlock: advancedMonsterChanges,
            ...opts
        };
        return newMonster;
    } else {
        return monster;
    }
};


// export default class PathfinderMonsterAdvancer extends Component {
//     render() {
//         const monster = PathfinderMonsterAdvance(this.props.monster, this.props.advancement, this.props.opts);
//         return <MonsterDisplay monster={monster}/>
//     }
// }
export default PathfinderMonsterAdvancer;