import fighter from "../../data/Classes/Fighter";

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

//bonusFeat
//bravery
//armorTraining
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

const FighterAdvancement = {
    armorMastery,
    'Armor Mastery': armorMastery,
    armorTraining,
    'Armor Training': armorTraining
    // damageReduction,
    // 'Damage Reduction': damageReduction,
}
export default FighterAdvancement;