const Templates = [];

// Fiendish Creature (CR +0 or +1)
// Creatures with the fiendish template live in the Lower Planes, such as the Abyss and Hell, but can be summoned using spells such as summon monster and planar ally. A fiendish creature's CR increases by +1 only if the base creature has 5 or more HD. A fiendish creature's quick and rebuild rules are the same.

// Rebuild Rules: 
//CR  +1 if hd >= 5
//Senses gains darkvision 60 ft.; 
//Defensive Abilities gains DR and energy resistance as noted on the table; 
//SR gains SR equal to new CR +5; 
//Special Attacks smite good 1/day as a swift action (adds Cha bonus to attack rolls and damage bonus equal to HD against good foes; smite persists until target is dead or the fiendish creature rests).
const fiendishResistAndDrByHd = (hd) => {
    if (hd >= 0 && hd <= 4) {
        return {resist: 5, dr: 0};
    }
    if(hd >= 5 && hd <= 10) {
        return {resist: 10, dr: 5};
    }
    if (hd > 10) {
        return {resist: 15, dr: 10};
    }
    return {resist:0, dr: 0};
};
const replaceResistance = (resistDetails, type, newAmount) => {
    const resistIndex = resistDetails.findIndex(x => x.startsWith(type));
    if (resistIndex !== -1) {
        const resistStr = resistDetails[resistIndex];
        const amount = parseInt(resistStr.match(/\d+/));
        if (newAmount > amount) {
            const regex = new RegExp(`${type} \\d+`);
            resistDetails[resistIndex] = resistStr.replace(regex, `${type} ${newAmount}`);
        }
    } else {
        resistDetails.push(`${type} ${newAmount}`);
    }
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
const removeType = (details, typeToRemove) => {
    const indexToRemove = details.findIndex(x => x.endsWith(typeToRemove));
    if (indexToRemove !== -1)
        return details.splice(indexToRemove, 1);
}
const Fiendish = (statblock) => {
    const resist = (resist, hitDice) => {
        const resistDetails = (resist) ? resist.split(', ') : [];
        const newResistVals = fiendishResistAndDrByHd(hitDice);
        replaceResistance(resistDetails, 'cold', newResistVals.resist);
        replaceResistance(resistDetails, 'fire', newResistVals.resist);
        const sortedResistDetails = resistDetails.sort();
        const newResist = sortedResistDetails.join(", ");
        return {resist: newResist};
    } 

    const dr = (dr, hitDice) => {
        const drDetails = (dr) ? dr.split(', ') : [];
        const newDrVals = fiendishResistAndDrByHd(hitDice);
        replaceDr(drDetails, 'good', newDrVals.dr);
        removeType(drDetails, 'evil'); //basically deciding that good and evil DR can't happen on the same creature.
        const sortedDetails = drDetails.sort();
        const newDr = sortedDetails.join(', ');
        return {dr: newDr};
    }
    const crAdjustment = (statblock.hitDice >= 5) ? 1 : 0;
    const baseCr = (statblock.crCalculation && statblock.crCalculation.crDiff) ? Math.round(statblock.crCalculation.crAdjusted) : Math.round(parseFloat(statblock.cr));
    const existingAdjustments = (statblock.crAdjustments) ? statblock.crAdjustments : [];
    const crAdjustments = (existingAdjustments.length > 0) ? existingAdjustments.map(x => x.val).reduce((agg, x) => agg + x) : 0;
    const cr = baseCr + crAdjustments + crAdjustment;
    const sr  = (sr, cr) => {
        return (sr) ? {sr: Math.max(sr, cr + 5)} : {sr: cr + 5};
    }

    return {
        ...statblock,
        ...resist(statblock.resist, statblock.hitDice),
        ...dr(statblock.dr, statblock.hitDice),
        ...sr(statblock.sr, cr),
        crAdjustments : [
            ...existingAdjustments,
            {source: 'Fiendish Template', val: crAdjustment}
        ]
    }
};

export {Fiendish};