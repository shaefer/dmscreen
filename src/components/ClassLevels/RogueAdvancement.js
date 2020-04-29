import {addOrReplaceInTextList, statBonusFromAbilityScore} from '../../components/PathfinderMonsterAdvancer/AdvancementUtils'
import MonsterStatsByCR from '../PathfinderMonsterAdvancer/AdvancementTools/MonsterStatsByCR';
import { rollDice } from '../../utils/DiceBag';

const sneakAttack = ({monster, level}) => {
    const sneakDice = Math.floor((level + 1) / 2);
    return (m) => {
        //when rendering check for added rogue talents that alter sneak attack
        //REFACTOR THOUGHTS: There is a coupling here that we depend on the state of the monster post class advancement which adds a large burden on test setup to make the advanced monster look like the full monster to run this function. It was easier to make this display func able to display something if the classabilities that we dig through later for alterations aren't necessary for a render.
        const defaultDisplay = `sneak attack +${sneakDice}d6`;
        if (!m || !m.classLevelAbilities) return defaultDisplay;
        const classAbilities = m.classLevelAbilities.find(x => x.source === 'Rogue');
        if (!classAbilities) return defaultDisplay;
        const hasCripplingStrike = classAbilities.specialAbilities.find(x => x.name === 'Crippling Strike');
        const suffix = (hasCripplingStrike) ? ' (2 str damage)' : '';
        return `${defaultDisplay}${suffix}`;
    }
}

const trapSense = ({monster, level}) => {
    const bonus = Math.floor(level / 3);
    const newItem = `trap sense +${bonus}`;
    const startsWithTrapSense = (x => x.startsWith('trap sense'));
    const defensiveAbilities = addOrReplaceInTextList(monster.defensive_abilities, newItem, startsWithTrapSense);

    return {
        defensive_abilities: defensiveAbilities
    }
}

const evasion = ({monster}) => {
    const newItem = `evasion`;
    const evasion = (x => x === 'evasion');
    const defensiveAbilities = addOrReplaceInTextList(monster.defensive_abilities, newItem, evasion);

    return {
        defensive_abilities: defensiveAbilities
    }
}

const improvedEvasion = ({monster}) => {
    const newItem = `improved evasion`;
    const anyEvasion = (x => x.endsWith('evasion'));
    const defensiveAbilities = addOrReplaceInTextList(monster.defensive_abilities, newItem, anyEvasion);

    return {
        defensive_abilities: defensiveAbilities
    }
}

const uncannyDodge = ({monster}) => {
    const newItem = `uncanny dodge`;
    const findAbility = (x => x === 'uncanny dodge');
    const defensiveAbilities = addOrReplaceInTextList(monster.defensive_abilities, newItem, findAbility);

    return {
        defensive_abilities: defensiveAbilities
    }
}

const improvedUncannyDodge = ({monster}) => {
    const newItem = `improved uncanny dodge`;
    const findAbility = (x => x.endsWith('uncanny dodge'));
    const defensiveAbilities = addOrReplaceInTextList(monster.defensive_abilities, newItem, findAbility);

    return {
        defensive_abilities: defensiveAbilities
    }
}

const masterStrike = ({monster, level}) => {
    //The DC of this save is equal to 10 + 1/2 the rogue’s level + the rogue’s Intelligence modifier.
    const dc = 10 + Math.floor(level / 2) + statBonusFromAbilityScore(monster.ability_scores.int)
    return () => `master strike (DC ${dc})`;
}

const RogueAdvancement = {
    evasion,
    'Evasion': evasion,
    improvedEvasion,
    'Improved Evasion': improvedEvasion,
    sneakAttack,
    'Sneak Attack': sneakAttack,
    trapSense,
    'Trap Sense': trapSense,
    uncannyDodge,
    'Uncanny Dodge': uncannyDodge,
    improvedUncannyDodge,
    'Improved Uncanny Dodge': improvedUncannyDodge,
    masterStrike,
    'Master Strike': masterStrike,
}
export default RogueAdvancement;