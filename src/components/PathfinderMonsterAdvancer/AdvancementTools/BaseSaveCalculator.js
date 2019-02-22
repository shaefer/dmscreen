import creatureStatsByType from './creatureStatsByType'

export const calculateGoodSave = (hitDice) => {
    return Math.floor(hitDice / 2) + 2;
}

export const calculateBadSave = (hitDice) => {
    return Math.floor(hitDice / 3);
}

export const calculateBadSaveChange = (origHitDice, newHitDice) => {
    return calculateBadSave(newHitDice) - calculateBadSave(origHitDice);
}

export const calculateGoodSaveChange = (origHitDice, newHitDice) => {
    return calculateGoodSave(newHitDice) - calculateGoodSave(origHitDice);
}