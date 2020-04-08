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

const caseInsensitiveAlphaSort = (a,b) => {
    a = a.toLowerCase();
    b = b.toLowerCase();
    if (a > b) {
        return 1;
    } else if (a < b) {
        return -1;
    } else if (a === b) {
        return 0;
    }
}

const addToTextList = (field, newItem) => {
    const items = (field) ? field.split(",").map(x => x.trim()) : [];
    items.push(newItem);
    items.sort(caseInsensitiveAlphaSort);
    return items.join(', ')
}

const addAura = (monster, newAura) => {
    return addToTextList(monster.aura, newAura);
}

const addImmunity = (monster, newImmunity) => {
    return addToTextList(monster.immune, newImmunity);
}

const auraOfResolve = (monster) => {
    return {
        aura: addAura(monster, 'resolve (10 ft.)')
    }
}

const auraOfJustice = (monster) => {
    return {
        aura: addAura(monster, 'justice (10 ft.)')
    }
}

const auraOfFaith = (monster) => {
    return {
        aura: addAura(monster, 'faith (10 ft.)')
    }
}

const auraOfRighteousness = (monster) => {
    return {
        dr: addNewDr(monster.dr, 5, 'evil'),
        aura: addAura(monster, "righteousness (10 ft.)")
    };
}

const holyChampion = (monster) => {
    return addNewDr(monster.dr, 10, 'evil');
}

const divineHealth = (monster) => {
    return {
        immune: addImmunity(monster, 'disease')
    }
}

const auraOfCourage = (monster) => {
    return {
        immune: addImmunity(monster, 'fear'),
        aura: addAura(monster, 'courage (10 ft.)')
    }
}

const PaladinAdvancement = {
    divineGrace,
    'Divine Grace': divineGrace,
    divineHealth,
    'Divine Health': divineHealth,
    auraOfCourage,
    'Aura of Courage': auraOfCourage,
    auraOfFaith, 
    'Aura of Faith': auraOfFaith,
    auraOfJustice,
    'Aura of Justice': auraOfJustice,
    auraOfResolve,
    'Aura of Resolve': auraOfResolve,
    auraOfRighteousness,
    'Aura of Righteousness': auraOfRighteousness,
    holyChampion,
    'Holy Champion': holyChampion,
}
export default PaladinAdvancement;