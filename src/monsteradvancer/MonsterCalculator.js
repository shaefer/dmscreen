import creatureStatsByType from './creatureStatsByType'

const hdTypes = ["d4", "d6", "d8", "d10", "d12"];
const creatureTypes = ["Aberration", "Animal", "Construct", "Dragon", "Fey", "Humanoid", "Magical beast", "Monstrous humanoid", "Ooze", "Outsider", "Plant", "Undead", "Vermin"];
const saveTypes = [{name:"Reflex", abbr: "Ref"}, {name:"Will", abbr: "Will"}, {name:"Fortitude", abbr: "Fort"}];
const abilityScores = [{name: "Strength", abbr: "Str"}, {name: "Dexterity", abbr: "Dex"}, {name: "Constitution", abbr: "Con"}, {name:"Intelligence", abbr: "Int"}, {name: "Wisdom", abbr: "Wis"}, {name:"Charisma", abbr: "Cha"}];

//TODO: Not sure this particularly Javascripty...or needed. But it might make it easy to store the serializable speedId and convert to the function as needed...maybe we return the function rather than actually do the calculation...
export const calculateBaseAttackBonus = (hitDice, speedId) => {
    const speed = speedId.toLowerCase();
    if (speed == "slow") {
        return calculateSlowBaseAttackBonus(hitDice);
    }
    if (speed == "medium") {
        return calculateMediumBaseAttackBonus(hitDice);
    }
    if (speed == "fast") {
        return calculateFastBaseAttackBonus(hitDice);
    }
    throw "Base Attack Bonus cannot be calculated for: " + speedId;
}

export const calculateSlowBaseAttackBonus = (hitDice) => {
    return Math.floor(hitDice / 2);
}

export const calculateMediumBaseAttackBonus = (hitDice) => {
    return Math.floor(hitDice * 3 / 4);
}

export const calculateFastBaseAttackBonus = (hitDice) => {
    //validate as number
    if (hitDice >= 1) return hitDice;
    if (hitDice >= 0 && hitDice < 1) return 1;
    throw "Hit Dice of less than 0 cannot be calculated: " + hitDice;
}

export const getBaseAttackBonusByHitDiceAndCreatureType = (hitDice, creatureType) => {
    //validate hitDiceType, creatureType
    const creatureTypeLower = creatureType.toLowerCase();
    const creatureTypeInfo = creatureStatsByType.find(x => x.creature_type.toLowerCase() == creatureTypeLower);
    if (!creatureTypeInfo) throw "No creature type found for: " + creatureType;

    return calculateBaseAttackBonus(hitDice, creatureTypeInfo.base_attack_bonus);
}

