import {statBonusFromAbilityScore, withPlus, addOrReplaceInTextList} from '../../components/PathfinderMonsterAdvancer/AdvancementUtils'
import MonsterStatsByCR from '../PathfinderMonsterAdvancer/AdvancementTools/MonsterStatsByCR';

const favoredEnemy = (monster, rangerLevel, classAbilities) => {
    console.log("FAVORED ENEMY", classAbilities);
    const favoredEnemyFields = classAbilities.map((x, idx) => {
        const bonus = (classAbilities.length - idx) * 2; //when we get the next favored our bonus increases...so we count the selections after us to get final count.
        return `${x.name} ${withPlus(bonus)}`
    });
    const prefix = 'Favored Enemies: ';
    const newSQ = prefix + favoredEnemyFields.join("/");
    return {
        special_qualities: addOrReplaceInTextList(monster.special_qualities, newSQ, (x) => x.startsWith(prefix))
    }
}

const RangerAdvancement = {
    favoredEnemy,
    'Favored Enemy Selection': favoredEnemy
}
export default RangerAdvancement;