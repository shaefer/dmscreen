import {statBonusFromAbilityScore, acFieldsFromMods, addOrReplaceInTextList, 
        combatManeuverChanges, replaceDrByType} from '../../components/PathfinderMonsterAdvancer/AdvancementUtils'
import {calculateBaseAttackBonus } from '../../monsteradvancer/BaseAttackBonusCalculator'
const acBonus = ({monster, level}) => {
    const levelBonus = Math.floor(level / 4);
    const acMods = monster.armor_class.ac_modifiers.slice(0);
    const monkMod = {
        mod: levelBonus, //by calculating later we guarantee we have the fully altered stat.
        type: "Monk"
    }
    const wisMod = {
        mod: (monster) => statBonusFromAbilityScore(monster.ability_scores.wis),
        type: "Wis"
    }
    const mods = [monkMod, wisMod]
    return acFieldsFromMods(monster, acMods.concat(mods)); //while this is designed to be calculated solely from the acMods this allows us to keep the full object to to date as we go. Long run...we should delete most of this so no one is using the calculated fields unless they calculate it.
}

const flurryOfBlows = ({monster, level}) => {
    const findByName = (x) => x === 'flurry of blows';
    const sq = addOrReplaceInTextList(monster.special_qualities, "flurry of blows", findByName);
    return {
        special_qualities: sq
    }
}

const stunningFist = ({level}) => {
    //stunning fist (20/day, DC 27)
    return (monster) => `stunning fist (${level + Math.floor((monster.totalHitDice - level) / 4)}/day, DC ${10 + Math.floor(monster.totalHitDice/2) + statBonusFromAbilityScore(monster.ability_scores.wis)})`
}

const evasion = ({monster}) => {
    const newItem = `evasion`;
    const evasion = (x => x === 'evasion');
    const defensiveAbilities = addOrReplaceInTextList(monster.defensive_abilities, newItem, evasion);

    return {
        defensive_abilities: defensiveAbilities
    }
}

const improvedEvasion = ({monster}) => {
    const newItem = `improved evasion`;
    const findEvasion = (x => x === 'improved evasion' || x === 'evasion');
    const defensiveAbilities = addOrReplaceInTextList(monster.defensive_abilities, newItem, findEvasion);

    return {
        defensive_abilities: defensiveAbilities
    }
}

const bonusFeat = ({monster, level, classAbilities}) => {
    const bonusFeats = Math.floor((level + 2)/4) + 1;
    const selectedFeats = classAbilities.filter(x => x.originalName === 'Bonus Feat Selection').map(x => x.name);
    const newAdditionalFeats = {featRestrictions: 'monk', featCount: bonusFeats, source: 'monk', name: 'Monk Bonus Feats', feats: selectedFeats};
    //create new
    if (!monster.additionalFeats) return {
        additionalFeats: [newAdditionalFeats]
    }
    const existingIndex = monster.additionalFeats.findIndex(x => x.source === 'monk');
    //replace the entry
    if (monster.additionalFeats && existingIndex !== -1) {
        monster.additionalFeats[existingIndex] = newAdditionalFeats;
        return {
            additionalFeats: monster.additionalFeats
        }
    }
    //add to existing list
    return {
        additionalFeats: [...monster.additionalFeats, ...[newAdditionalFeats]]
    };
}

//TODO: Parse monster.speed into speed_details
const fastMovement = ({monster, level}) => {
    const speedBonus = Math.floor(level / 3) * 10;
    const fastMovementEntry = `monk fast movement +${speedBonus} ft.`
    const speeds = monster.speed.split(",").map(x => x.trim()).slice(0);
    //swim, fly, climb, burrow
    const landSpeedIndex = speeds.findIndex(x => x.match(/^\d/)); //special speeds list the type of speed first...thus land speed starts with digit.
    const newSQ = addOrReplaceInTextList(monster.special_qualities, fastMovementEntry, x => x.startsWith('monk fast movement'));
    if (landSpeedIndex === -1) {
        return {
            speed: monster.speed,
            special_qualities: newSQ
        }
    }

    const landSpeed = speeds[landSpeedIndex]
    const landSpeedInt = parseInt(landSpeed);
    const newSpeed = landSpeedInt + speedBonus;

    return {
        speed: addOrReplaceInTextList(monster.speed, `${newSpeed} ft.`, x => x.match(/^\d/)),
        special_qualities: newSQ
    }
}

