import MonsterStatsByCR from './MonsterStatsByCR';
import {calcAvgHitPoints, IsFortSaveGood, IsRefSaveGood, IsWillSaveGood, getCreatureTypeInfo} from '../AdvancementUtils';
import getCaptureGroups from '../../../utils/RegexHelper';

export const roundDecimal = (num) => {
    //return +(Math.round(num + "e+2")  + "e-2"); //https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary
    return Math.round( num * 1e2 ) / 1e2; //https://stackoverflow.com/questions/2283566/how-can-i-round-a-number-in-javascript-tofixed-returns-a-string/14978830    
}

const sum = (someArray) => {
    return someArray.reduce((arr, n) => arr + n);
}

export const calculateCR = (monster) => {
    const totalHitPoints = calcAvgHitPoints(monster.hitDice, monster.hdType) + monster.hitPointAdjustment;

    let calculatedCrs = [];
    const hpCr = calculateHpCr(totalHitPoints);
    calculatedCrs.push(hpCr);
    const acCr = calculateAcCr(monster.armor_class.ac.standard);
    calculatedCrs.push(acCr);
    const attackCr = (monster.melee) ? calculateAttackCr(monster.melee_attacks) : calculateAttackCr(monster.ranged_attacks);
    const dmgCr = (monster.melee) ? calculateDamageCr(monster.melee_attacks) : calculateDamageCr(monster.ranged_attacks);
    if (monster.melee || monster.ranged) {
        calculatedCrs.push(attackCr);
        calculatedCrs.push(dmgCr);
    }
    //dc
    const creatureTypeInfo = getCreatureTypeInfo(monster.creature_type);
    const saveCrs = calculatedSaveDcs(creatureTypeInfo, monster.saving_throws.fort, monster.saving_throws.ref, monster.saving_throws.will);
    if (saveCrs) {
        calculatedCrs.push(saveCrs.saves);
    }
    console.log(monster.name, calculatedCrs)
    const aggregateCr =sum(calculatedCrs) / calculatedCrs.length;
    //const aggregateCr = (monster.melee || monster.ranged) ? (hpCr + acCr + saveCrs.saveCr + attackCr + dmgCr) / 5 : (hpCr + acCr + saveCrs.saveCr) / 3;
    
    const calculatedCr = roundDecimal(aggregateCr); //https://stackoverflow.com/questions/2283566/how-can-i-round-a-number-in-javascript-tofixed-returns-a-string/14978830
    
    const crObject = {
        total: calculatedCr,
        original: monster.crAsNum,
        hp: hpCr,
        ac: acCr,
        attack: attackCr,
        damage: dmgCr
    };
    const mergedCrs = {
        ...crObject,
        ...saveCrs
    };
    //console.log(monster.name, mergedCrs);
    return mergedCrs;
}

const calculatedSaveDcs = (creatureTypeInfo, fortSave, refSave, willSave) => {
    if (!creatureTypeInfo) return;
    const fortCr = (IsFortSaveGood(creatureTypeInfo)) ? calculateGoodSaveCr(fortSave) : calculatePoorSaveCr(fortSave);
    const refCr = (IsRefSaveGood(creatureTypeInfo)) ? calculateGoodSaveCr(refSave) : calculatePoorSaveCr(refSave);
    const willCr = (IsWillSaveGood(creatureTypeInfo)) ? calculateGoodSaveCr(willSave) : calculatePoorSaveCr(willSave);

    const saveCr = roundDecimal((fortCr + refCr + willCr) / 3);
    return {
        saves:saveCr,
        fort:fortCr,
        ref:refCr,
        will:willCr
    };
}

export const calculateHpCr = (hp) => {
    return calculateStatCr('hp', hp);
}

export const calculateAcCr = (ac) => {
    return calculateStatCr('ac', ac);
}

export const calculateAttackCr = (attacks) => {
    if (!attacks) return 0;
    const firstAttackBonusOfMainAttack = parseInt(attacks[0][0].attackBonus);
    return calculateStatCr('highAttack', firstAttackBonusOfMainAttack);
}

export const calculateDamageFromAttackSequence = (attackSequence) => {
    let sumOfDmg = 0;
    for (let i = 0; i<attackSequence.length; i++) {
        const dmg = attackSequence[i].damage;
        const damageAmountsRegex = /(\d+d\d+[\+\-]*\d*|(?<!DC )(?<!DC \d)\d+)\/?(\d*-\d*\/[×x][234]|\d*-\d*|[x×][234])* ?(cold|bleed|acid|electricity|fire|negative energy|energy|sonic|Strength|Dexterity|Constitution|Wisdom|Intelligence|Charisma|Str|Dex|Con|Int|Wis|Cha)* ?(damage|drain)*/gm;
        const matches = getCaptureGroups(damageAmountsRegex, dmg)
        for(let i = 0;i<matches.length;i++) {
            const match = matches[i];
            const dice = match[1];
            //const critRangeAndMultiplier = match[2];
            const dmgType = match[3];
            //const statDmgOrDrain = match[4];
            
            const avgDmg = diceAverage(dice);
            //console.log("match", i, dice, avgDmg)
            sumOfDmg += avgDmg;
        }
        //first just dice part of damage string: \d+d\d+[\+\-]*\d*
        //https://regex101.com/r/X8yCC3/1/
    }
    return sumOfDmg;
}

export const calculateDamageCr = (attacks) => {
    if (!attacks) return 0;
    //console.log("input to dmg cr calc", attacks);
    const firstAttack = attacks[0];
    //calculate the dmg from each part of that attack.
    const damage = calculateDamageFromAttackSequence(firstAttack);
    return calculateStatCr('avgDmgHigh', damage);
}

const diceAverage = (diceNotation) => {
    if (diceNotation.indexOf("d") === -1) {
        //just a straight number...no dice to roll.
        return diceNotation;
    } else {
        //https://regex101.com/r/FD7Z9L/1
        const diceRegex = /((\d*)d(\d*))([\+\-]?\d*)/gm;
        const matches = getCaptureGroups(diceRegex, diceNotation);
        let sumOfDmg = 0;
        for(let i = 0;i<matches.length;i++) {
            const match = matches[i];
            const numOfDice = match[2];
            const numOfSides = match[3];
            const adjustment = parseInt(match[4]) || 0;
            const avgDmg = (numOfDice * (numOfSides / 2 + 0.5)) + adjustment;
            sumOfDmg += avgDmg;
        }
        return sumOfDmg;
    }
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