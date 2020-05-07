import {statBonusFromAbilityScore, acFieldsFromMods, addOrReplaceInTextList} from '../../components/PathfinderMonsterAdvancer/AdvancementUtils'

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
    fastMovement,
    'Fast Movement': fastMovement,
}
export default Advancement;