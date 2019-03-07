import MonsterStatsByCR from './MonsterStatsByCR';
import {calcAvgHitPoints, IsFortSaveGood, IsRefSaveGood, IsWillSaveGood, getCreatureTypeInfo} from '../AdvancementUtils';
export const calculateCR = (monster) => {
    const totalHitPoints = calcAvgHitPoints(monster.hitDice, monster.hdType) + monster.hitPointAdjustment;
    const hpCr = calculateHpCr(totalHitPoints);
    const acCr = calculateAcCr(monster.armor_class.ac);
    //attack
    //dmg
    //dc
    const creatureTypeInfo = getCreatureTypeInfo(monster.creature_type);
    const fortSave = monster.saving_throws.fort;
    const fortCr = (IsFortSaveGood(creatureTypeInfo)) ? calculateGoodSaveCr(fortSave) : calculatePoorSaveCr(fortSave);
    const refSave = monster.saving_throws.ref;
    const refCr = (IsRefSaveGood(creatureTypeInfo)) ? calculateGoodSaveCr(refSave) : calculatePoorSaveCr(refSave);
    const willSave = monster.saving_throws.will;
    const willCr = (IsWillSaveGood(creatureTypeInfo)) ? calculateGoodSaveCr(willSave) : calculatePoorSaveCr(willSave);

    const saveCr = (fortCr + refCr + willCr) / 3;
    const aggregateCr = (hpCr + acCr + saveCr) / 3;
    
    return Math.round( aggregateCr * 1e2 ) / 1e2; //https://stackoverflow.com/questions/2283566/how-can-i-round-a-number-in-javascript-tofixed-returns-a-string/14978830
    //equal parts = hp, ac, attack, dmg, dc, saves
}

export const calculateHpCr = (hp) => {
    return calculateStatCr('hp', hp);
}

export const calculateAcCr = (ac) => {
    return calculateStatCr('ac', ac);
}

export const calculateAttackCr = (attack) => {
    return calculateStatCr('highAttack', attack);
}

export const calculateDamageCr = (damage) => {
    return calculateStatCr('avgDmgHigh', damage);
}

export const calculateAbilityDcCr = (dc) => {
    return calculateStatCr('primaryAbilityDc', dc);
}

export const calculateGoodSaveCr = (save) => {
    return calculateStatCr('goodSave', save);
} 

export const calculatePoorSaveCr = (save) => {
    return calculateStatCr('poorSave', save);
} 

export const calculateStatCr = (statField, value) => {
    const crEntry = MonsterStatsByCR.find(x => x[statField] <= value);
    return (crEntry) ? crEntry.cr : 0;
}