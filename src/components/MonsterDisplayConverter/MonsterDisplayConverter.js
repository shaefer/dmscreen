export const convertToMonsterForDisplay = (monsterStatBlock, version) => {
    if (version === 2) {
        return convertVersion2(monsterStatBlock)
    }
    return monsterStatBlock; //version 1;
}

const convertVersion2 = (m) => {
    return {
        ...m,
        ac: m.armor_class.ac_details,
        strength: m.ability_scores.str,
        dexterity: m.ability_scores.dex,
        constitution: m.ability_scores.con,
        intelligence: m.ability_scores.int,
        wisdom: m.ability_scores.wis,
        charisma: m.ability_scores.cha,
        fortitude: m.saving_throws.fort,
        reflex: m.saving_throws.ref,
        will: m.saving_throws.will,
        skills: m.skill_details
    }
}
