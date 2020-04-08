import * as StatSections from '../GeneralRules/StatSections';
import paladinAdvancement from '../../components/ClassLevels/PaladinAdvancement';
import paladinSpells from './PaladinSpells';

const mercy = [
  {
    "description":"The target is no longer fatigued.",
    "url":"pfsrd://Core Rulebook/Classes/Paladin/Class Features/Mercy/Fatigued",
    "type":"section",
    "name":"Fatigued",
    "source":"Core Rulebook",
    "minLevel":3,
  },
  {
    "description":"The target is no longer shaken.",
    "url":"pfsrd://Core Rulebook/Classes/Paladin/Class Features/Mercy/Shaken",
    "type":"section",
    "name":"Shaken",
    "source":"Core Rulebook",
    "minLevel":3,
  },
  {
    "description":"The target is no longer sickened. ",
    "url":"pfsrd://Core Rulebook/Classes/Paladin/Class Features/Mercy/Sickened",
    "type":"section",
    "name":"Sickened",
    "source":"Core Rulebook",
    "minLevel":3,
  },
  {
    "description":"The target is no longer dazed.",
    "url":"pfsrd://Core Rulebook/Classes/Paladin/Class Features/Mercy/Dazed",
    "type":"section",
    "name":"Dazed",
    "source":"Core Rulebook",
    "minLevel":6,
  },
  {
    "description":"The paladin's lay on hands ability also acts as <i>remove disease</i>, using the paladin's level as the caster level.",
    "url":"pfsrd://Core Rulebook/Classes/Paladin/Class Features/Mercy/Diseased",
    "type":"section",
    "name":"Diseased",
    "source":"Core Rulebook",
    "minLevel":6,
  },
  {
    "description":"The target is no longer staggered, unless the target is at exactly 0 hit points.",
    "url":"pfsrd://Core Rulebook/Classes/Paladin/Class Features/Mercy/Staggered",
    "type":"section",
    "name":"Staggered",
    "source":"Core Rulebook",
    "minLevel":6,
  },
  {
    "description":"The paladin's lay on hands ability also acts as <i>remove curse</i>, using the paladin's level as the caster level.",
    "url":"pfsrd://Core Rulebook/Classes/Paladin/Class Features/Mercy/Cursed",
    "type":"section",
    "name":"Cursed",
    "source":"Core Rulebook",
    "minLevel":9,
  },
  {
    "description":"The target is no longer exhausted. The paladin must have the fatigue mercy before selecting this mercy.",
    "url":"pfsrd://Core Rulebook/Classes/Paladin/Class Features/Mercy/Exhausted",
    "type":"section",
    "name":"Exhausted",
    "source":"Core Rulebook",
    "minLevel":9,
  },
  {
    "description":"The target is no longer frightened. The paladin must have the shaken mercy before selecting this mercy.",
    "url":"pfsrd://Core Rulebook/Classes/Paladin/Class Features/Mercy/Frightened",
    "type":"section",
    "name":"Frightened",
    "source":"Core Rulebook",
    "minLevel":9,
  },
  {
    "description":"The target is no longer nauseated. The paladin must have the sickened mercy before selecting this mercy.",
    "url":"pfsrd://Core Rulebook/Classes/Paladin/Class Features/Mercy/Nauseated",
    "type":"section",
    "name":"Nauseated",
    "source":"Core Rulebook",
    "minLevel":9,
  },
  {
    "description":"The paladin's lay on hands ability also acts as <i>neutralize poison</i>, using the paladin's level as the caster level.",
    "url":"pfsrd://Core Rulebook/Classes/Paladin/Class Features/Mercy/Poisoned",
    "type":"section",
    "name":"Poisoned",
    "source":"Core Rulebook",
    "minLevel":9,
  },
  {
    "description":"The target is no longer blinded.",
    "url":"pfsrd://Core Rulebook/Classes/Paladin/Class Features/Mercy/Blinded",
    "type":"section",
    "name":"Blinded",
    "source":"Core Rulebook",
    "minLevel":12,
  },
  {
    "description":"The target is no longer deafened.",
    "url":"pfsrd://Core Rulebook/Classes/Paladin/Class Features/Mercy/Deafened",
    "type":"section",
    "name":"Deafened",
    "source":"Core Rulebook",
    "minLevel":12,
  },
  {
    "description":"The target is no longer paralyzed.",
    "url":"pfsrd://Core Rulebook/Classes/Paladin/Class Features/Mercy/Paralyzed",
    "type":"section",
    "name":"Paralyzed",
    "source":"Core Rulebook",
    "minLevel":12,
  },
  {
    "description":"The target is no longer stunned. ",
    "url":"pfsrd://Core Rulebook/Classes/Paladin/Class Features/Mercy/Stunned",
    "type":"section",
    "name":"Stunned",
    "source":"Core Rulebook",
    "minLevel":12,
  }
]

