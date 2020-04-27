import creatureStatsByType from './AdvancementTools/creatureStatsByType';
import {calculateGoodSaveChange, calculateBadSaveChange, calculateGoodSave, calculateBadSave} from './AdvancementTools/BaseSaveCalculator';

export const calcAvgHitPoints = (hd, hdType) => {
    return Math.floor(hd * avgHitPoints(hdType));
}

export const hdDisplay = (hd, hdType, bonusHp, source) => {
    const bonusHpStr = (bonusHp >= 0) ? "+"+bonusHp : bonusHp;
    return hd + "d" + hdType + bonusHpStr + `[${source}]`;
}

export const avgHitPoints = (hdType) => {
    return hdType / 2 + 0.5;
}

export const statBonusFromAbilityScore = (abilityScore) => {
    return Math.floor((abilityScore - 10) / 2);
}

export const racialFeatCount = (hitDice) => {
    return Math.round(hitDice / 2); //every 2 hitdice at odd levels 1 + 1 for every 2 so 1 = 1, 2 = 1, 3 = 2;
}

export const withPlus = (stat) => {
    return (stat >= 0) ? `+${stat}` : stat;
}

const getHighestStat = (abilityScores) => {
    const stats = Object.entries(abilityScores);
    const highestStat = stats.sort((a,b) => b[1] - a[1])[0];
    return highestStat;
}

export const getStatByKey = (abilityScores, key) => {
    const stats = Object.keys(abilityScores);
    return [key, abilityScores[key]];
}

export const increaseHighestStat = (abilityScores, statChange, reason) => {
    //TODO: Ensure we have polyfilled Object.entries for getHighestStat.
    const highestStat = getHighestStat(abilityScores);
    const newAbilityScore = {
        [highestStat[0]]: highestStat[1] + statChange,
        reason
    }
    return {
        ...abilityScores,
        ...newAbilityScore
    };
}

export const assignAbilityScoreChangeToHighestStat = (abilityScores, statChange, reason) => {
    //TODO: Ensure we have polyfilled.
    const highestStat = getHighestStat(abilityScores);
    return assignAbilityScoreChangeToStat(highestStat, statChange, reason);
}

export const assignAbilityScoreChangeToStat = (statToChange, statChange, reason) => {
    const newAbilityScore = {[statToChange[0]]: statChange}
    const emptyAbilityScores = {
        str:0,dex:0,con:0,int:0,wis:0,cha:0,
        reason
    };
    return {
        ...emptyAbilityScores,
        ...newAbilityScore
    };
}

export const applyAbilityScoreChanges = (abilityScores, changes) => {
    const noConAlteration = (abilityScores.con === 0) ? true : false;
    const allScores = [abilityScores, ...changes];
    //TODO: Add logic to handle stat minimums and base stats that start as 0 not changing.
    return allScores.reduce((total, current) => {
        const newStats = {
            str: total.str + (current.str || 0),
            dex: total.dex + (current.dex || 0),
            con: total.con + ((noConAlteration) ? 0 : (current.con || 0)),
            int: total.int + (current.int || 0),
            wis: total.wis + (current.wis || 0),
            cha: total.cha + (current.cha || 0),
        };
        return newStats;
    });
}

//TODO: There is a MonsterConstants file we should decide if we should use for these magic strings.
export const IsFortSaveGood = (creatureTypeInfo) => {
    if (creatureTypeInfo.creature_type !== 'Humanoid' && creatureTypeInfo.creature_type !== 'Outsider') {
        return creatureTypeInfo.good_saving_throws.indexOf("Fort") !== -1;
    } else {
        return false;
    }
}

export const IsRefSaveGood = (creatureTypeInfo) => {
    if (creatureTypeInfo.creature_type !== 'Humanoid' && creatureTypeInfo.creature_type !== 'Outsider') {
        return creatureTypeInfo.good_saving_throws.indexOf("Ref") !== -1;
    } else {
        return false;
    }
}

