import MonsterStatsByCR from './MonsterStatsByCR';
import {calcAvgHitPoints, IsFortSaveGood, IsRefSaveGood, IsWillSaveGood, getCreatureTypeInfo} from '../AdvancementUtils';
import getCaptureGroups from '../../../utils/RegexHelper';

export const calculateCR = (monster) => {
    const totalHitPoints = calcAvgHitPoints(monster.hitDice, monster.hdType) + monster.hitPointAdjustment;
    const hpCr = calculateHpCr(totalHitPoints);
    console.log(monster.armor_class)
    const acCr = calculateAcCr(monster.armor_class.ac.standard);
   
    const attackCr = (monster.melee) ? calculateAttackCr(monster.melee_attacks) : calculateAttackCr(monster.ranged_attacks);
    const dmgCr = (monster.melee) ? calculateDamageCr(monster.melee_attacks) : calculateDamageCr(monster.ranged_attacks);
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
    const aggregateCr = (hpCr + acCr + saveCr + attackCr + dmgCr) / 5;
    
    const calculatedCr = Math.round( aggregateCr * 1e2 ) / 1e2; //https://stackoverflow.com/questions/2283566/how-can-i-round-a-number-in-javascript-tofixed-returns-a-string/14978830
    
    console.log(monster.name + " " + monster.cr + " " + calculatedCr);
    return {
        total: calculatedCr,
        original: monster.crAsNum,
        hp: hpCr,
        ac: acCr,
        saves: saveCr,
        fort: fortCr,
        ref: refCr,
        will: willCr,
        attack: attackCr,
        damage: dmgCr
    };
    //equal parts = hp, ac, attack, dmg, dc, saves
}

export const calculateHpCr = (hp) => {
    return calculateStatCr('hp', hp);
}

export const calculateAcCr = (ac) => {
    return calculateStatCr('ac', ac);
}

export const calculateAttackCr = (attacks) => {
    const firstAttackBonusOfMainAttack = parseInt(attacks[0][0].attackBonus);
    return calculateStatCr('highAttack', firstAttackBonusOfMainAttack);
}

export const calculateDamageCr = (attacks) => {
    const firstAttack = attacks[0];
    //calculate the dmg from each part of that attack.
    let sumOfDmg = 0;
    for (let i = 0; i<firstAttack.length; i++) {
        const dmg = firstAttack[i].damage;
        const damageAmountsRegex = /(\d+d\d+[\+\-]*\d*|(?<!DC )(?<!DC \d)\d+)\/?(\d*-\d*\/[×x][234]|\d*-\d*|[x×][234])* ?(cold|bleed|acid|electricity|fire|negative energy|energy|sonic|Strength|Dexterity|Constitution|Wisdom|Intelligence|Charisma|Str|Dex|Con|Int|Wis|Cha)* ?(damage|drain)*/gm;
        const matches = getCaptureGroups(damageAmountsRegex, dmg)
        for(let i = 0;i<matches.length;i++) {
            const match = matches[i];
            const dice = match[1];
            //const critRangeAndMultiplier = match[2];
            const dmgType = match[3];
            //const statDmgOrDrain = match[4];
            const avgDmg = diceAverage(dice);
            sumOfDmg += avgDmg;
        }
        //first just dice part of damage string: \d+d\d+[\+\-]*\d*
        //https://regex101.com/r/X8yCC3/1/
    }
    return calculateStatCr('avgDmgHigh', sumOfDmg);
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
            const adjustment = parseInt(match[4]);
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