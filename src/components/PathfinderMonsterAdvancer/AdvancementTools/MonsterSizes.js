export const MonsterSizes = [
    {abbr: "F", size: "Fine",       acAttack: 8, combatManeuvers: -8, fly: 8, stealth: 16},
    {abbr: "D", size: "Diminutive", acAttack: 4, combatManeuvers: -4, fly: 6, stealth: 12},
    {abbr: "T", size: "Tiny",       acAttack: 2, combatManeuvers: -2, fly: 4, stealth: 8},
    {abbr: "S", size: "Small",      acAttack: 1, combatManeuvers: -1, fly: 2, stealth: 4},
    {abbr: "M", size: "Medium",     acAttack: 0, combatManeuvers:  0, fly: 0, stealth: 0},
    {abbr: "L", size: "Large",      acAttack: -1, combatManeuvers: 1, fly: -2, stealth: -4},
    {abbr: "H", size: "Huge",       acAttack: -2, combatManeuvers: 2, fly: -4, stealth: -8},
    {abbr: "G", size: "Gargantuan", acAttack: -4, combatManeuvers: 4, fly: -6, stealth: -12},
    {abbr: "C", size: "Colossal",   acAttack: -8, combatManeuvers: 8, fly: -8, stealth: -16}
];

export const MonsterSizeChanges = [
    {sizes: ["Fine", "Diminutive"], upChanges: {dex: -2, ac: -4, attack: -4, cmb: 4, cmd: 4, fly: -2, stealth: -4}, downChanges: {dex: 2, ac: 4, attack: 4, cmb: -4, cmd: -4, fly: 2, stealth: 4}},
    {sizes: ["Diminutive", "Tiny"], upChanges: {str: 2, dex: -2, ac: -2, attack: -2, cmb: 2, cmd: 2, fly: -2, stealth: -4}, downChanges: {str: -2, dex: 2, ac: 2, attack: 2, cmb: -2, cmd: -2, fly: 2, stealth: 4}},
    {sizes: ["Tiny", "Small"], upChanges: {str: 4, dex: -2, ac: -1, attack: -1, cmb: 1, cmd: 1, fly: -2, stealth: -4}, downChanges: {str: -4, dex: 2, ac: 1, attack: 1, cmb: -1, cmd: -1, fly: 2, stealth: 4}},
    {sizes: ["Small", "Medium"], upChanges: {str: 4, dex: -2, con: 2, ac: -1, attack: -1, cmb: 1, cmd: 1, fly: -2, stealth: -4}, downChanges: {str: -4, dex: 2, con: -2, ac: 1, attack: 1, cmb: -1, cmd: -1, fly: 2, stealth: 4}},
    {sizes: ["Medium", "Large"], upChanges: {str: 8, dex: -2, con: 4, naturalArmor: 2, ac: -1, attack: -1, cmb: 1, cmd: 1, fly: -2, stealth: -4}, downChanges: {str: -8, dex: 2, con: -4, naturalArmor: -2, ac: 1, attack: 1, cmb: -1, cmd: -1, fly: 2, stealth: 4}},
    {sizes: ["Large", "Huge"], upChanges: {str: 8, dex: -2, con: 4, naturalArmor: 3, ac: -1, attack: -1, cmb: 1, cmd: 1, fly: -2, stealth: -4}, downChanges: {str: -8, dex: 2, con: -4, naturalArmor: -3, ac: 1, attack: 1, cmb: -1, cmd: -1, fly: 2, stealth: 4}},
    {sizes: ["Huge", "Gargantuan"], upChanges: {str: 8, con: 4, naturalArmor: 4, ac: -2, attack: -2, cmb: 2, cmd: 2, fly: -2, stealth: -4}, downChanges: {str: -8, con: -4, naturalArmor: -4, ac: 2, attack: 2, cmb: -2, cmd: -2, fly: 2, stealth: 4}},
    {sizes: ["Gargantuan", "Colossal"], upChanges: {str: 8, con: 4, naturalArmor: 5, ac: -4, attack: -4, cmb: 4, cmd: 4, fly: -2, stealth: -4}, downChanges: {str: -8, con: -4, naturalArmor: -5, ac: 4, attack: 4, cmb: -4, cmd: -4, fly: 2, stealth: 4}}
]