export const IsWillSaveGood = (creatureTypeInfo) => {
    if (creatureTypeInfo.creature_type !== 'Humanoid' && creatureTypeInfo.creature_type !== 'Outsider') {
        return creatureTypeInfo.good_saving_throws.indexOf("Will") !== -1;
    } else {
        return false;
    }
}

export const getCreatureTypeInfo = (creatureType) => {
    if (!creatureType) {
        //console.warn("Creature type was not found. Returning Dragon Type as default.");
        return creatureStatsByType.find(x => x.creature_type === 'Dragon');
    }
    return creatureStatsByType.find(x => x.creature_type.toLowerCase() === creatureType.toLowerCase());
}

export const getSavingThrowChangesFromHitDice = (statblock, newHitDice) => {
    const currentCreatureTypeInfo = getCreatureTypeInfo(statblock.creature_type);

    const goodSaveChange = calculateGoodSaveChange(statblock.hitDice, newHitDice);
    const badSaveChange = calculateBadSaveChange(statblock.hitDice, newHitDice);
    
    const fortChange =  IsFortSaveGood(currentCreatureTypeInfo) ? goodSaveChange : badSaveChange;
    const refChange = IsRefSaveGood(currentCreatureTypeInfo) ? goodSaveChange : badSaveChange;
    const willChange = IsWillSaveGood(currentCreatureTypeInfo) ? goodSaveChange : badSaveChange;
    return {
        fort: fortChange,
        ref: refChange,
        will: willChange
    };
}

export const getSavingThrowChangesFromClass = (newHitDice, goodSavingThrows) => {
    const goodSaveChange = calculateGoodSave(newHitDice);
    const badSaveChange = calculateBadSave(newHitDice);

    //console.log(goodSavingThrows, goodSaveChange, badSaveChange, goodSavingThrows.indexOf("Fort") !== -1)

    const fortChange =  goodSavingThrows.indexOf("Fort") !== -1 ? goodSaveChange : badSaveChange;
    const refChange = goodSavingThrows.indexOf("Ref") !== -1 ? goodSaveChange : badSaveChange;
    const willChange = goodSavingThrows.indexOf("Will") !== -1 ? goodSaveChange : badSaveChange;
    const newSaves = {
        fort: fortChange,
        ref: refChange,
        will: willChange
    };
    //console.log("CLASS SAVES", newSaves)
    return newSaves;
}

export const getConstructBonusHitPoints = (size) => {
    const ConstructBonusHitPoints = {
        Diminutive: 10,
        Fine: 10,
        Small: 10,
        Tiny: 10,
        Medium: 20,
        Large: 30,
        Huge: 40,
        Gargantuan: 60,
        Colossal: 80
    }
    return ConstructBonusHitPoints[size];
}

export const getStatBonusDifference = (origStats, newStats) => {
    return {
        str: statBonusFromAbilityScore(newStats.str) - statBonusFromAbilityScore(origStats.str),
        dex: statBonusFromAbilityScore(newStats.dex) - statBonusFromAbilityScore(origStats.dex),
        con: statBonusFromAbilityScore(newStats.con) - statBonusFromAbilityScore(origStats.con),
        int: statBonusFromAbilityScore(newStats.int) - statBonusFromAbilityScore(origStats.int),
        wis: statBonusFromAbilityScore(newStats.wis) - statBonusFromAbilityScore(origStats.wis),
        cha: statBonusFromAbilityScore(newStats.cha) - statBonusFromAbilityScore(origStats.cha)
    }
}

export const getSavingThrowChangesFromStatChanges = (origStats, newStats, creatureType) => {
    const statDiff = getStatBonusDifference(origStats, newStats);
    const fortChange = (creatureType !== 'Undead') ? statDiff.con : statDiff.cha;
    const refChange = statDiff.dex;
    const willChange = statDiff.wis;
    return {
        fort: fortChange,
        ref: refChange,
        will: willChange,
    }
}

export const getUpdatedSavingThrows = (statblock, newHitDice) => {
    const changes = getSavingThrowChangesFromHitDice(statblock, newHitDice);
    const savingThrows = statblock.saving_throws;
    return applyChangesToSavingThrows(savingThrows, changes);
}

