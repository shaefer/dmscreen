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

const replaceDr = (details, type, newAmount) => {  
    const idx = details.findIndex(x => x.endsWith(type));
    if (idx !== -1) {
        const detailStr = details[idx];
        const amount = parseInt(detailStr.match(/\d+/));
        if (newAmount > amount) {
            const regex = new RegExp(`\\d+\/${type}`);
            details[idx] = detailStr.replace(regex, `${newAmount}/${type}`);
        }
    } else {
        details.push(`${newAmount}/${type}`);
    }
}

const addNewDr = (dr, drToApply, drType) => {
    const drDetails = (dr) ? dr.split(', ') : [];
    replaceDr(drDetails, drType, drToApply); //might be nice to make this return the change rather than mutate.
    const sortedDetails = drDetails.sort((a, b) => {
        if (a.indexOf("-") !== -1) return -1;
        if (b.indexOf("-") !== -1) return 1;
        return a - b;
    });
    const newDr = sortedDetails.join(', '); 
    return newDr;
}

const auraOfRighteousness = (monster) => {
    return addNewDr(monster.dr, 5, 'evil');
}

const holyChampion = (monster) => {
    return addNewDr(monster.dr, 10, 'evil');
}

const PaladinAdvancement = {
    divineGrace,
    'Divine Grace': divineGrace,
    auraOfRighteousness,
    'Aura of Righteousness': auraOfRighteousness,
    holyChampion,
    'Holy Champion': holyChampion,
}
export default PaladinAdvancement;