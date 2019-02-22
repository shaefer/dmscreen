import creatureStatsByType from './AdvancementTools/creatureStatsByType';
import {calculateGoodSaveChange, calculateBadSaveChange} from './AdvancementTools/BaseSaveCalculator';

export const hpDisplay = (hd, hdType, bonusHp) => {
    const bonusHpStr = (bonusHp > 0) ? "+"+bonusHp : bonusHp;
    return Math.floor(hd * avgHitPoints(hdType)) + bonusHp + " (" + hd + "d" + hdType + bonusHpStr + ")";
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

export const increaseHighestStat = (abilityScores, statChange, reason) => {
    //TODO: Ensure we have polyfilled.
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
    const newAbilityScore = {[highestStat[0]]: statChange}
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
    const allScores = [abilityScores, ...changes];
    return allScores.reduce((total, current) => {
        const newStats = {
            str: total.str + current.str,
            dex: total.dex + current.dex,
            con: total.con + current.con,
            int: total.int + current.int,
            wis: total.wis + current.wis,
            cha: total.cha + current.cha,
        };
        return newStats;
    });
}

//TODO: There is a MonsterConstants file we should decide if we should use for these magic strings.
const IsFortSaveGood = (creatureTypeInfo) => {
    if (creatureTypeInfo.creature_type !== 'Humanoid' && creatureTypeInfo.creature_type !== 'Outsider') {
        return creatureTypeInfo.good_saving_throws.indexOf("Fort") !== -1;
    } else {
        return false;
    }
}

const IsRefSaveGood = (creatureTypeInfo) => {
    if (creatureTypeInfo.creature_type !== 'Humanoid' && creatureTypeInfo.creature_type !== 'Outsider') {
        return creatureTypeInfo.good_saving_throws.indexOf("Ref") !== -1;
    } else {
        return false;
    }
}

const IsWillSaveGood = (creatureTypeInfo) => {
    if (creatureTypeInfo.creature_type !== 'Humanoid' && creatureTypeInfo.creature_type !== 'Outsider') {
        return creatureTypeInfo.good_saving_throws.indexOf("Will") !== -1;
    } else {
        return false;
    }
}

export const getSavingThrowChangesFromHitDice = (statblock, newHitDice) => {
    const currentCreatureTypeInfo = creatureStatsByType.find(x => x.creature_type.toLowerCase() === statblock.creature_type.toLowerCase());

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

export const getUpdatedSavingThrows = (statblock, newHitDice) => {
    const changes = getSavingThrowChangesFromHitDice(statblock, newHitDice);
    const savingThrows = statblock.saving_throws;
    return applyChangesToSavingThrows(savingThrows, changes);
}

export const applyChangesToSavingThrows = (savingThrows, changes) => {
    const allScores = [savingThrows, ...changes];
    return allScores.reduce((total, current) => {
        const newSavingThrows = {
            fort: total.fort + current.fort,
            ref: total.ref + current.ref,
            will: total.will + current.will,
            changes: changes
        };
        return newSavingThrows;
    });
}