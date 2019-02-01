import creatureStatsByType from './creatureStatsByType'

export const calculateGoodSave = (hitDice) => {
    return Math.floor(hitDice / 2) + 2;
}

export const calculateBadSave = (hitDice) => {
    return Math.floor(hitDice / 3);
}