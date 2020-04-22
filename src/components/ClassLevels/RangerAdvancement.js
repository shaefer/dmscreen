import {statBonusFromAbilityScore, withPlus, addOrReplaceInTextList} from '../../components/PathfinderMonsterAdvancer/AdvancementUtils'
import MonsterStatsByCR from '../PathfinderMonsterAdvancer/AdvancementTools/MonsterStatsByCR';

const favoredEnemy = ({monster, classAbilities}) => {
    const favoredEnemyClassAbilities = classAbilities.filter(x => x.parentName === 'Favored Enemy');
    //at 5,10,15,20 we can add +2 to one of the favored Enemies we selected.
    const favoredEnemyFields = favoredEnemyClassAbilities.map((x, idx) => {
        const bonus = (favoredEnemyClassAbilities.length - idx) * 2; //when we get the next favored our bonus increases...so we count the selections after us to get final count.
        return `${x.name} ${withPlus(bonus)}`
    });
    const prefix = 'Favored Enemies: ';
    const newSQ = prefix + favoredEnemyFields.join("/");
    return {
        special_qualities: addOrReplaceInTextList(monster.special_qualities, newSQ, (x) => x.startsWith(prefix))
    }
}

const favoredTerrain = ({monster, classAbilities}) => {
    const favoredTerrainClassAbilities = classAbilities.filter(x => x.parentName === 'Favored Terrain');
    const favoredTerrainFields = favoredTerrainClassAbilities.map((x, idx) => {
        const bonus = (favoredTerrainClassAbilities.length - idx) * 2; //when we get the next favored our bonus increases...so we count the selections after us to get final count.
        return `${x.name} ${withPlus(bonus)}`
    });
    const prefix = 'Favored Terrain: ';
    const newSQ = prefix + favoredTerrainFields.join("/");
    return {
        special_qualities: addOrReplaceInTextList(monster.special_qualities, newSQ, (x) => x.startsWith(prefix))
    }
}

const RangerAdvancement = {
    favoredEnemy,
    'Favored Enemy Selection': favoredEnemy,
    favoredTerrain,
    'Favored Terrain Selection': favoredTerrain,
}
export default RangerAdvancement;