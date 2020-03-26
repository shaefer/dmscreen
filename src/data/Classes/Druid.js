import * as StatSections from '../GeneralRules/StatSections';
import druidAdvancement from '../../components/ClassLevels/DruidAdvancement';
import druidSpells from '../Classes/DruidSpells';
const specialAbilities = [
  {
    "name": "Nature Bond",
    "description": "At 1st level, a druid forms a bond with nature. This bond can take one of two forms. The first is a close tie to the natural world, granting the druid one of the following cleric domains: Air, Animal, Earth, Fire, Plant, Water, or Weather. When determining the powers and bonus spells granted by this domain, the druid's effective cleric level is equal to her druid level. A druid that selects this option also receives additional domain spell slots, just like a cleric. She must prepare the spell from her domain in this slot and this spell cannot be used to cast a spell spontaneously. The second option is to form a close bond with an animal companion. A druid may begin play with any of the animals listed in Animal Choices. This animal is a loyal companion that accompanies the druid on her adventures. Unlike normal animals of its kind, an animal companion's Hit Dice, abilities, skills, and feats advance as the druid advances in level. If a character receives an animal companion from more than one source, her effective druid levels stack for the purposes of determining the statistics and abilities of the companion. Most animal companions increase in size when their druid reaches 4th or 7th level, depending on the companion. If a druid releases her companion from service, she may gain a new one by performing a ceremony requiring 24 uninterrupted hours of prayer in the environment where the new companion typically lives. This ceremony can also replace an animal companion that has perished.",
    "specialAbilityType": "ex",
    "source": "Core Rulebook", 
    "type": "ability"
  },
  {
    "name": "Nature Sense",
    "description": "A druid gains a +2 bonus on Knowledge (nature) and Survival checks.",
    "specialAbilityType": "ex",
    "source": "Core Rulebook", 
    "type": "ability",
    statSection: StatSections.SKILLS,
    fieldToUpdate: 'skills'
  },
  {
    "name": "Orisons",
    "description": "Druids can prepare a number of orisons, or 0-level spells, each day, as noted on Table: Druid under “Spells per Day.” These spells are cast like any other spell, but they are not expended when cast and may be used again.",
    "specialAbilityType": "",
    "source": "Core Rulebook", 
    "type": "ability"
  },
  {
    "name": "Wild Empathy",
    "description": "A druid can improve the attitude of an animal. This ability functions just like a Diplomacy check made to improve the attitude of a person (see Using Skills). The druid rolls 1d20 and adds her druid level and her Charisma modifier to determine the wild empathy check result. The typical domestic animal has a starting attitude of indifferent, while wild animals are usually unfriendly. To use wild empathy, the druid and the animal must be within 30 feet of one another under normal conditions. Generally, influencing an animal in this way takes 1 minute but, as with influencing people, it might take more or less time. A druid can also use this ability to influence a magical beast with an Intelligence score of 1 or 2, but she takes a –4 penalty on the check.",
    "specialAbilityType": "ex",
    "source": "Core Rulebook", 
    "type": "ability"
  },
  {
    "name": "Woodland Stride",
    "description": "Starting at 2nd level, a druid may move through any sort of undergrowth (such as natural thorns, briars, overgrown areas, and similar terrain) at her normal speed and without taking damage or suffering any other impairment. Thorns, briars, and overgrown areas that have been magically manipulated to impede motion, however, still affect her.",
    "specialAbilityType": "ex",
    "source": "Core Rulebook", 
    "type": "ability"
  },
  {
    "name": "Trackless Step",
    "description": "Starting at 3rd level, a druid leaves no trail in natural surroundings and cannot be tracked. She may choose to leave a trail if so desired.",
    "specialAbilityType": "ex",
    "source": "Core Rulebook", 
    "type": "ability"
  },
  {
    "name": "Resist Nature's Lure",
    "description": "Starting at 4th level, a druid gains a +4 bonus on saving throws against the spell-like and supernatural abilities of fey. This bonus also applies to spells and effects that utilize or target plants, such as blight, entangle, spike growth, and warp wood.",
    "specialAbilityType": "ex",
    "source": "Core Rulebook", 
    "type": "ability"
  },
  {
    "name": "Wild Shape",
    "description": "At 4th level, a druid gains the ability to turn herself into any Small or Medium animal and back again once per day. Her options for new forms include all creatures with the animal type. This ability functions like the beast shape I spell, except as noted here. The effect lasts for 1 hour per druid level, or until she changes back. Changing form (to animal or back) is a standard action and doesn't provoke an attack of opportunity. The form chosen must be that of an animal with which the druid is familiar. A druid loses her ability to speak while in animal form because she is limited to the sounds that a normal, untrained animal can make, but she can communicate normally with other animals of the same general grouping as her new form. (The normal sound a wild parrot makes is a squawk, so changing to this form does not permit speech.) A druid can use this ability an additional time per day at 6th level and every two levels thereafter, for a total of eight times at 18th level. At 20th level, a druid can use wild shape at will. As a druid gains levels, this ability allows the druid to take on the form of larger and smaller animals, elementals, and plants. Each form expends one daily use of this ability, regardless of the form taken. At 6th level, a druid can also use wild shape to change into a Large or Tiny animal or a Small elemental. When taking the form of an animal, a druid's wild shape now functions as beast shape II. When taking the form of an elemental, the druid's wild shape functions as elemental body I. At 8th level, a druid can also use wild shape to change into a Huge or Diminutive animal, a Medium elemental, or a Small or Medium plant creature. When taking the form of animals, a druid's wild shape now functions as beast shape III. When taking the form of an elemental, the druid's wild shape now functions as elemental body II. When taking the form of a plant creature, the druid's wild shape functions as plant shape I. At 10th level, a druid can also use wild shape to change into a Large elemental or a Large plant creature. When taking the form of an elemental, the druid's wild shape now functions as elemental body III. When taking the form of a plant, the druid's wild shape now functions as plant shape II. At 12th level, a druid can also use wild shape to change into a Huge elemental or a Huge plant creature. When taking the form of an elemental, the druid's wild shape now functions as elemental body IV. When taking the form of a plant, the druid's wild shape now functions as plant shape III.",
    "specialAbilityType": "su",
    "source": "Core Rulebook", 
    "type": "ability"
  },
  {
    "name": "Venom Immunity",
    "description": "At 9th level, a druid gains immunity to all poisons.",
    "specialAbilityType": "ex",
    "source": "Core Rulebook", 
    "type": "ability"
  },
  {
    "name": "A Thousand Faces",
    "description": "At 13th level, a druid gains the ability to change her appearance at will, as if using the alter self spell, but only while in her normal form.",
    "specialAbilityType": "su",
    "source": "Core Rulebook", 
    "type": "ability"
  },
  {
    "name": "Timeless Body",
    "description": "After attaining 15th level, a druid no longer takes ability score penalties for aging and cannot be magically aged. Any penalties she may have already incurred, however, remain in place. Bonuses still accrue, and the druid still dies of old age when her time is up.",
    "specialAbilityType": "ex",
    "source": "Core Rulebook", 
    "type": "ability"
  },
];
const druid = {
    name: 'druid',
    abbreviation: 'drd',
    alignment: 'any',
    hitDieType: 8,
    classSkills: [
        {name:"Climb"},
        {name: "Craft"},
        {name: "Fly"},
        {name: "Handle Animal"},
        {name: "Heal"},
        {name: "Knowledge", subName: 'geography'},
        {name: "Knowledge", subName: 'nature'},
        {name: "Perception"},
        {name: "Profession"},
        {name: "Ride"},
        {name: "Spellcraft"},
        {name: "Survival"},
        {name: "Swim"},
    ],
    specialAbilities: specialAbilities,
    skillRanksPerLevel: 4,
    "base_attack_bonus": "medium",  //might like a different format  for the key but this matches creatureStatsByType
    "good_saving_throws": ["Fort", "Will"], //might like a different format  for the key but this matches creatureStatsByType
    advancement: druidAdvancement,
    isCaster: true,
    prepareSpells: true,
    primaryAbilityScore: 'wis',
    spellsByLevel: [druidSpells.filter(x => x.druid === 0), 
      druidSpells.filter(x => x.druid === 1), druidSpells.filter(x => x.druid === 2), druidSpells.filter(x => x.druid === 3), 
      druidSpells.filter(x => x.druid === 4), druidSpells.filter(x => x.druid === 5), druidSpells.filter(x => x.druid === 6),
      druidSpells.filter(x => x.druid === 7), druidSpells.filter(x => x.druid === 8), druidSpells.filter(x => x.druid === 9),
    ],
    levels: [
        {
          level: 1, 
          classAbilities: ['Nature Bond', 'Nature Sense', 'Orisons', 'Wild Empathy'],
          spellsPerDay: [3, 1, 0, 0, 0, 0, 0, 0, 0, 0], //0-9
        },
        {
          level: 2,
          classAbilities: ["Woodland Stride"],
          spellsPerDay: [4, 2, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
          level: 3,
          classAbilities: ["Trackless Step"],
          spellsPerDay: [4, 2, 1, 0, 0, 0, 0, 0, 0, 0],
        },
        {
          level: 4,
          classAbilities: ["Resist Nature's Lure", "Wild Shape"],
          spellsPerDay: [4, 3, 2, 0, 0, 0, 0, 0, 0, 0],
        },
        {
          level: 5,
          classAbilities: [], 
          spellsPerDay: [4, 3, 2, 1, 0, 0, 0, 0, 0, 0],
        },
        {
          level: 6,
          classAbilities: [],
          spellsPerDay: [4, 3, 3, 2, 0, 0, 0, 0, 0, 0],
        },
        {
          level: 7,
          classAbilities: [], 
          spellsPerDay: [4, 4, 3, 2, 1, 0, 0, 0, 0, 0],
        },
        {
          level: 8,
          classAbilities: [],
          spellsPerDay: [4, 4, 3, 3, 2, 0, 0, 0, 0, 0],
        },
        {
          level: 9,
          classAbilities: ["Venom Immunity"],
          spellsPerDay: [4, 4, 4, 3, 2, 1, 0, 0, 0, 0],
        },
        {
          level: 10,
          classAbilities: [],
          spellsPerDay: [4, 4, 4, 3, 3, 2, 0, 0, 0, 0],
        },
        {
          level: 11,
          classAbilities: [],
          spellsPerDay: [4, 4, 4, 4, 3, 2, 1, 0, 0, 0],
        },
        {
          level: 12,
          classAbilities: [],
          spellsPerDay: [4, 4, 4, 4, 3, 3, 2, 0, 0, 0],
        },
        {
          level: 13,
          classAbilities: ["A Thousand Faces"],
          spellsPerDay: [4, 4, 4, 4, 4, 3, 2, 1, 0, 0],
        },
        {
          level: 14,
          classAbilities: [],
          spellsPerDay: [4, 4, 4, 4, 4, 3, 3, 2, 0, 0],
        },
        {
          level: 15,
          classAbilities: ["Timeless Body"],
          spellsPerDay: [4, 4, 4, 4, 4, 4, 3, 2, 1, 0],
        },
        {
          level: 16,
          classAbilities: [],
          spellsPerDay: [4, 4, 4, 4, 4, 4, 3, 3, 2, 0],
        },
        {
          level: 17,
          classAbilities: [],
          spellsPerDay: [4, 4, 4, 4, 4, 4, 4, 3, 2, 1],
        },
        {
          level: 18,
          classAbilities: [],
          spellsPerDay: [4, 4, 4, 4, 4, 4, 4, 3, 3, 2],
        },
        {
          level: 19,
          classAbilities: [],
          spellsPerDay: [4, 4, 4, 4, 4, 4, 4, 4, 3, 3],
        },
        {
          level: 20,
          classAbilities: [],
          spellsPerDay: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        }
    ]
};

export default druid;