const specialAbilities = [
  {
    "description":"Paladins are proficient with all simple and martial weapons, with all types of armor (heavy, medium, and light), and with shields (except tower shields).",
    "name":"Weapon and Armor Proficiency"
  },
  {
    "description":"The power of a paladin's aura of good (see the <i>detect good</i> spell) is equal to her paladin level.",
    "name":"Aura of Good",
    "specialAbilityType":"ex",
  },
  {
    "description":" <b></b>At will, a paladin can use <i>detect evil</i>, as the spell. A paladin can, as a move action, concentrate on a single item or individual within 60 feet and determine if it is evil, learning the strength of its aura as if having studied it for 3 rounds. While focusing on one individual or object, the paladin does not detect evil in any other object or individual within range.",
    "name":"Detect Evil",
    "specialAbilityType":"sp",
  },
  {
    "description":"Once per day, a paladin can call out to the powers of good to aid her in her struggle against evil. As a swift action, the paladin chooses one target within sight to smite. If this target is evil, the paladin adds her Charisma bonus (if any) to her attack rolls and adds her paladin level to all damage rolls made against the target of her smite. If the target of smite evil is an outsider with the evil subtype, an evil-aligned dragon, or an undead creature, the bonus to damage on the first successful attack increases to 2 points of damage per level the paladin possesses. Regardless of the target, smite evil attacks automatically bypass any DR the creature might possess.In addition, while smite evil is in effect, the paladin gains a deflection bonus equal to her Charisma modifier (if any) to her AC against attacks made by the target of the smite. If the paladin targets a creature that is not evil, the smite is wasted with no effect.The smite evil effect remains until the target of the smite is dead or the next time the paladin rests and regains her uses of this ability. At 4th level, and at every three levels thereafter, the paladin may smite evil one additional time per day, as indicated on Table: Paladin, to a maximum of seven times per day at 19th level.",
    "name":"Smite Evil",
    "specialAbilityType":"su",
  },
  {
    "description":"At 2nd level, a paladin gains a bonus equal to her Charisma bonus (if any) on all saving throws.",
    "name":"Divine Grace",
    "specialAbilityType":"su",
    statSection: StatSections.SAVING_THROWS,
    fieldToUpdate: 'saving_throws'
  },
  {
    "description":"Beginning at 2nd level, a paladin can heal wounds (her own or those of others) by touch. Each day she can use this ability a number of times equal to 1/2 her paladin level plus her Charisma modifier. With one use of this ability, a paladin can heal 1d6 hit points of damage for every two paladin levels she possesses. Using this ability is a standard action, unless the paladin targets herself, in which case it is a swift action. Despite the name of this ability, a paladin only needs one free hand to use this ability. Alternatively, a paladin can use this healing power to deal damage to undead creatures, dealing 1d6 points of damage for every two levels the paladin possesses. Using lay on hands in this way requires a successful melee touch attack and doesn't provoke an attack of opportunity. Undead do not receive a saving throw against this damage.",
    "name":"Lay On Hands",
    "specialAbilityType":"su",
  },
  {
    "description":"At 3rd level, a paladin is immune to fear (magical or otherwise). Each ally within 10 feet of her gains a +4 morale bonus on saving throws against fear effects. This ability functions only while the paladin is conscious, not if she is unconscious or dead.",
    "name":"Aura of Courage",
    "specialAbilityType":"su",
    fieldToUpdate: ['aura', 'immune'],
  },
  {
    "description":"At 3rd level, a paladin is immune to all diseases, including supernatural and magical diseases, including mummy rot.",
    "name":"Divine Health",
    "specialAbilityType":"ex",
    fieldToUpdate: ['immune'],
  },
  {
    "description":"At 3rd level, and every three levels thereafter, a paladin can select one mercy. Each mercy adds an effect to the paladin's lay on hands ability. Whenever the paladin uses lay on hands to heal damage to one target, the target also receives the additional effects from all of the mercies possessed by the paladin. A mercy can remove a condition caused by a curse, disease, or poison without curing the affliction. Such conditions return after 1 hour unless the mercy actually removes the affliction that causes the condition.",
    "name":"Mercy",
    "specialAbilityType":"su",
    isParent: true,
  },
  {
    "description":"",
    "name":"Mercy Selection",
    "specialAbilityType":"su",
    selection: 'mercy',
    selectionLevelRestrictions: true,
    parentName: 'Mercy',
  },
  {
    "description":"When a paladin reaches 4th level, she gains the supernatural ability to channel positive energy like a cleric. Using this ability consumes two uses of her lay on hands ability. A paladin uses her level as her effective cleric level when channeling positive energy. This is a Charisma-based ability.",
    "name":"Channel Positive Energy",
    "specialAbilityType":"su"
  },
  {
    "description":"Beginning at 4th level, a paladin gains the ability to cast a small number of divine spells which are drawn from the paladin spell list presented in Spell Lists. A paladin must choose and prepare her spells in advance.To prepare or cast a spell, a paladin must have a Charisma score equal to at least 10 + the spell level. The Difficulty Class for a saving throw against a paladin's spell is 10 + the spell level + the paladin's Charisma modifier.Like other spellcasters, a paladin can cast only a certain number of spells of each spell level per day. Her base daily spell allotment is given on Table: Paladin. In addition, she receives bonus spells per day if she has a high Charisma score (see Table: Ability Modifiers and Bonus Spells). When Table: Paladin indicates that the paladin gets 0 spells per day of a given spell level, she gains only the bonus spells she would be entitled to based on her Charisma score for that spell level.A paladin must spend 1 hour each day in quiet prayer and meditation to regain her daily allotment of spells. A paladin may prepare and cast any spell on the paladin spell list, provided that she can cast spells of that level, but she must choose which spells to prepare during her daily meditation.Through 3rd level, a paladin has no caster level. At 4th level and higher, her caster level is equal to her paladin level &ndash; 3.",
    "source":"Core Rulebook",
    "type":"section",
    "name":"Spells"
  },
  {
    "description":"Upon reaching 5th level, a paladin forms a divine bond with her god. This bond can take one of two forms. Once the form is chosen, it cannot be changed.The first type of bond allows the paladin to enhance her weapon as a standard action by calling upon the aid of a celestial spirit for 1 minute per paladin level. When called, the spirit causes the weapon to shed light as a torch. At 5th level, this spirit grants the weapon a +1 enhancement bonus. For every three levels beyond 5th, the weapon gains another +1 enhancement bonus, to a maximum of +6 at 20th level. These bonuses can be added to the weapon, stacking with existing weapon bonuses to a maximum of +5, or they can be used to add any of the following weapon properties: <i>axiomatic</i>, <i>brilliant energy, defending, disruption, flaming, flaming burst, holy, keen, merciful</i>, and <i>speed</i>. Adding these properties consumes an amount of bonus equal to the property's cost (see Table: Melee Weapon Special Abilities). These bonuses are added to any properties the weapon already has, but duplicate abilities do not stack. If the weapon is not magical, at least a +1 enhancement bonus must be added before any other properties can be added. The bonus and properties granted by the spirit are determined when the spirit is called and cannot be changed until the spirit is called again. The celestial spirit imparts no bonuses if the weapon is held by anyone other than the paladin but resumes giving bonuses if returned to the paladin. These bonuses apply to only one end of a double weapon. A paladin can use this ability once per day at 5th level, and one additional time per day for every four levels beyond 5th, to a total of four times per day at 17th level.If a weapon bonded with a celestial spirit is destroyed, the paladin loses the use of this ability for 30 days, or until she gains a level, whichever comes first. During this 30-day period, the paladin takes a &ndash;1 penalty on attack and weapon damage rolls.The second type of bond allows a paladin to gain the service of an unusually intelligent, strong, and loyal steed to serve her in her crusade against evil. This mount is usually a heavy horse (for a Medium paladin) or a pony (for a Small paladin), although more exotic mounts, such as a boar, camel, or dog are also suitable. This mount functions as a druid's animal companion, using the paladin's level as her effective druid level. Bonded mounts have an Intelligence of at least 6. Once per day, as a full-round action, a paladin may magically call her mount to her side. This ability is the equivalent of a spell of a level equal to one-third the paladin's level. The mount immediately appears adjacent to the paladin. A paladin can use this ability once per day at 5th level, and one additional time per day for every 4 levels thereafter, for a total of four times per day at 17th level.At 11th level, the mount gains the celestial template and becomes a magical beast for the purposes of determining which spells affect it. At 15th level, a paladin's mount gains spell resistance equal to the paladin's level + 11.Should the paladin's mount die, the paladin may not summon another mount for 30 days or until she gains a paladin level, whichever comes first. During this 30-day period, the paladin takes a &ndash;1 penalty on attack and weapon damage rolls. ",
    "name":"Divine Bond",
    "specialAbilityType":"sp"
  },
  {
    "description":"At 8th level, a paladin is immune to charm spells and spell-like abilities. Each ally within 10 feet of her gains a +4 morale bonus on saving throws against charm effects.This ability functions only while the paladin is conscious, not if she is unconscious or dead.",
    "name":"Aura of Resolve",
    "specialAbilityType":"su",
    fieldToUpdate: ['aura'],
  },
  {
    "description":"At 11th level, a paladin can expend two uses of her smite evil ability to grant the ability to smite evil to all allies within 10 feet, using her bonuses. Allies must use this smite evil ability by the start of the paladin's next turn and the bonuses last for 1 minute. Using this ability is a free action. Evil creatures gain no benefit from this ability. ",
    "name":"Aura of Justice",
    "specialAbilityType":"su",
    fieldToUpdate: ['aura'],
  },
  {
    "description":"At 14th level, a paladin's weapons are treated as good-aligned for the purposes of overcoming damage reduction. Any attack made against an enemy within 10 feet of her is treated as good-aligned for the purposes of overcoming damage reduction. This ability functions only while the paladin is conscious, not if she is unconscious or dead.",
    "name":"Aura of Faith",
    "specialAbilityType":"su",
    fieldToUpdate: ['aura'],
  },
  {
    "description":"At 17th level, a paladin gains DR 5/evil and immunity to compulsion spells and spell-like abilities. Each ally within 10 feet of her gains a +4 morale bonus on saving throws against compulsion effects. This ability functions only while the paladin is conscious, not if she is unconscious or dead.",
    "name":"Aura of Righteousness",
    "specialAbilityType":"su",
    fieldToUpdate: ['dr', 'aura'],
  },
  {
    "description":"At 20th level, a paladin becomes a conduit for the power of her god. Her DR increases to 10/evil. Whenever she uses smite evil and successfully strikes an evil outsider, the outsider is also subject to a <i>banishment</i>, using her paladin level as the caster level (her weapon and holy symbol automatically count as objects that the subject hates). After the <i>banishment</i> effect and the damage from the attack is resolved, the smite immediately ends. In addition, whenever she channels positive energy or uses lay on hands to heal a creature, she heals the maximum possible amount.",
    "name":"Holy Champion",
    "specialAbilityType":"su",
    statSection: StatSections.DEFENSIVE_ABILITIES,
    fieldToUpdate: 'dr'
  },
  {
    "description":"A paladin must be of lawful good alignment and loses all class features except proficiencies if she ever willingly commits an evil act.Additionally, a paladin's code requires that she respect legitimate authority, act with honor (not lying, not cheating, not using poison, and so forth), help those in need (provided they do not use the help for evil or chaotic ends), and punish those who harm or threaten innocents.",
    "name":"Code of Conduct",
  },
  {
    "description":"While she may adventure with good or neutral allies, a paladin avoids working with evil characters or with anyone who consistently offends her moral code. Under exceptional circumstances, a paladin can ally with evil associates, but only to defeat what she believes to be a greater evil. A paladin should seek an <i>atonement</i> spell periodically during such an unusual alliance, and should end the alliance immediately should she feel it is doing more harm than good. A paladin may accept only henchmen, followers, or cohorts who are lawful good.",
    "name":"Associates",
  }
]
const paladin = {
    name: 'paladin',
    abbreviation: 'pal',
    alignment: 'LG',
    hitDieType: 10,
    classSkills: [
        {name: "Craft"},
        {name: "Diplomacy"},
        {name: "Handle Animal"},
        {name: "Heal"},
        {name: "Knowledge", subName: "nobility"},
        {name: "Knowledge", subName: "religion"},
        {name: "Profession"},
        {name: "Ride"},
        {name: "Sense Motive"},
        {name: "Spellcraft"}
    ],
    skillRanksPerLevel: 2,
    "base_attack_bonus": "fast",  //might like a different format  for the key but this matches creatureStatsByType
    "good_saving_throws": ["Fort", "Will"], //might like a different format  for the key but this matches creatureStatsByType
    specialAbilities: specialAbilities,
    advancement: paladinAdvancement,
    mercy: mercy,
    isCaster: true,
    prepareSpells: true,
    casterLevelAdjustment: -3,
    zeroLevelSpells: false,
    primaryAbilityScore: 'cha',
    //TODO: Handle Bonus Spells, Starting spell level of 1 vs 0. 
    spellsByLevel: [
      paladinSpells.filter(x => x.paladin === 1), 
      paladinSpells.filter(x => x.paladin === 2), 
      paladinSpells.filter(x => x.paladin === 3), 
      paladinSpells.filter(x => x.paladin === 4)
    ],
    levels: [
        {
          level: 1, 
          classAbilities: ['Weapon and Armor Proficiency', 'Aura of Good', 'Detect Evil', 'Smite Evil'],
          spellsPerDay: [0, 0, 0, 0],
        },
        {
          level: 2,
          classAbilities: ['Divine Grace', 'Lay On Hands'],
          spellsPerDay: [0, 0, 0, 0],
        },
        {
          level: 3,
          classAbilities: ['Aura of Courage', 'Divine Health', 'Mercy', 'Mercy Selection'],
          spellsPerDay: [0, 0, 0, 0],
        },
        {
          level: 4,
          classAbilities: ['Channel Positive Energy'],
          spellsPerDay: [0, 0, 0, 0],
        },
        {
          level: 5,
          classAbilities: ['Divine Bond'],
          spellsPerDay: [1, 0, 0, 0],
        },
        {
          level: 6,
          classAbilities: ['Mercy Selection'],
          spellsPerDay: [1, 0, 0, 0],
        },
        {
          level: 7,
          classAbilities: [],
          spellsPerDay: [1, 0, 0, 0],
        },
        {
          level: 8,
          classAbilities: ['Aura of Resolve'],
          spellsPerDay: [1, 1, 0, 0],
        },
        {
          level: 9,
          classAbilities: ['Mercy Selection'],
          spellsPerDay: [2, 1, 0, 0],
        },
        {
          level: 10,
          classAbilities: [],
          spellsPerDay: [2, 1, 0, 0],
        },
        {
          level: 11,
          classAbilities: ['Aura of Justice'],
          spellsPerDay: [2, 1, 1, 0],
        },
        {
          level: 12,
          classAbilities: ['Mercy Selection'],
          spellsPerDay: [2, 2, 1, 0],
        },
        {
          level: 13,
          classAbilities: [],
          spellsPerDay: [3, 2, 1, 0],
        },
        {
          level: 14,
          classAbilities: ['Aura of Faith'],
          spellsPerDay: [3, 2, 1, 1],
        },
        {
          level: 15,
          classAbilities: ['Mercy Selection'],
          spellsPerDay: [3, 2, 2, 1],
        },
        {
          level: 16,
          classAbilities: [],
          spellsPerDay: [3, 3, 2, 1],
        },
        {
          level: 17,
          classAbilities: ['Aura of Righteousness'],
          spellsPerDay: [4, 3, 2, 1],
        },
        {
          level: 18,
          classAbilities: ['Mercy Selection'],
          spellsPerDay: [4, 3, 2, 2],
        },
        {
          level: 19,
          classAbilities: [],
          spellsPerDay: [4, 3, 3, 2],
        },
        {
          level: 20,
          classAbilities: ['Holy Champion'],
          spellsPerDay: [4, 4, 3, 3],
        }
    ]
};

export default paladin;