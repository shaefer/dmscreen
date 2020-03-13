import {advanceMonster} from './AdvanceMonster'

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
export default PathfinderMonsterAdvancer;