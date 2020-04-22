import {statBonusFromAbilityScore} from '../PathfinderMonsterAdvancer/AdvancementUtils';
const channelEnergy = ({monster, level: clericLevel}) => {
    const dmgDice = Math.round(clericLevel/2);
    const chaBonus = statBonusFromAbilityScore(monster.ability_scores.cha);
    const dc = 10 + Math.floor(clericLevel/2) + chaBonus;
    const perDay = 3 + chaBonus;
    const displayFn = () => `channel energy ${perDay}/day (DC ${dc}, ${dmgDice}d6)`;
    return displayFn;
}

const ClericAdvancement = {
    channelEnergy,
    'Channel Energy': channelEnergy,
}
export default ClericAdvancement;