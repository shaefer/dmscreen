const aberrantFeats = [
    "Combat Casting", "Improved Disarm", "Improved Grapple", "Improved Initiative", "Improved Unarmed Strike", "Iron Will", "Silent Spell", "Skill Focus (Knowledge dungeoneering)"
].map(x => {
    return {name: x, minLevel: 1}
});

const aberrantSpells = [
    {name: "Enlarge Person", minLevel: 3}, {name: "See Invisibility", minLevel: 5}, {name: "Tongues", minLevel: 7}, {name: "Black Tentacles", minLevel: 9},
    {name: "Feeblemind", minLevel: 11}, {name: "Veil", minLevel: 13}, {name: "Plane Shift", minLevel: 15}, {name: "Mind Blank", minLevel: 17}, {name: "Shapechange", minLevel: 19}
]
const aberrantPowers = [
    {
      "description":"Starting at 1st level, you can fire an acidic ray as a standard action, targeting any foe within 30 feet as a ranged touch attack. The acidic ray deals 1d6 points of acid damage + 1 for every two sorcerer levels you possess. You can use this ability a number of times per day equal to 3 + your Charisma modifier.",
      "name":"Acidic Ray",
      "specialAbilityType":"sp",
      "source":"Core Rulebook",
      minLevel: 1
    },
    {
      "description":"At 3rd level, your reach increases by 5 feet whenever you are making a melee touch attack. This ability does not otherwise increase your threatened area. At 11th level, this bonus to your reach increases to 10 feet. At 17th level, this bonus to your reach increases to 15 feet.",
      "name":"Long Limbs",
      "specialAbilityType":"ex",
      "source":"Core Rulebook",
      minLevel: 3,
    },
    {
      "description":"At 9th level, your anatomy changes, giving you a 25% chance to ignore any critical hit or sneak attack scored against you. This chance increases to 50% at 13th level.",
      "name":"Unusual Anatomy",
      "specialAbilityType":"ex",
      "source":"Core Rulebook",
      minLevel: 9
    },
    {
      "description":"At 15th level, you gain spell resistance equal to your sorcerer level + 10.",
      "name":"Alien Resistance",
      "specialAbilityType":"su",
      "source":"Core Rulebook",
      minLevel: 15
    },
    {
      "description":"At 20th level, your body becomes truly unnatural. You are immune to critical hits and sneak attacks. In addition, you gain blindsight with a range of 60 feet and damage reduction 5/&mdash;.",
      "name":"Aberrant Form",
      "specialAbilityType":"ex",
      "source":"Core Rulebook",
      minLevel: 20
    }
  ];

export const aberrant = {feats: aberrantFeats, spells: aberrantSpells, powers: aberrantPowers};

const abyssalFeats = [
    "Augment Summoning", "Cleave", "Empower Spell", "Great Fortitude", "Improved Bull Rush", "Improved Sunder", "Power Attack", "Skill Focus (Knowledge planes)"
].map(x => {
    return {name: x, minLevel: 1}
});
const abyssalSpells = [{name:"cause fear", minLevel: 3}, {name:"bull's strength", minLevel: 5}, {name:"rage", minLevel: 7}, {name:"stoneskin", minLevel: 9}, {name:"dismissal", minLevel: 11}, {name:"transformation", minLevel: 13}, {name:"greater teleport", minLevel: 15}, {name:"unholy aura", minLevel: 17}, {name:"summon monster IX", minLevel: 19}];
const abyssalPowers = [
{
    "description":"At 1st level, you can grow claws as a free action. These claws are treated as natural weapons, allowing you to make two claw attacks as a full attack action using your full base attack bonus. These attacks deal 1d4 points of damage each (1d3 if you are Small) plus your Strength modifier. At 5th level, these claws are considered magic weapons for the purpose of overcoming DR. At 7th level, the damage increases by one step to 1d6 points of damage (1d4 if you are Small). At 11th level, these claws become <i>flaming</i> <i>weapons</i>, each dealing an additional 1d6 points of fire damage on a successful hit. You can use your claws for a number of rounds per day equal to 3 + your Charisma modifier. These rounds do not need to be consecutive.",
    "name":"Claws",
    "specialAbilityType":"su",
    "source":"Core Rulebook",
    "type":"ability"
},
{
    "description":"At 3rd level, you gain resist electricity 5 and a +2 bonus on saving throws made against poison. At 9th level, your resistance to electricity increases to 10 and your bonus on poison saving throws increases to +4.",
    "name":"Demon Resistances",
    "specialAbilityType":"ex",
    "source":"Core Rulebook",
    "type":"ability"
},
{
    "description":"At 9th level, you gain a +2 inherent bonus to your Strength. This bonus increases to +4 at 13th level, and to +6 at 17th level.",
    "name":"Strength of the Abyss",
    "specialAbilityType":"ex",
    "source":"Core Rulebook",
    "type":"ability"
},
{
    "description":"At 15th level, whenever you summon a creature with the demon subtype or the fiendish template using a <i>summon monster</i> spell, you summon one additional creature of the same kind.",
    "name":"Added Summonings",
    "specialAbilityType":"su",
    "source":"Core Rulebook",
    "type":"ability"
},
{
    "description":" <i></i>At 20th level, the power of the Abyss flows through you. You gain immunity to electricity and poison. You also gain resistance to acid 10, cold 10, and fire 10, and gain telepathy with a range of 60 feet (allowing you to communicate with any creature that can speak a language).",
    "name":"Demonic Might",
    "specialAbilityType":"su",
    "source":"Core Rulebook",
    "type":"ability"
}
];
export const abyssal = {feats: abyssalFeats, spells: abyssalSpells, powers: abyssalPowers};

