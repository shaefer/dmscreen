import * as StatSections from '../GeneralRules/StatSections';
import bardAdvancement from '../../components/ClassLevels/BardAdvancement';
import {bardSpells} from './BardSpells';
const bardPerformSkills = [
  {name:'Act', perform: 'Act', replace: ['Bluff', 'Disguise']},
  {name:'Comedy', perform: 'Comedy', replace: ['Bluff', 'Intimidate']},
  {name:'Dance', perform: 'Dance', replace: ['Acrobatics', 'Fly']},
  {name:'Keyboard Instruments', perform: 'Keyboard Instruments', replace: ['Diplomacy', 'Intimidate']},
  {name:'Oratory', perform: 'Oratory', replace: ['Diplomacy', 'Sense Motive']},
  {name:'Percussion', perform: 'Percussion', replace: ['Handle Animal', 'Intimidate']},
  {name:'Sing', perform: 'Sing', replace: ['Bluff', 'Sense Motive']},
  {name:'String', perform: 'String', replace: ['Bluff', 'Diplomacy']},
  {name:'Wind', perform: 'Wind', replace: ['Diplomacy', 'Handle Animal']}
];
const specialAbilities = [
    {
        "description": "A bard is proficient with all simple weapons, plus the longsword, rapier, sap, short sword, shortbow, and whip. Bards are also proficient with light armor and shields (except tower shields). A bard can cast bard spells while wearing light armor and use a shield without incurring the normal arcane spell failure chance. Like any other arcane spellcaster, a bard wearing medium or heavy armor incurs a chance of arcane spell failure if the spell in question has a somatic component. A multiclass bard still incurs the normal arcane spell failure chance for arcane spells received from other classes.", 
        "source": "Core Rulebook", 
        "type": "section", 
        "name": "Weapon and Armor Proficiency"
    }, 
    {
        "description": "A bard casts arcane spells drawn from the bard spell list presented in Spell Lists. He can cast any spell he knows without preparing it ahead of time. Every bard spell has a verbal component (song, recitation, or music). To learn or cast a spell, a bard must have a Charisma score equal to at least 10 + the spell level. The Difficulty Class for a saving throw against a bard's spell is 10 + the spell level + the bard's Charisma modifier.Like other spellcasters, a bard can cast only a certain number of spells of each spell level per day. His base daily spell allotment is given on Table: Bard. In addition, he receives bonus spells per day if he has a high Charisma score (see Table: Ability Modifiers and Bonus Spells).The bard's selection of spells is extremely limited. A bard begins play knowing four 0-level spells and two 1st-level spells of the bard's choice. At each new bard level, he gains one or more new spells, as indicated on Table: Bard Spells Known. (Unlike spells per day, the number of spells a bard knows is not affected by his Charisma score. The numbers on Table: Bard Spells Known are fixed.)Upon reaching 5th level, and at every third bard level after that (8th, 11th, and so on), a bard can choose to learn a new spell in place of one he already knows. In effect, the bard &ldquo;loses&rdquo; the old spell in exchange for the new one. The new spell's level must be the same as that of the spell being exchanged, and it must be at least one level lower than the highest-level bard spell the bard can cast. A bard may swap only a single spell at any given level and must choose whether or not to swap the spell at the same time that he gains new spells known for the level.A bard need not prepare his spells in advance. He can cast any spell he knows at any time, assuming he has not yet used up his allotment of spells per day for the spell's level. ", 
        "source": "Core Rulebook", 
        "type": "section", 
        "name": "Spells"
    }, 
    {
        "description": "A bard adds half his class level (minimum 1) on all Knowledge skill checks and may make all Knowledge skill checks untrained. ", 
        "name": "Bardic Knowledge", 
        "url": "pfsrd://Core Rulebook/Classes/Bard/Class Features/Bardic Knowledge", 
        "specialAbilityType": "ex",
        "source": "Core Rulebook", 
        "type": "ability"
    }, 
    {
      "name": "Bardic Performance",
      "description": "A bard is trained to use the Perform skill to create magical effects on those around him, including himself if desired. He can use this ability for a number of rounds per day equal to 4 + his Charisma modifier. At each level after 1st a bard can use bardic performance for 2 additional rounds per day. Each round, the bard can produce any one of the types of bardic performance that he has mastered, as indicated by his level. Starting a bardic performance is a standard action, but it can be maintained each round as a free action. Changing a bardic performance from one effect to another requires the bard to stop the previous performance and start a new one as a standard action. A bardic performance cannot be disrupted, but it ends immediately if the bard is killed, paralyzed, stunned, knocked unconscious, or otherwise prevented from taking a free action to maintain it each round. A bard cannot have more than one bardic performance in effect at one time. At 7th level, a bard can start a bardic performance as a move action instead of a standard action. At 13th level, a bard can start a bardic performance as a swift action. Each bardic performance has audible components, visual components, or both. If a bardic performance has audible components, the targets must be able to hear the bard for the performance to have any effect, and many such performances are language dependent (as noted in the description). A deaf bard has a 20% chance to fail when attempting to use a bardic performance with an audible component. If he fails this check, the attempt still counts against his daily limit. Deaf creatures are immune to bardic performances with audible components. If a bardic performance has a visual component, the targets must have line of sight to the bard for the performance to have any effect. A blind bard has a 50% chance to fail when attempting to use a bardic performance with a visual component. If he fails this check, the attempt still counts against his daily limit. Blind creatures are immune to bardic performances with visual components.",
      "specialAbilityType": "ex",
      "source": "Core Rulebook", 
      "type": "ability"
    },
    {
        "description": "At 1st level, a bard learns to counter magic effects that depend on sound (but not spells that have verbal components). Each round of the countersong he makes a Perform (keyboard, percussion, wind, string, or sing) skill check. Any creature within 30 feet of the bard (including the bard himself) that is affected by a sonic or language-dependent magical attack may use the bard's Perform check result in place of its saving throw if, after the saving throw is rolled, the Perform check result proves to be higher. If a creature within range of the countersong is already under the effect of a noninstantaneous sonic or language-dependent magical attack, it gains another saving throw against the effect each round it hears the countersong, but it must use the bard's Perform skill check result for the save. Countersong does not work on effects that don't allow saves. Countersong relies on audible components.", 
        "name": "Countersong", 
        "source": "Core Rulebook", 
        "url": "pfsrd://Core Rulebook/Classes/Bard/Class Features/Bardic Performance/Countersong", 
        "specialAbilityType": "su",
        "subtype": "bardic_performance", 
        "type": "ability"
    }, 
    {
        "description": "At 1st level, a bard can use his performance to counter magic effects that depend on sight. Each round of the distraction, he makes a Perform (act, comedy, dance, or oratory) skill check. Any creature within 30 feet of the bard (including the bard himself) that is affected by an illusion (pattern) or illusion (figment) magical attack may use the bard's Perform check result in place of its saving throw if, after the saving throw is rolled, the Perform skill check proves to be higher. If a creature within range of the distraction is already under the effect of a noninstantaneous illusion (pattern) or illusion (figment) magical attack, it gains another saving throw against the effect each round it sees the distraction, but it must use the bard's Perform skill check result for the save. Distraction does not work on effects that don't allow saves. Distraction relies on visual components.", 
        "name": "Distraction", 
        "source": "Core Rulebook", 
        "url": "pfsrd://Core Rulebook/Classes/Bard/Class Features/Bardic Performance/Distraction", 
        "specialAbilityType": "su",
        "subtype": "bardic_performance", 
        "type": "ability"
    }, 
    {
        "description": "At 1st level, a bard can use his performance to cause one or more creatures to become fascinated with him. Each creature to be fascinated must be within 90 feet, able to see and hear the bard, and capable of paying attention to him. The bard must also be able to see the creatures affected. The distraction of a nearby combat or other dangers prevents this ability from working. For every three levels the bard has attained beyond 1st, he can target one additional creature with this ability.Each creature within range receives a Will save (DC 10 + 1/2 the bard's level + the bard's Cha modifier) to negate the effect. If a creature's saving throw succeeds, the bard cannot attempt to fascinate that creature again for 24 hours. If its saving throw fails, the creature sits quietly and observes the performance for as long as the bard continues to maintain it. While fascinated, a target takes a &ndash;4 penalty on all skill checks made as reactions, such as Perception checks. Any potential threat to the target allows the target to make a new saving throw against the effect. Any obvious threat, such as someone drawing a weapon, casting a spell, or aiming a weapon at the target, automatically breaks the effect.Fascinate is an enchantment (compulsion), mind-affecting ability. Fascinate relies on audible and visual components in order to function. ", 
        "name": "Fascinate", 
        "source": "Core Rulebook", 
        "url": "pfsrd://Core Rulebook/Classes/Bard/Class Features/Bardic Performance/Fascinate", 
        "specialAbilityType": "su",
        "subtype": "bardic_performance", 
        "type": "ability"
    }, 
    {
        "description": "A 1st-level bard can use his performance to inspire courage in his allies (including himself), bolstering them against fear and improving their combat abilities. To be affected, an ally must be able to perceive the bard's performance. An affected ally receives a +1 morale bonus on saving throws against charm and fear effects and a +1 competence bonus on attack and weapon damage rolls. At 5th level, and every six bard levels thereafter, this bonus increases by +1, to a maximum of +4 at 17th level. Inspire courage is a mind-affecting ability. Inspire courage can use audible or visual components. The bard must choose which component to use when starting his performance.", 
        "name": "Inspire Courage", 
        "source": "Core Rulebook", 
        "url": "pfsrd://Core Rulebook/Classes/Bard/Class Features/Bardic Performance/Inspire Courage", 
        "specialAbilityType": "su",
        "subtype": "bardic_performance", 
        "type": "ability",
        statSection: StatSections.SPECIAL_ATTACKS,
        fieldToUpdate: 'acquiredSpecialAttacks'
    }, 
    {
        "description": "A bard of 3rd level or higher can use his performance to help an ally succeed at a task. That ally must be within 30 feet and be able to hear the bard. The ally gets a +2 competence bonus on skill checks with a particular skill as long as she continues to hear the bard's performance. This bonus increases by +1 for every four levels the bard has attained beyond 3rd (+3 at 7th, +4 at 11th, +5 at 15th, and +6 at 19th). Certain uses of this ability are infeasible, such as Stealth, and may be disallowed at the GM's discretion. A bard can't inspire competence in himself. Inspire competence relies on audible components.", 
        "name": "Inspire Competence", 
        "source": "Core Rulebook", 
        "url": "pfsrd://Core Rulebook/Classes/Bard/Class Features/Bardic Performance/Inspire Competence", 
        "specialAbilityType": "su",
        "subtype": "bardic_performance", 
        "type": "ability",
        statSection: StatSections.SPECIAL_ATTACKS,
        fieldToUpdate: 'acquiredSpecialAttacks'
    }, 
    {
        "description": "A bard of 6th level or higher can use his performance to make a suggestion (as per the spell) to a creature he has already fascinated (see above). Using this ability does not disrupt the fascinate effect, but it does require a standard action to activate (in addition to the free action to continue the fascinate effect). A bard can use this ability more than once against an individual creature during an individual performance.Making a suggestion does not count against a bard's daily use of bardic performance. A Will saving throw (DC 10 + 1/2 the bard's level + the bard's Cha modifier) negates the effect. This ability affects only a single creature. Suggestion is an enchantment (compulsion), mind-affecting, language-dependent ability and relies on audible components.", 
        "name": "Suggestion", 
        "source": "Core Rulebook", 
        "url": "pfsrd://Core Rulebook/Classes/Bard/Class Features/Bardic Performance/Suggestion", 
        "specialAbilityType": "sp",
        "subtype": "bardic_performance", 
        "type": "ability"
    }, 
    {
        "description": "A bard of 8th level or higher can use his performance to foster a sense of growing dread in his enemies, causing them to become shaken. To be affected, an enemy must be within 30 feet and able to see and hear the bard's performance. The effect persists for as long as the enemy is within 30 feet and the bard continues his performance. This performance cannot cause a creature to become frightened or panicked, even if the targets are already shaken from another effect. Dirge of doom is a mind-affecting fear effect, and it relies on audible and visual components.", 
        "name": "Dirge of Doom", 
        "source": "Core Rulebook", 
        "url": "pfsrd://Core Rulebook/Classes/Bard/Class Features/Bardic Performance/Dirge of Doom", 
        "specialAbilityType": "su",
        "subtype": "bardic_performance", 
        "type": "ability"
    }, 
    {
        "description": "A bard of 9th level or higher can use his performance to inspire greatness in himself or a single willing ally within 30 feet, granting extra fighting capability. For every three levels the bard attains beyond 9th, he can target an additional ally while using this performance (up to a maximum of four targets at 18th level). To inspire greatness, all of the targets must be able to see and hear the bard. A creature inspired with greatness gains 2 bonus Hit Dice (d10s), the commensurate number of temporary hit points (apply the target's Constitution modifier, if any, to these bonus Hit Dice), a +2 competence bonus on attack rolls, and a +1 competence bonus on Fortitude saves. The bonus Hit Dice count as regular Hit Dice for determining the effect of spells that are Hit Dice dependent. Inspire greatness is a mind-affecting ability and it relies on audible and visual components.", 
        "name": "Inspire Greatness", 
        "source": "Core Rulebook", 
        "url": "pfsrd://Core Rulebook/Classes/Bard/Class Features/Bardic Performance/Inspire Greatness", 
        "specialAbilityType": "su",
        "subtype": "bardic_performance", 
        "type": "ability"
    }, 
    {
        "description": " A bard of 12th level or higher can use his performance to create an effect equivalent to a mass cure serious wounds, using the bard's level as the caster level. In addition, this performance removes the fatigued, sickened, and shaken conditions from all those affected. Using this ability requires 4 rounds of continuous performance, and the targets must be able to see and hear the bard throughout the performance. Soothing performance affects all targets that remain within 30 feet throughout the performance. Soothing performance relies on audible and visual components.", 
        "name": "Soothing Performance", 
        "source": "Core Rulebook", 
        "url": "pfsrd://Core Rulebook/Classes/Bard/Class Features/Bardic Performance/Soothing Performance", 
        "specialAbilityType": "su",
        "subtype": "bardic_performance", 
        "type": "ability"
    }, 
    {
        "description": "A bard of 14th level or higher can use his performance to cause fear in his enemies. To be affected, an enemy must be able to hear the bard perform and be within 30 feet. Each enemy within range receives a Will save (DC 10 + 1/2 the bard's level + the bard's Cha modifier) to negate the effect. If the save succeeds, the creature is immune to this ability for 24 hours. If the save fails, the target becomes frightened and flees for as long as the target can hear the bard's performance. Frightening tune relies on audible components.", 
        "name": "Frightening Tune", 
        "source": "Core Rulebook", 
        "url": "pfsrd://Core Rulebook/Classes/Bard/Class Features/Bardic Performance/Frightening Tune", 
        "specialAbilityType": "sl",
        "subtype": "bardic_performance", 
        "type": "ability"
    }, 
    {
        "description": " A bard of 15th level or higher can inspire tremendous heroism in himself or a single ally within 30 feet. For every three bard levels the character attains beyond 15th, he can inspire heroics in an additional creature. To inspire heroics, all of the targets must be able to see and hear the bard. Inspired creatures gain a +4 morale bonus on saving throws and a +4 dodge bonus to AC. This effect lasts for as long as the targets are able to witness the performance. Inspire heroics is a mind-affecting ability that relies on audible and visual components.", 
        "name": "Inspire Heroics", 
        "source": "Core Rulebook", 
        "url": "pfsrd://Core Rulebook/Classes/Bard/Class Features/Bardic Performance/Inspire Heroics", 
        "specialAbilityType": "su",
        "subtype": "bardic_performance", 
        "type": "ability"
    }, 
    {
        "description": "This ability functions just like suggestion, but allows a bard of 18th level or higher to make a suggestion simultaneously to any number of creatures that he has already fascinated. Mass suggestion is an  enchantment (compulsion), mind-affecting, language-dependent ability that relies on audible components.", 
        "name": "Mass Suggestion", 
        "source": "Core Rulebook", 
        "url": "pfsrd://Core Rulebook/Classes/Bard/Class Features/Bardic Performance/Mass Suggestion", 
        "specialAbilityType": "sp",
        "subtype": "bardic_performance", 
        "type": "ability"
    }, 
    {
        "description": "A bard of 20th level or higher can use his performance to cause one enemy to die from joy or sorrow. To be affected, the target must be able to see and hear the bard perform for 1 full round and be within 30 feet. The target receives a Will save (DC 10 + 1/2 the bard's level + the bard's Cha modifier) to negate the effect. If a creature's saving throw succeeds, the target is staggered for 1d4 rounds, and the bard cannot use deadly performance on that creature again for 24 hours. If a creature's saving throw fails, it dies. Deadly performance is a mind-affecting death effect that relies on audible and visual components.", 
        "name": "Deadly Performance", 
        "source": "Core Rulebook", 
        "url": "pfsrd://Core Rulebook/Classes/Bard/Class Features/Bardic Performance/Deadly Performance", 
        "specialAbilityType": "su",
        "subtype": "bardic_performance", 
        "type": "ability"
    },
    {
        "description": "Bards learn a number of cantrips, or 0-level spells, as noted on Table: Bard Spells Known under &ldquo;Spells Known.&rdquo; These spells are cast like any other spell, but they do not consume any slots and may be used again.", 
        "url": "pfsrd://Core Rulebook/Classes/Bard/Class Features/Cantrips", 
        "type": "section", 
        "name": "Cantrips", 
        "source": "Core Rulebook"
    }, 
    {
        "description": "At 2nd level, a bard can choose one type of Perform skill. He can use his bonus in that skill in place of his bonus in associated skills. When substituting in this way, the bard uses his total Perform skill bonus, including class skill bonus, in place of its associated skill's bonus, whether or not he has ranks in that skill or if it is a class skill. At 6th level, and every 4 levels thereafter, the bard can select an additional type of Perform to substitute.The types of Perform and their associated skills are: Act (Bluff, Disguise), Comedy (Bluff, Intimidate), Dance (Acrobatics, Fly), Keyboard Instruments (Diplomacy, Intimidate), Oratory (Diplomacy, Sense Motive), Percussion (Handle Animal, Intimidate), Sing (Bluff, Sense Motive), String (Bluff, Diplomacy), and Wind (Diplomacy, Handle Animal).", 
        "name": "Versatile Performance", 
        "url": "pfsrd://Core Rulebook/Classes/Bard/Class Features/Versatile Performance", 
        "specialAbilityType": "ex",
        "source": "Core Rulebook", 
        "type": "ability",
        selection: 'bardPerformSkills'
    }, 
    {
        "description": "At 2nd level, the bard becomes resistant to the bardic performance of others, and to sonic effects in general. The bard gains a +4 bonus on saving throws made against bardic performance, sonic, and language-dependent effects. ", 
        "name": "Well-Versed", 
        "url": "pfsrd://Core Rulebook/Classes/Bard/Class Features/Well-Versed", 
        "specialAbilityType": "ex",
        "source": "Core Rulebook", 
        "type": "ability"
    }, 
    {
        "description": "At 5th level, the bard becomes a master of lore and can take 10 on any Knowledge skill check that he has ranks in. A bard can choose not to take 10 and can instead roll normally. In addition, once per day, the bard can take 20 on any Knowledge skill check as a standard action. He can use this ability one additional time per day for every six levels he possesses beyond 5th, to a maximum of three times per day at 17th level.", 
        "name": "Lore Master", 
        "url": "pfsrd://Core Rulebook/Classes/Bard/Class Features/Lore Master", 
        "specialAbilityType": "ex",
        "source": "Core Rulebook", 
        "type": "ability"
    }, 
    {
        "description": "At 10th level, the bard can use any skill, even if the skill normally requires him to be trained. At 16th level, the bard considers all skills to be class skills. At 19th level, the bard can take 10 on any skill check, even if it is not normally allowed.", 
        "name": "Jack-of-All-Trades", 
        "url": "pfsrd://Core Rulebook/Classes/Bard/Class Features/Jack-of-All-Trades", 
        "specialAbilityType": "ex",
        "source": "Core Rulebook", 
        "type": "ability"
    }
]
const bard = {
    name: 'bard',
    abbreviation: 'brd',
    alignment: 'any',
    hitDieType: 8,
    classSkills: [
        {name: "Acrobatics"},
        {name: "Appraise"},
        {name: "Bluff"},
        {name: "Climb"},
        {name: "Craft"},
        {name: "Diplomacy"},
        {name: "Disguise"},
        {name: "Escape Artist"},
        {name: "Intimidate"},
        {name: "Knowledge"},
        {name: "Linguistics"},
        {name: "Perception"},
        {name: "Perform"},
        {name: "Profession"},
        {name: "Sense Motive"},
        {name: "Sleight of Hand"},
        {name: "Spellcraft"},
        {name: "Stealth"},
        {name: "Use Magic Device"}
    ],
    skillRanksPerLevel: 6,
    "base_attack_bonus": "medium",  //might like a different format  for the key but this matches creatureStatsByType
    "good_saving_throws": ["Ref", "Will"], //might like a different format  for the key but this matches creatureStatsByType
    specialAbilities: specialAbilities,
    bardPerformSkills: bardPerformSkills,
    advancement: bardAdvancement,
    isCaster: true,
    prepareSpells: false,
    primaryAbilityScore: 'cha',
    spellsByLevel: [bardSpells.filter(x => x.bard === 0), bardSpells.filter(x => x.bard === 1), bardSpells.filter(x => x.bard === 2), bardSpells.filter(x => x.bard === 3), bardSpells.filter(x => x.bard === 4), bardSpells.filter(x => x.bard === 5), bardSpells.filter(x => x.bard === 6)],
    levels: [
        {
          level: 1, 
          classAbilities: ['Bardic Knowledge', 'Bardic Performance', 'Cantrips', 'Countersong', 'Distraction', 'Fascinate', 'Inspire Courage'],
          spellsPerDay: [0, 1, 0, 0, 0, 0, 0], //0-6
          spellsKnown:  [4, 2, 0, 0, 0, 0, 0], //0-6
        },
        {
          level: 2,
          classAbilities: ['Versatile Performance', 'Well-Versed'],
          spellsPerDay: [0, 2, 0, 0, 0, 0, 0],
          spellsKnown:  [5, 3, 0, 0, 0, 0, 0],
        },
        {
          level: 3,
          classAbilities: ['Inspire Competence'],
          spellsPerDay: [0, 3, 0, 0, 0, 0, 0],
          spellsKnown:  [6, 4, 0, 0, 0, 0, 0],
        },
        {
          level: 4,
          classAbilities: [],
          spellsPerDay: [0, 3, 1, 0, 0, 0, 0],
          spellsKnown:  [6, 4, 2, 0, 0, 0, 0],
        },
        {
          level: 5,
          classAbilities: ['Lore Master'], //inspire courage +2,
          spellsPerDay: [0, 4, 2, 0, 0, 0, 0],
          spellsKnown:  [6, 4, 3, 0, 0, 0, 0],
        },
        {
          level: 6,
          classAbilities: ['Suggestion', 'Versatile Performance'],
          spellsPerDay: [0, 4, 3, 0, 0, 0, 0],
          spellsKnown:  [6, 4, 4, 0, 0, 0, 0],
        },
        {
          level: 7,
          classAbilities: [], //inpsire competence +3
          spellsPerDay: [0, 4, 3, 1, 0, 0, 0],
          spellsKnown:  [6, 5, 4, 2, 0, 0, 0],
        },
        {
          level: 8,
          classAbilities: ["Dirge of Doom"],
          spellsPerDay: [0, 4, 4, 2, 0, 0, 0],
          spellsKnown:  [6, 5, 4, 3, 0, 0, 0],
        },
        {
          level: 9,
          classAbilities: ['Inspire Greatness'],
          spellsPerDay: [0, 5, 4, 3, 0, 0, 0],
          spellsKnown:  [6, 5, 4, 4, 0, 0, 0],
        },
        {
          level: 10,
          classAbilities: ['Jack-of-All-Trades', 'Versatile Performance'],
          spellsPerDay: [0, 5, 4, 3, 1, 0, 0],
          spellsKnown:  [6, 5, 5, 4, 2, 0, 0],
        },
        {
          level: 11,
          classAbilities: [], //'Inspire competence +4, inspire courage +3, lore master 2/day'
          spellsPerDay: [0, 5, 4, 4, 2, 0, 0],
          spellsKnown:  [6, 6, 5, 4, 3, 0, 0],
        },
        {
          level: 12,
          classAbilities: ['Soothing Performance'],
          spellsPerDay: [0, 5, 5, 4, 3, 0, 0],
          spellsKnown:  [6, 6, 5, 4, 4, 0, 0],
        },
        {
          level: 13,
          classAbilities: [],
          spellsPerDay: [0, 5, 5, 4, 3, 1, 0],
          spellsKnown:  [6, 6, 5, 5, 4, 2, 0],
        },
        {
          level: 14,
          classAbilities: ['Frightening Tune', 'Versatile Performance'],
          spellsPerDay: [0, 5, 5, 4, 4, 2, 0],
          spellsKnown:  [6, 6, 6, 5, 4, 3, 0],
        },
        {
          level: 15,
          classAbilities: ['Inspire Heroics'], //Inspire competence +5, 
          spellsPerDay: [0, 5, 5, 5, 4, 3, 0],
          spellsKnown:  [6, 6, 6, 5, 4, 4, 0],
        },
        {
          level: 16,
          classAbilities: [],
          spellsPerDay: [0, 5, 5, 5, 4, 3, 1],
          spellsKnown:  [6, 6, 6, 5, 5, 4, 2],
        },
        {
          level: 17,
          classAbilities: [], //inspire courage +4, lore master 3/day
          spellsPerDay: [0, 5, 5, 5, 4, 4, 2],
          spellsKnown:  [6, 6, 6, 6, 5, 4, 3],
        },
        {
          level: 18,
          classAbilities: ['Mass Suggestion', 'Versatile Performance'],
          spellsPerDay: [0, 5, 5, 5, 5, 4, 3],
          spellsKnown:  [6, 6, 6, 6, 5, 4, 4],
        },
        {
          level: 19,
          classAbilities: [], //Inspire competence +6
          spellsPerDay: [0, 5, 5, 5, 5, 5, 4],
          spellsKnown:  [6, 6, 6, 6, 5, 5, 4],
        },
        {
          level: 20,
          classAbilities: ['Deadly Performance'],
          spellsPerDay: [0, 5, 5, 5, 5, 5, 5],
          spellsKnown:  [6, 6, 6, 6, 6, 5, 5],
        }
    ]
};

export default bard;