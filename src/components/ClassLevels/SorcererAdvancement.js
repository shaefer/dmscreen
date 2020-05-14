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


const SorcererAdvancement = {
    sneakAttack,
    'Sneak Attack': sneakAttack,
}
export default SorcererAdvancement;