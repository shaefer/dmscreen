import advancement from '../../components/ClassLevels/SorcererAdvancement';
import {spells} from './SorcererSpells';

const specialAbilities = [];
const sorcerer = {
    name: 'sorcerer',
    abbreviation: 'sor',
    alignment: 'any',
    hitDieType: 6,
    classSkills: [
        {name: "Appraise"},
        {name: "Bluff"},
        {name: "Craft"},
        {name: "Fly"},
        {name: "Intimidate"},
        {name: "Knowledge", subName: "arcana"},
        {name: "Profession"},
        {name: "Spellcraft"},
        {name: "Use Magic Device"}
    ],
    skillRanksPerLevel: 2,
    "base_attack_bonus": "slow",  //might like a different format  for the key but this matches creatureStatsByType
    "good_saving_throws": ["Will"], //might like a different format  for the key but this matches creatureStatsByType
    specialAbilities: specialAbilities,
    advancement,
    isCaster: true,
    prepareSpells: false,
    primaryAbilityScore: 'cha',
    spellsByLevel: [spells.filter(x => x.sorcerer === 0), spells.filter(x => x.sorcerer === 1), spells.filter(x => x.sorcerer === 2), spells.filter(x => x.sorcerer === 3), spells.filter(x => x.sorcerer === 4), spells.filter(x => x.sorcerer === 5), 
                    spells.filter(x => x.sorcerer === 6), spells.filter(x => x.sorcerer === 7), spells.filter(x => x.sorcerer === 8), spells.filter(x => x.sorcerer === 9)],
    levels: [
        {
          level: 1, 
          classAbilities: ['Bloodline Power', 'Cantrips', 'Eschew Materials'],
          spellsPerDay: [0, 3, 0, 0, 0, 0, 0, 0, 0, 0], //0-9
          spellsKnown:  [4, 2, 0, 0, 0, 0, 0, 0, 0, 0], //0-9
        },
        {
          level: 2,
          classAbilities: [],
          spellsPerDay: [0, 4, 0, 0, 0, 0, 0, 0, 0, 0],
          spellsKnown:  [5, 2, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
          level: 3,
          classAbilities: ['Inspire Competence'],
          spellsPerDay: [0, 5, 0, 0, 0, 0, 0, 0, 0, 0],
          spellsKnown:  [5, 3, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
          level: 4,
          classAbilities: [],
          spellsPerDay: [0, 6, 3, 0, 0, 0, 0, 0, 0, 0],
          spellsKnown:  [6, 3, 1, 0, 0, 0, 0, 0, 0, 0],
        },
        {
          level: 5,
          classAbilities: ['Lore Master'], 
          spellsPerDay: [0, 6, 4, 0, 0, 0, 0, 0, 0, 0],
          spellsKnown:  [6, 4, 2, 0, 0, 0, 0, 0, 0, 0],
        },
        {
          level: 6,
          classAbilities: ['Suggestion', 'Versatile Performance'],
          spellsPerDay: [0, 6, 5, 3, 0, 0, 0, 0, 0, 0],
          spellsKnown:  [7, 4, 2, 1, 0, 0, 0, 0, 0, 0],
        },
        {
          level: 7,
          classAbilities: [], 
          spellsPerDay: [0, 6, 6, 4, 0, 0, 0, 0, 0, 0],
          spellsKnown:  [7, 5, 3, 2, 0, 0, 0, 0, 0, 0],
        },
        {
          level: 8,
          classAbilities: ["Dirge of Doom"],
          spellsPerDay: [0, 6, 6, 5, 3, 0, 0, 0, 0, 0],
          spellsKnown:  [8, 5, 3, 2, 1, 0, 0, 0, 0, 0],
        },
        {
          level: 9,
          classAbilities: ['Inspire Greatness'],
          spellsPerDay: [0, 6, 6, 6, 4, 0, 0, 0, 0, 0],
          spellsKnown:  [8, 5, 4, 3, 2, 0, 0, 0, 0, 0],
        },
        {
          level: 10,
          classAbilities: ['Jack-of-All-Trades', 'Versatile Performance'],
          spellsPerDay: [0, 6, 6, 6, 5, 3, 0, 0, 0, 0],
          spellsKnown:  [9, 5, 4, 3, 2, 1, 0, 0, 0, 0],
        },
        {
          level: 11,
          classAbilities: [],
          spellsPerDay: [0, 6, 6, 6, 6, 4, 0, 0, 0, 0],
          spellsKnown:  [9, 5, 5, 4, 3, 2, 0, 0, 0, 0],
        },
        {
          level: 12,
          classAbilities: ['Soothing Performance'],
          spellsPerDay: [0, 6, 6, 6, 6, 5, 3, 0, 0, 0],
          spellsKnown:  [9, 5, 5, 4, 3, 2, 1, 0, 0, 0],
        },
        {
          level: 13,
          classAbilities: [],
          spellsPerDay: [0, 6, 6, 6, 6, 6, 4, 0, 0, 0],
          spellsKnown:  [9, 5, 5, 4, 4, 3, 2, 0, 0, 0],
        },
        {
          level: 14,
          classAbilities: ['Frightening Tune', 'Versatile Performance'],
          spellsPerDay: [0, 6, 6, 6, 6, 6, 5, 3, 0, 0],
          spellsKnown:  [9, 5, 5, 4, 4, 3, 2, 1, 0, 0],
        },
        {
          level: 15,
          classAbilities: ['Inspire Heroics'], 
          spellsPerDay: [0, 6, 6, 6, 6, 6, 6, 4, 0, 0],
          spellsKnown:  [9, 5, 5, 4, 4, 4, 3, 2, 0, 0],
        },
        {
          level: 16,
          classAbilities: [],
          spellsPerDay: [0, 6, 6, 6, 6, 6, 6, 5, 3, 0],
          spellsKnown:  [9, 5, 5, 4, 4, 4, 3, 2, 1, 0],
        },
        {
          level: 17,
          classAbilities: [],
          spellsPerDay: [0, 6, 6, 6, 6, 6, 6, 6, 4, 0],
          spellsKnown:  [9, 5, 5, 4, 4, 4, 3, 3, 2, 0],
        },
        {
          level: 18,
          classAbilities: ['Mass Suggestion', 'Versatile Performance'],
          spellsPerDay: [0, 6, 6, 6, 6, 6, 6, 6, 5, 3],
          spellsKnown:  [9, 5, 5, 4, 4, 4, 3, 3, 2, 1],
        },
        {
          level: 19,
          classAbilities: [],
          spellsPerDay: [0, 6, 6, 6, 6, 6, 6, 6, 6, 4],
          spellsKnown:  [9, 5, 5, 4, 4, 4, 3, 3, 3, 2],
        },
        {
          level: 20,
          classAbilities: ['Deadly Performance'],
          spellsPerDay: [0, 6, 6, 6, 6, 6, 6, 6, 6, 6],
          spellsKnown:  [9, 5, 5, 4, 4, 4, 3, 3, 3, 3],
        }
    ]
};

export default sorcerer;