const arcaneFeats = [
    "Combat Casting", "Improved Counterspell", "Improved Initiative", "Iron Will", "Scribe Scroll", "Skill Focus (Knowledge [arcana])", "Spell Focus", "Still Spell"
].map(x => {return {name: x, minLevel: 1}});
const arcaneSpells = [{name:"identify", minLevel: 3}, {name:"invisibility", minLevel: 5}, {name:"dispel magic", minLevel: 7}, {name:"dimension door", minLevel: 9}, {name:"overland flight", minLevel: 11}, {name:"true seeing", minLevel: 13}, {name:"greater teleport", minLevel: 15}, {name:"power word stun", minLevel: 17}, {name:"wish", minLevel: 19}];
const arcanePowers = [
    {
      "description":" <i></i>At 1st level, you gain an arcane bond, as a wizard equal to your sorcerer level. Your sorcerer levels stack with any wizard levels you possess when determining the powers of your familiar or bonded object. This ability does not allow you to have both a familiar and a bonded item. Once per day, your bond item allows you to cast any one of your spells known (unlike a wizard's bonded item, which allows him to cast any one spell in his spellbook).",
      "name":"Arcane Bond",
      "specialAbilityType":"su",
      "source":"Core Rulebook",
      "type":"ability"
    },
    {
      "description":"At 3rd level, you can apply any one metamagic feat you know to a spell you are about to cast without increasing the casting time. You must still expend a higher-level spell slot to cast this spell. You can use this ability once per day at 3rd level and one additional time per day for every four sorcerer levels you possess beyond 3rd, up to five times per day at 19th level. At 20th level, this ability is replaced by arcane apotheosis.",
      "name":"Metamagic Adept",
      "specialAbilityType":"ex",
      "source":"Core Rulebook",
      "type":"ability"
    },
    {
      "description":"At 9th level, you can add any one spell from the sorcerer/wizard spell list to your list of spells known. This spell must be of a level that you are capable of casting. You can also add one additional spell at 13th level and 17th level.",
      "name":"New Arcana",
      "specialAbilityType":"ex",
      "source":"Core Rulebook",
      "type":"ability"
    },
    {
      "description":"At 15th level, pick one school of magic. The DC for any spells you cast from that school increases by +2. This bonus stacks with the bonus granted by Spell Focus.",
      "name":"School Power",
      "specialAbilityType":"e",
      "source":"Core Rulebook",
      "type":"ability"
    },
    {
      "description":"At 20th level, your body surges with arcane power. You can add any metamagic feats that you know to your spells without increasing their casting time, although you must still expend higher-level spell slots. Whenever you use magic items that require charges, you can instead expend spell slots to power the item. For every three levels of spell slots that you expend, you consume one less charge when using a magic item that expends charges.",
      "name":"Arcane Apotheosis",
      "specialAbilityType":"ex",
      "source":"Core Rulebook",
      "type":"ability"
    }
  ];
  export const arcane = {feats: arcaneFeats, spells: arcaneSpells, powers: arcanePowers};

  const celestialFeats = [];
  const celestialSpells = ["<i>bless</i> (3rd), <i>resist energy</i> (5th), <i>magic circle against evil</i> (7th), <i>remove curse</i> (9th),<i> flame strike</i> (11th), <i>greater dispel magic</i> (13th), <i>banishment</i> (15th), <i>sunburst</i> (17th),<i> gate</i> (19th)."];
  const celestialPowers = [];
  export const celestial = {feats: celestialFeats, spells: celestialSpells, powers: celestialPowers};

  const destinedFeats = [];
  const destinedSpells = [];
  const destinedPowers = [];
  export const destined = {feats: destinedFeats, spells: destinedSpells, powers: destinedPowers};

  const draconicFeats = [];
  const draconicSpells = [];
  const draconicPowers = [];
  export const draconic = {feats: draconicFeats, spells: draconicSpells, powers: draconicPowers};

  const elementalFeats = [];
  const elementalSpells = [];
  const elementalPowers = [];
  export const elemental = {feats: elementalFeats, spells: elementalSpells, powers: elementalPowers};

  const feyFeats = [];
  const feySpells = [];
  const feyPowers = [];
  export const fey = {feats: feyFeats, spells: feySpells, powers: feyPowers};

  const infernalFeats = [];
  const infernalSpells = [];
  const infernalPowers  = [];
  export const infernal = {feats: infernalFeats, spells: infernalSpells, powers: infernalPowers};

  const undeadFeats = [];
  const undeadSpells = [];
  const undeadPowers = [];
  export const undead = {feats: undeadFeats, spells: undeadSpells, powers: undeadPowers};