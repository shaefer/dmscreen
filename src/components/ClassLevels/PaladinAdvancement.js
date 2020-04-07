import {statBonusFromAbilityScore} from '../../components/PathfinderMonsterAdvancer/AdvancementUtils'

const divineGrace = (monster) => {
    const chaBonus = statBonusFromAbilityScore(monster.ability_scores.cha);
    const newSavingThrows = {
        ...monster.saving_throws,
        fort: monster.saving_throws.fort + chaBonus,
        ref: monster.saving_throws.ref + chaBonus,
        will: monster.saving_throws.will + chaBonus
    }
    return newSavingThrows;
}

const PaladinAdvancement = {
    divineGrace,
    'Divine Grace': divineGrace,
}
export default PaladinAdvancement;