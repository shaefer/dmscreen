import {statBonusFromAbilityScore, withPlus, addOrReplaceInTextList, sortByNameFn} from '../../components/PathfinderMonsterAdvancer/AdvancementUtils'
import MonsterStatsByCR from '../PathfinderMonsterAdvancer/AdvancementTools/MonsterStatsByCR';
import { rollDice } from '../../utils/DiceBag';

const favoredEnemy = ({monster, classAbilities, generator}) => {
    const favoredEnemyClassAbilities = classAbilities.filter(x => x.parentName === 'Favored Enemy');
    //at 5,10,15,20 we can add +2 to one of the favored Enemies we selected.
    //for each entry after the first pick an index of that one or lower to add to.
    favoredEnemyClassAbilities.forEach((favoredEnemyEntry, idx) => {
        if (idx === 0) return; //the first favored enemy is just the first. Every other selection gives the base bonus and an additional.
        //select a number between idx - 1 and idx.
        const selectedIndex = rollDice(1, idx + 1, generator).total - 1;
        const selected = favoredEnemyClassAbilities[selectedIndex];
        (selected.bonus) ? selected.bonus = selected.bonus + 2 : selected.bonus = 2;
    });
    const favoredEnemyFields = favoredEnemyClassAbilities.map((x, idx) => {
        return `${x.name} ${withPlus((x.bonus||0) + 2)}`
    });
    const prefix = 'Favored Enemies: ';
    const newSQ = prefix + favoredEnemyFields.join("/");
    return {
        special_qualities: addOrReplaceInTextList(monster.special_qualities, newSQ, (x) => x.startsWith(prefix))
    }
}

const favoredTerrain = ({monster, classAbilities, generator}) => {
    const favoredTerrainClassAbilities = classAbilities.filter(x => x.parentName === 'Favored Terrain');

    favoredTerrainClassAbilities.forEach((favoredTerrainEntry, idx) => {
        if (idx === 0) return; //the first favored enemy is just the first. Every other selection gives the base bonus and an additional.
        //select a number between idx - 1 and idx.
        const selectedIndex = rollDice(1, idx + 1, generator).total - 1;
        const selected = favoredTerrainClassAbilities[selectedIndex];
        (selected.bonus) ? selected.bonus = selected.bonus + 2 : selected.bonus = 2;
    });

    const favoredTerrainFields = favoredTerrainClassAbilities.map((x, idx) => {
        return `${x.name} ${withPlus((x.bonus||0) + 2)}`
    });
    const prefix = 'Favored Terrain: ';
    const newSQ = prefix + favoredTerrainFields.join("/");
    return {
        special_qualities: addOrReplaceInTextList(monster.special_qualities, newSQ, (x) => x.startsWith(prefix))
    }
}

const combatStyle = ({monster, classAbilities}) => {
    const selectedFeats = classAbilities.filter(x => {
        return x.parentName === 'Combat Style'
    });
    const feats = selectedFeats.map(x => {
        return {
            name: x.name
        }
    });
    const currentClassFeats = (monster.classFeats) ? monster.classFeats : [];
    const currentRangerFeats = (currentClassFeats['Ranger']) ? currentClassFeats['Ranger'] : [];
    const rangerFeats = currentRangerFeats.concat(feats);
    rangerFeats.sort(sortByNameFn('name'));

    currentClassFeats['Ranger'] = rangerFeats;
    return {
        classFeats: currentClassFeats
    };
}

const RangerAdvancement = {
    combatStyle,
    'Combat Style Feat Selection': combatStyle,
    favoredEnemy,
    'Favored Enemy Selection': favoredEnemy,
    favoredTerrain,
    'Favored Terrain Selection': favoredTerrain,
}
export default RangerAdvancement;