export const applyChangesToSavingThrows = (savingThrows, changes) => {
    const mergedChanges = (savingThrows.changes) ? [...savingThrows.changes, ...changes] : changes;
    const allScores = [savingThrows, ...changes];
    return allScores.reduce((total, current) => {
        const newSavingThrows = {
            ...savingThrows,
            fort: total.fort + current.fort,
            ref: total.ref + current.ref,
            will: total.will + current.will,
            changes: mergedChanges
        };
        return newSavingThrows;
    });
}

export const calcTouchAc = (acMods, maxDex) => {
    const touchTypes = ["Dex", "size", "dodge"];
    const getTouchMods = acMods.filter(x => touchTypes.indexOf(x.type) !== -1);
    const touchTotal = 10 + getTouchMods
                            .map(x => (x.type === 'Dex' && maxDex < x.mod) ? maxDex : x.mod)
                            .reduce((acc, v) => acc + v, 0);
    return touchTotal;
}

export const calcTotalAc = (acMods, maxDex) => {
    const total = 10 + acMods
                        .map(x => (x.type === 'Dex' && maxDex < x.mod) ? maxDex : x.mod)
                        .reduce((acc, v) => acc + v, 0);
    return total;
}

export const calcFlatFootedAc = (acMods) => {
    const flatFootedTypes = ["natural", "size", "armor"];
    const getFlatFootedMods = acMods.filter(x => flatFootedTypes.indexOf(x.type) !== -1);
    const ffTotal = 10 + getFlatFootedMods.map(x => x.mod).reduce((acc, v) => acc + v, 0);
    return ffTotal;
}

export const displayArmorClass = (acMods) => {
    const maxDex = Math.min(...acMods.filter(x => x.hasOwnProperty('maxDex')).map(x => x.maxDex))
    const total = calcTotalAc(acMods, maxDex);
    const touchTotal = calcTouchAc(acMods, maxDex);
    const ffTotal = calcFlatFootedAc(acMods);
    const modStr = acMods.map(x => {
        return (x.type === 'Dex' && maxDex < x.mod) 
            ? `${withPlus(x.mod)} ${x.type} [max ${withPlus(maxDex)}]`
            : `${withPlus(x.mod)} ${x.type}`;
    }).join(', ');

    return `${total}, touch ${touchTotal}, flat-footed ${ffTotal} (${modStr})`;
}

export const caseInsensitiveAlphaSort = (a,b) => {
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

export const asOrdinal = (i) => {
    var j = i % 10,
        k = i % 100;
    if (j === 1 && k !== 11) {
        return i + "st";
    }
    if (j === 2 && k !== 12) {
        return i + "nd";
    }
    if (j === 3 && k !== 13) {
        return i + "rd";
    }
    return i + "th";
}

export const sortByNameFn = (fieldName) => {
    const sortFn = (a,b) => {
        a = a[fieldName].toLowerCase();
        b = b[fieldName].toLowerCase();
        if (a > b) {
            return 1;
        } else if (a < b) {
            return -1;
        } else if (a === b) {
            return 0;
        }
    }
    return sortFn;
}

export const addToTextList = (field, newItem, sortFunc = caseInsensitiveAlphaSort) => {
    const items = (field) ? field.split(/\,\s?(?![^\(]*\))/g).map(x => x.trim()) : [];
    items.push(newItem);
    items.sort(sortFunc);
    return items.join(', ')
}

export const addOrReplaceInTextList = (field, newItem, findIndexFunc, sortFunc = caseInsensitiveAlphaSort) => {
    const items = (field) ? field.split(/\,\s?(?![^\(]*\))/g).map(x => x.trim()) : [];
    const existingIndex = items.findIndex(x => findIndexFunc(x));
    if (existingIndex !== -1) {
        items[existingIndex] = newItem
    } else {
        items.push(newItem);
    }
    items.sort(sortFunc);
    return items.join(', ')
}