const replaceDr = (details, type, newAmount, suffix) => {  
    const idx = details.findIndex(x => x.endsWith(type));
    const fullSuffix = (suffix) ? ` (${suffix})` : '';
    if (idx !== -1) {
        const detailStr = details[idx];
        const amount = parseInt(detailStr.match(/\d+/));
        if (newAmount > amount) {
            const regex = new RegExp(`\\d+\/${type}`);
            details[idx] = detailStr.replace(regex, `${newAmount}/${type}${fullSuffix}`);
        }
    } else {
        details.push(`${newAmount}/${type}${fullSuffix}`);
    }
}

//weaponTraining
//weaponMastery
export const armorMastery = (monster, level) => {
    const dr = monster.dr;
    const drDetails = (dr) ? dr.split(', ') : [];
    replaceDr(drDetails, "-", 5, 'while wearing armor or using a shield'); //might be nice to make this return the change rather than mutate.
    const sortedDetails = drDetails.sort((a, b) => {
        if (a.indexOf("-") !== -1) return -1;
        if (b.indexOf("-") !== -1) return 1;
        return a - b;
    });
    const newDr = sortedDetails.join(', '); 
    return newDr;
}

const armorTraining = (monster, level) => {
    const ac = monster.armor_class;
    const acMods = monster.armor_class.ac_modifiers.slice(0);
    const maxDexBoost = Math.min(4, Math.floor((level + 1)/4));
    const newMods = acMods.map(x => {
        if (x.maxDex) {
            return {
                ...x,
                type: x.type + `[with armor training ${maxDexBoost}]`,
                maxDex: x.maxDex + maxDexBoost
            }
        }
        return x;
    });
    return {
        ...ac,
        ac_modifiers: newMods
    };
}

const bravery = (monster, level) => {
    const willBonusVsFear = Math.floor((level + 2)/4);
    const willDetails = [{bonus: willBonusVsFear, details: 'fear', source: 'bravery'}];
    //TODO: Find existing fear will changes and merge. or this will need to be done on display via grouping by details
    const newWillDetails = (monster.saving_throws.willDetails) ? [...monster.saving_throws.willDetails, ...willDetails] : willDetails;
    const newSavingThrows = {
        ...monster.saving_throws,
        willDetails: newWillDetails,
    }
    return newSavingThrows;
}

//TODO: Also make feat selectioms and add them to the additional feats object.
const bonusFeat = (monster, level) => {
    const bonusFeats = Math.floor(level/2) + 1;
    const newAdditionalFeats = [{featRestrictions: 'combat', featCount: bonusFeats, source: 'fighter', name: 'Fighter Bonus Feats'}];
    //create new
    if (!monster.additionalFeats) return newAdditionalFeats;
    const existingFighterIndex = monster.additionalFeats.findIndex(x => x.source === 'fighter');
    //replace the entry
    if (monster.additionalFeats && existingFighterIndex !== -1) {
        monster.additionalFeats[existingFighterIndex] = newAdditionalFeats;
        return monster.additionalFeats;
    }
    //add to existing list
    return [...monster.additionalFeats, ...newAdditionalFeats]
}

const FighterAdvancement = {
    armorMastery,
    'Armor Mastery': armorMastery,
    armorTraining,
    'Armor Training': armorTraining,
    bonusFeat,
    'Bonus Feat': bonusFeat,
    bravery,
    'Bravery': bravery,
}
export default FighterAdvancement;