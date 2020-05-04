import {statBonusFromAbilityScore, acFieldsFromMods, addOrReplaceInTextList} from '../../components/PathfinderMonsterAdvancer/AdvancementUtils'

const acBonus = ({monster, level}) => {
    const levelBonus = Math.floor(level / 4);
    const acMods = monster.armor_class.ac_modifiers.slice(0);
    const monkMod = {
        mod: (monster) => statBonusFromAbilityScore(monster.ability_scores.wis) + levelBonus, //by calculating later we guarantee we have the fully altered stat.
        type: "Monk"
    }
    return acFieldsFromMods(monster, acMods.concat(monkMod)); //while this is designed to be calculated solely from the acMods this allows us to keep the full object to to date as we go. Long run...we should delete most of this so no one is using the calculated fields unless they calculate it.
}

const flurryOfBlows = ({monster, level}) => {
    const findByName = (x) => x === 'flurry of blows';
    const sq = addOrReplaceInTextList(monster.special_qualities, "flurry of blows", findByName);
    return {
        special_qualities: sq
    }
}

const stunningFist = ({level}) => {
    //stunning fist (20/day, DC 27)
    return (monster) => `stunning fist (${level + Math.floor((monster.totalHitDice - level) / 4)}/day, DC ${10 + Math.floor(monster.totalHitDice/2) + statBonusFromAbilityScore(monster.ability_scores.wis)})`
}

const Advancement = {
    acBonus,
    'AC Bonus': acBonus,
    flurryOfBlows,
    'Flurry of Blows': flurryOfBlows,
    stunningFist,
    'Stunning Fist': stunningFist,
}
export default Advancement;