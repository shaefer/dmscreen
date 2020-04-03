//TODO: Also make feat selectioms and add them to the additional feats object.
const bonusFeat = (monster, level) => {
    const bonusFeats = Math.floor(level/2) + 1;
    const newAdditionalFeats = [{featRestrictions: 'combat', featCount: bonusFeats, source: 'fighter', name: 'Fighter Bonus Feats'}];
    //create new
    if (!monster.additionalFeats) return newAdditionalFeats;
    const existingFighterIndex = monster.additionalFeats.findIndex(x => x.source === 'fighter');
    //replace the entry
    if (monster.additionalFeats && existingFighterIndex !== -1) {
        monster.additionalFeats[existingFighterIndex] = newAdditionalFeats;
        return monster.additionalFeats;
    }
    //add to existing list
    return [...monster.additionalFeats, ...newAdditionalFeats]
}

const PaladinAdvancement = {
    bonusFeat,
    'Bonus Feat': bonusFeat,
}
export default PaladinAdvancement;