export const convertToMonsterForDisplay = (monsterStatBlock, version) => {
    if (version === 2) {
        return convertVersion2(monsterStatBlock)
    }
    return monsterStatBlock; //version 1;
}

const withPlus = (stat) => {
    return (stat >= 0) ? `+${stat}` : stat;
}

const convertVersion2 = (m) => {

    return {
        ...m,
        name: m.advancedName ? m.advancedName : m.name,
        init: withPlus(m.init),
        ac: m.armor_class.ac_details,
        strength: m.ability_scores.str,
        dexterity: m.ability_scores.dex,
        constitution: m.ability_scores.con,
        intelligence: m.ability_scores.int,
        wisdom: m.ability_scores.wis,
        charisma: m.ability_scores.cha,
        fortitude: withPlus(m.saving_throws.fort),
        reflex: withPlus(m.saving_throws.ref),
        will: withPlus(m.saving_throws.will),
        skills: m.skill_details,
        base_attack: withPlus(m.base_attack),
        cmb: (m.cmb_details) ? m.cmb_details : withPlus(m.cmb),
        cmd: (m.cmd_details) ? m.cmd_details : m.cmd,
        featCount: m.featCount,
    }
}