const maneuverTraining = ({monster, level, classInfo}) => {
    const monkBab = calculateBaseAttackBonus(level, classInfo.base_attack_bonus);
    return combatManeuverChanges(monster,level - monkBab,0)
}

const stillMind = ({monster, level}) => {
    const willBonus = 2;
    const willDetails = [{bonus: willBonus, details: 'enchantment', source: 'Still Mind'}];
    //TODO: Find existing fear will changes and merge. or this will need to be done on display via grouping by details
    const newWillDetails = (monster.saving_throws.willDetails) ? [...monster.saving_throws.willDetails, ...willDetails] : willDetails;
    const newSavingThrows = {
        ...monster.saving_throws,
        willDetails: newWillDetails,
    }
    return {
        saving_throws: newSavingThrows
    }
}

const kiPool = ({monster, level}) => {
    //makes the assumption that level 4 is the earliest you get this power. Just need some more code if we don't want that assumption.
    const kiPoints = Math.floor(level / 2) + statBonusFromAbilityScore(monster.ability_scores.wis);
    const kiPowers = [`${kiPoints} points`, 'magic'];
    if (level >= 7) kiPowers.push("cold iron and silver");
    if (level >= 10) kiPowers.push("lawful");
    if (level >= 16) kiPowers.push("adamantine");
    kiPowers.sort();
    return {
        special_qualities: addOrReplaceInTextList(monster.special_qualities, `ki pool (${kiPowers.join(", ")})`, x => x.startsWith('ki pool'))
    };
}

const slowFall = ({monster, level}) => {
    const distance = Math.floor(level / 2) * 10;
    const distStr = (level === 20) ? 'any distance' : `${distance} ft.`;
    const slowFallStr = `slow fall (${distStr})`
    return {
        special_qualities: addOrReplaceInTextList(monster.special_qualities, slowFallStr, x => x.startsWith('slow fall'))
    }
}

const purityOfBody = ({monster}) => {
    return {
        immune: addOrReplaceInTextList(monster.immune, 'disease', x => x === 'disease')
    }
}

const diamondBody = ({monster}) => {
    return {
        immune: addOrReplaceInTextList(monster.immune, 'poison', x => x === 'poison')
    }
}

const diamondSoul = ({monster, level}) => {
    const monkSr = level + 10;
    return {
        sr: (monster.sr) ? Math.max(monster.sr, monkSr) : monkSr 
    }
}

const quiveringPalm = ({level}) => {
    const dc = Math.floor(level / 2) + 10 ;
    return (m) => `quivering palm (DC ${dc + statBonusFromAbilityScore(m.ability_scores.wis)})`;
}

const perfectSelf = ({monster}) => {
    const dr = monster.dr;
    const drDetails = (dr) ? dr.split(', ') : [];
    return {
        dr: replaceDrByType(drDetails, 'chaotic', 10).join(", ")
    }
}

const Advancement = {
    acBonus,
    'AC Bonus': acBonus,
    bonusFeat,
    'Bonus Feat': bonusFeat,
    flurryOfBlows,
    'Flurry of Blows': flurryOfBlows,
    stunningFist,
    'Stunning Fist': stunningFist,
    evasion,
    'Evasion': evasion,
    improvedEvasion,
    'Improved Evasion': improvedEvasion,
    fastMovement,
    'Fast Movement': fastMovement,
    maneuverTraining,
    'Maneuver Training': maneuverTraining,
    stillMind,
    'Still Mind': stillMind,
    kiPool,
    'Ki Pool': kiPool,
    slowFall,
    'Slow Fall': slowFall,
    purityOfBody,
    'Purity of Body': purityOfBody,
    diamondBody,
    'Diamond Body': diamondBody,
    diamondSoul,
    'Diamond Soul': diamondSoul,
    quiveringPalm,
    'Quivering Palm': quiveringPalm,
    perfectSelf,
    'Perfect Self': perfectSelf,
}
export default Advancement;