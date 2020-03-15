import * as StatSections from '../GeneralRules/StatSections';
import clericAdvancement from '../../components/ClassLevels/ClericAdvancement';
import clericSpells from '../Classes/ClericSpells';
const specialAbilities = [
  {
    "name": "Aura",
    "description": "A cleric of a chaotic, evil, good, or lawful deity has a particularly powerful aura corresponding to the deity's alignment (see the detect evil spell for details).",
    "specialAbilityType": "ex",
    "source": "Core Rulebook", 
    "type": "ability"
  },
  {
    "name": "Channel Energy",
    "description": "Regardless of alignment, any cleric can release a wave of energy by channeling the power of her faith through her holy (or unholy) symbol. This energy can be used to cause or heal damage, depending on the type of energy channeled and the creatures targeted. A good cleric (or one who worships a good deity) channels positive energy and can choose to deal damage to undead creatures or to heal living creatures. An evil cleric (or one who worships an evil deity) channels negative energy and can choose to deal damage to living creatures or to heal undead creatures. A neutral cleric who worships a neutral deity (or one who is not devoted to a particular deity) must choose whether she channels positive or negative energy. Once this choice is made, it cannot be reversed. This decision also determines whether the cleric casts spontaneous cure or inflict spells (see spontaneous casting). Channeling energy causes a burst that affects all creatures of one type (either undead or living) in a 30-foot radius centered on the cleric. The amount of damage dealt or healed is equal to 1d6 points of damage plus 1d6 points of damage for every two cleric levels beyond 1st (2d6 at 3rd, 3d6 at 5th, and so on). Creatures that take damage from channeled energy receive a Will save to halve the damage. The DC of this save is equal to 10 + 1/2 the cleric's level + the cleric's Charisma modifier. Creatures healed by channeled energy cannot exceed their maximum hit point total—all excess healing is lost. A cleric may channel energy a number of times per day equal to 3 + her Charisma modifier. This is a standard action that does not provoke an attack of opportunity. A cleric can choose whether or not to include herself in this effect. A cleric must be able to present her holy symbol to use this ability.",
    "specialAbilityType": "su",
    "source": "Core Rulebook", 
    "type": "ability",
    statSection: StatSections.SPECIAL_ATTACKS,
    fieldToUpdate: 'acquiredSpecialAttacks'
  },
  {
    "name": "Domains",
    "description": "A cleric's deity influences her alignment, what magic she can perform, her values, and how others see her. A cleric chooses two domains from among those belonging to her deity. A cleric can select an alignment domain (Chaos, Evil, Good, or Law) only if her alignment matches that domain. If a cleric is not devoted to a particular deity, she still selects two domains to represent her spiritual inclinations and abilities (subject to GM approval). The restriction on alignment domains still applies. Each domain grants a number of domain powers, dependent upon the level of the cleric, as well as a number of bonus spells. A cleric gains one domain spell slot for each level of cleric spell she can cast, from 1st on up. Each day, a cleric can prepare one of the spells from her two domains in that slot. If a domain spell is not on the cleric spell list, a cleric can prepare it only in her domain spell slot. Domain spells cannot be used to cast spells spontaneously. In addition, a cleric gains the listed powers from both of her domains, if she is of a high enough level. Unless otherwise noted, using a domain power is a standard action.",
    "specialAbilityType": "",
    "source": "Core Rulebook", 
    "type": "ability"
  },
  {
    "name": "Orisons",
    "description": "Clerics can prepare a number of orisons, or 0-level spells, each day, as noted on Table: Cleric under “Spells per Day.” These spells are cast like any other spell, but they are not expended when cast and may be used again.",
    "specialAbilityType": "",
    "source": "Core Rulebook", 
    "type": "ability"
  },
  {
    "name": "Spontaneous Casting",
    "description": "A good cleric (or a neutral cleric of a good deity) can channel stored spell energy into healing spells that she did not prepare ahead of time. The cleric can “lose” any prepared spell that is not an orison or domain spell in order to cast any cure spell of the same spell level or lower (a cure spell is any spell with “cure” in its name). An evil cleric (or a neutral cleric who worships an evil deity) can't convert prepared spells to cure spells but can convert them to inflict spells (an inflict spell is one with “inflict” in its name). A cleric who is neither good nor evil and whose deity is neither good nor evil can convert spells to either cure spells or inflict spells (player's choice). Once the player makes this choice, it cannot be reversed. This choice also determines whether the cleric channels positive or negative energy (see Channel Energy).",
    "specialAbilityType": "",
    "source": "Core Rulebook", 
    "type": "ability"
  },
];
const cleric = {
    name: 'cleric',
    abbreviation: 'clr',
    alignment: 'any',
    hitDieType: 8,
    classSkills: [
        {name:"Appraise"},
        {name: "Craft"},
        {name: "Diplomacy"},
        {name: "Heal"},
        {name: "Knowledge", subName: 'arcana'},
        {name: "Knowledge", subName: 'history'},
        {name: "Knowledge", subName: 'nobility'},
        {name: "Knowledge", subName: 'planes'},
        {name: "Knowledge", subName: 'religion'},
        {name: "Linguistics"},
        {name: "Profession"},
        {name: "Sense Motive"},
        {name: "Spellcraft"},
    ],
    specialAbilities: specialAbilities,
    skillRanksPerLevel: 2,
    "base_attack_bonus": "medium",  //might like a different format  for the key but this matches creatureStatsByType
    "good_saving_throws": ["Fort", "Will"], //might like a different format  for the key but this matches creatureStatsByType
    advancement: clericAdvancement,
    isCaster: true,
    prepareSpells: true,
    primaryAbilityScore: 'wis',
    spellsByLevel: [clericSpells.filter(x => x.cleric === 0), 
      clericSpells.filter(x => x.cleric === 1), clericSpells.filter(x => x.cleric === 2), clericSpells.filter(x => x.cleric === 3), 
      clericSpells.filter(x => x.cleric === 4), clericSpells.filter(x => x.cleric === 5), clericSpells.filter(x => x.cleric === 6),
      clericSpells.filter(x => x.cleric === 7), clericSpells.filter(x => x.cleric === 8), clericSpells.filter(x => x.cleric === 9),
    ],
    levels: [
        {
          level: 1, 
          classAbilities: ['Aura', 'Channel Energy', 'Domains', 'Orisons', 'Spontaneous Casting'],
          spellsPerDay: [3, 1, 0, 0, 0, 0, 0, 0, 0, 0], //0-9
        },
        {
          level: 2,
          classAbilities: [],
          spellsPerDay: [4, 2, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
          level: 3,
          classAbilities: [],
          spellsPerDay: [4, 2, 1, 0, 0, 0, 0, 0, 0, 0],
        },
        {
          level: 4,
          classAbilities: [],
          spellsPerDay: [4, 3, 2, 0, 0, 0, 0, 0, 0, 0],
        },
        {
          level: 5,
          classAbilities: [], //channel energy 3d6
          spellsPerDay: [4, 3, 2, 1, 0, 0, 0, 0, 0, 0],
        },
        {
          level: 6,
          classAbilities: [],
          spellsPerDay: [4, 3, 3, 2, 0, 0, 0, 0, 0, 0],
        },
        {
          level: 7,
          classAbilities: [], //channel energy 4d6
          spellsPerDay: [4, 4, 3, 2, 1, 0, 0, 0, 0, 0],
        },
        {
          level: 8,
          classAbilities: [],
          spellsPerDay: [4, 4, 3, 3, 2, 0, 0, 0, 0, 0],
        },
        {
          level: 9,
          classAbilities: [],
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
          classAbilities: [],
          spellsPerDay: [4, 4, 4, 4, 4, 3, 2, 1, 0, 0],
        },
        {
          level: 14,
          classAbilities: [],
          spellsPerDay: [4, 4, 4, 4, 4, 3, 3, 2, 0, 0],
        },
        {
          level: 15,
          classAbilities: [],
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

export default cleric;