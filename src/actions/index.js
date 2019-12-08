export const SHOW_MONSTER = 'SHOW_MONSTER'
export const MONSTER_NOT_FOUND = 'MONSTER_NOT_FOUND'
export const SELECT_MONSTER = 'SELECT_MONSTER'
export const S3_SELECT_SHOW = 'S3_SELECT_SHOW'

export const showMonster = (monsterJson) => ({
    type: 'SHOW_MONSTER',
    monster: monsterJson
});

export const monsterNotFound = (monsterName) => ({
    type: MONSTER_NOT_FOUND,
    monsterName: monsterName
});

export const showS3SelectResult = (monsterListJson, searchParams) => ({
    type:'S3_SELECT_SHOW',
    monsterList: monsterListJson,
    searchParams: searchParams
});

export const selectMonsterOption = (selectedMonsterName) => ({
    type: 'SELECT_MONSTER',
    name: selectedMonsterName
});

/* Monster Advancer 3.5 v2 Actions */
export const DISPLAY_35_MONSTER = 'LOOKUP_MONSTER'
export const display35Monster = (monster) => ({
    type: DISPLAY_35_MONSTER,
    monster: monster
});

/** Advancement Hit Dice */
export const ADVANCE_HIT_DICE = 'ADVANCE_HIT_DICE'
export const advanceByHitDice = (hitDice) => ({
    type: ADVANCE_HIT_DICE,
    hitDice: hitDice
});

export const RESET_HD_ADVANCEMENT = 'RESET_HD_ADVANCEMENT'
export const resetHitDiceAdvancement = () => ({
    type: RESET_HD_ADVANCEMENT
});

export const ADVANCE_SIZE = 'ADVANCE_SIZE'
export const advanceBySize = (size) => ({
    type: ADVANCE_SIZE,
    size: size
});

export const RESET_SIZE_ADVANCEMENT = 'RESET_SIZE_ADVANCEMENT'
export const resetSizeAdvancement = () => ({
    type: RESET_SIZE_ADVANCEMENT
});

export const ADVANCE_ABILITY_SCORE = 'ADVANCE_ABILITY_SCORE'
export const advanceByAbilityScore = (value, abilityScore) => ({
    type: ADVANCE_ABILITY_SCORE,
    value: value,
    abilityScore: abilityScore
});

export const RESET_ABILITY_SCORE_ADVANCEMENT = 'RESET_ABILITY_SCORE_ADVANCEMENT'
export const resetAbilityScores = () => ({
    type: RESET_ABILITY_SCORE_ADVANCEMENT
});

export const ADVANCE_TEMPLATES = 'ADVANCE_TEMPLATES'
export const advancedByTemplates = (templates) => ({
    type: ADVANCE_TEMPLATES,
    templates
});

export const RESET_TEMPLATE_ADVANCEMENT = 'RESET_TEMPLATE_ADVANCEMENT'
export const resetTemplates = () => ({
    type: RESET_TEMPLATE_ADVANCEMENT
});