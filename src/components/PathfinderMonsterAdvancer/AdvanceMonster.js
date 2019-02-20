import { statBonusFromAbilityScore, avgHitPoints } from './AdvancementUtils'
import creatureStatsByType from '../../monsteradvancer/creatureStatsByType';
import { calculateBadSaveChange, calculateGoodSaveChange } from '../../monsteradvancer/BaseSaveCalculator';

export const advanceMonster = (statblock, advancement) => {
    if (advancement.hd) {
        return advanceByHitDice(statblock, -2);
    }
}

const advanceByHitDice = (statblock, hdChange) => {
    //add hd -> namechange, increases hd, increases hp, saves, feat count, bonus stat point awards, cr, exp
    //is current save good or bad based on creatureType. (this probably is not enough with specialized feats)
    //determine increase to base from old and new hitDice change using good or bad save calculation.
    const newHitDice = statblock.hitDice + hdChange;

    const newHitPointsAdjustment = statBonusFromAbilityScore(statblock.ability_scores.con) * newHitDice;
    return {
        advancedName: `${statblock.name} (Advanced ${hdChange} Hit Dice)`,
        hp: hpDisplay(newHitDice, statblock.hdType, newHitPointsAdjustment),
        hitDice: newHitDice,
        hitPointAdjustment: newHitPointsAdjustment,
        saving_throws: getUpdatedSavingThrows(statblock, newHitDice)
    }
}

const getUpdatedSavingThrows = (statblock, newHitDice) => {
    const currentCreatureTypeInfo = creatureStatsByType.find(x => x.creature_type.toLowerCase() == statblock.creature_type.toLowerCase());
    const fortIsGoodSave = currentCreatureTypeInfo.good_saving_throws.indexOf("Fort") !== -1;
    const refIsGoodSave = currentCreatureTypeInfo.good_saving_throws.indexOf("Ref") !== -1;
    const willIsGoodSave = currentCreatureTypeInfo.good_saving_throws.indexOf("Will") !== -1;

    const goodSaveChange = calculateGoodSaveChange(statblock.hitDice, newHitDice);
    const badSaveChange = calculateBadSaveChange(statblock.hitDice, newHitDice);
    
    if (statblock.creature_type != 'humanoid' && statblock.creature_type != 'outsider') {
        const fortChange =  fortIsGoodSave ? goodSaveChange : badSaveChange;
        const refChange = refIsGoodSave ? goodSaveChange : badSaveChange;
        const willChange = willIsGoodSave ? goodSaveChange : badSaveChange;
        return {
            fort: statblock.saving_throws.fort + fortChange,
            ref: statblock.saving_throws.ref + refChange,
            will: statblock.saving_throws.will + willChange
        }
    } else {
        //for humanoid instead of just checking what the chart says we have to determine which save is good. (there is 1)
        //for outsider we have to determine which 2 saves are good.
        const fortChange =  fortIsGoodSave ? goodSaveChange : badSaveChange;
        const refChange = refIsGoodSave ? goodSaveChange : badSaveChange;
        const willChange = willIsGoodSave ? goodSaveChange : badSaveChange;
        return {
            fort: statblock.saving_throws.fort + fortChange,
            ref: statblock.saving_throws.ref + refChange,
            will: statblock.saving_throws.will + willChange
        }
    }
}

const hpDisplay = (hd, hdType, bonusHp) => {
    const bonusHpStr = (bonusHp > 0) ? "+"+bonusHp : bonusHp;
    return Math.floor(hd * avgHitPoints(hdType)) + bonusHp + " (" + hd + "d" + hdType + bonusHpStr + ")";
}
