import creatureStatsByType from "../../components/PathfinderMonsterAdvancer/AdvancementTools/creatureStatsByType";
import * as StatSections from '../GeneralRules/StatSections';
import barbarianAdvancement from '../../components/ClassLevels/BarbarianAdvancement';
//creatureStatsByType gives a lot of this information in a fixed format...we'll have to match things up eventually.
/**
1st	+1	+2	+0	+0	Fast movement, rage
2nd	+2	+3	+0	+0	Rage power, uncanny dodge
3rd	+3	+3	+1	+1	Trap sense +1
4th	+4	+4	+1	+1	Rage power
5th	+5	+4	+1	+1	Improved uncanny dodge
6th	+6/+1	+5	+2	+2	Rage power, Trap sense +2
7th	+7/+2	+5	+2	+2	Damage reduction 1/—
8th	+8/+3	+6	+2	+2	Rage power
9th	+9/+4	+6	+3	+3	Trap sense +3
10th	+10/+5	+7	+3	+3	Damage reduction 2/—, Rage power
11th	+11/+6/+1	+7	+3	+3	Greater rage
12th	+12/+7/+2	+8	+4	+4	Rage power, Trap sense +4
13th	+13/+8/+3	+8	+4	+4	Damage reduction 3/—
14th	+14/+9/+4	+9	+4	+4	Indomitable will, Rage power
15th	+15/+10/+5	+9	+5	+5	Trap sense +5
16th	+16/+11/+6/+1	+10	+5	+5	Damage reduction 4/—, Rage power
17th	+17/+12/+7/+2	+10	+5	+5	Tireless rage
18th	+18/+13/+8/+3	+11	+6	+6	Rage power, Trap sense +6
19th	+19/+14/+9/+4	+11	+6	+6	Damage reduction 5/—
20th	+20/+15/+10/+5	+12	+6	+6	Mighty rage, Rage power
 */
const barbarianRagePowers = [ 
  { 
    "name":"Animal Fury",
    "minLevel":1,
    "specialAbilityType":"ex",
    "description":"While raging, the barbarian gains a bite attack. If used as part of a full attack action, the bite attack is made at the barbarian's full base attack bonus –5. If the bite hits, it deals 1d4 points of damage (assuming the barbarian is Medium; 1d3 points of damage if Small) plus half the barbarian's Strength modifier. A barbarian can make a bite attack as part of the action to maintain or break free from a grapple. This attack is resolved before the grapple check is made. If the bite attack hits, any grapple checks made by the barbarian against the target this round are at a +2 bonus."
  },
  { 
    "name":"Clear Mind",
    "minLevel":8,
    "specialAbilityType":"ex",
    "description":"A barbarian may reroll a failed Will save. This power is used as an immediate action after the first save is attempted, but before the results are revealed by the GM. The barbarian must take the second result, even if it is worse. A barbarian must be at least 8th level before selecting this power. This power can only be used once per rage."
  },
  { 
    "name":"Fearless Rage",
    "minLevel":12,
    "specialAbilityType":"ex",
    "description":"While raging, the barbarian is immune to the shaken and frightened conditions. A barbarian must be at least 12th level before selecting this rage power."
  },
  { 
    "name":"Guarded Stance",
    "minLevel":1,
    "specialAbilityType":"ex",
    "description":"The barbarian gains a +1 dodge bonus to her Armor Class against melee attacks for a number of rounds equal to the barbarian's current Constitution modifier (minimum 1). This bonus increases by +1 for every 6 levels the barbarian has attained. Activating this ability is a move action that does not provoke an attack of opportunity."
  },
  { 
    "name":"Increased Damage Reduction",
    "minLevel":8,
    "multipleSelection":true,
    "specialAbilityType":"ex",
    "description":"The barbarian's damage reduction increases by 1/—. This increase is always active while the barbarian is raging. A barbarian can select this rage power up to three times. Its effects stack. A barbarian must be at least 8th level before selecting this rage power.",
    statSection: StatSections.DEFENSIVE_ABILITIES,
    fieldToUpdate: 'dr'
  },
  { 
    "name":"Internal Fortitude",
    "minLevel":8,
    "specialAbilityType":"ex",
    "description":"While raging, the barbarian is immune to the sickened and nauseated conditions. A barbarian must be at least 8th level before selecting this rage power."
  },
  { 
    "name":"Intimidating Glare",
    "minLevel":1,
    "specialAbilityType":"ex",
    "description":"The barbarian can make an Intimidate check against one adjacent foe as a move action. If the barbarian successfully demoralizes her opponent, the foe is shaken for 1d4 rounds + 1 round for every 5 points by which the barbarian's check exceeds the DC."
  },
  { 
    "name":"Knockback",
    "minLevel":1,
    "specialAbilityType":"ex",
    "description":"Once per round, the barbarian can make a bull rush attempt against one target in place of a melee attack. If successful, the target takes damage equal to the barbarian's Strength modifier and is moved back as normal. The barbarian does not need to move with the target if successful. This does not provoke an attack of opportunity."
  },
  { 
    "name":"Low-Light Vision",
    "minLevel":1,
    "specialAbilityType":"ex",
    "description":"The barbarian's senses sharpen and she gains low-light vision while raging."
  },
  { 
    "name":"Mighty Swing",
    "minLevel":12,
    "specialAbilityType":"ex",
    "description":"The barbarian automatically confirms a critical hit. This power is used as an immediate action once a critical threat has been determined. A barbarian must be at least 12th level before selecting this power. This power can only be used once per rage."
  },
  { 
    "name":"Moment of Clarity",
    "minLevel":1,
    "specialAbilityType":"ex",
    "description":"The barbarian does not gain any benefits or take any of the penalties from rage for 1 round. Activating this power is a swift action. This includes the penalty to Armor Class and the restriction on what actions can be performed. This round still counts against her total number of rounds of rage per day. This power can only be used once per rage."
  },
  { 
    "name":"Night Vision",
    "minLevel":1,
    "prerequisite":"Low-Light Vision",
    "specialAbilityType":"ex",
    "description":"The barbarian's senses grow incredibly sharp while raging and she gains darkvision 60 feet. A barbarian must have low-light vision as a rage power or a racial trait to select this rage power."
  },
  { 
    "name":"No Escape",
    "minLevel":1,
    "specialAbilityType":"ex",
    "description":"The barbarian can move up to double her normal speed as an immediate action but she can only use this ability when an adjacent foe uses a withdraw action to move away from her. She must end her movement adjacent to the enemy that used the withdraw action. The barbarian provokes attacks of opportunity as normal during this movement. This power can only be used once per rage."
  },
  { 
    "name":"Powerful Blow",
    "minLevel":1,
    "specialAbilityType":"ex",
    "description":"The barbarian gains a +1 bonus on a single damage roll. This bonus increases by +1 for every 4 levels the barbarian has attained. This power is used as a swift action before the roll to hit is made. This power can only be used once per rage."
  },
  { 
    "name":"Quick Reflexes",
    "minLevel":1,
    "specialAbilityType":"ex",
    "description":"While raging, the barbarian can make one additional attack of opportunity per round."
  },
  { 
    "name":"Raging Climber",
    "minLevel":1,
    "specialAbilityType":"ex",
    "description":"When raging, the barbarian adds her level as an enhancement bonus on all Climb skill checks."
  },
  { 
    "name":"Raging Leaper",
    "minLevel":1,
    "specialAbilityType":"ex",
    "description":"When raging, the barbarian adds her level as an enhancement bonus on all Acrobatics skill checks made to jump. When making a jump in this way, the barbarian is always considered to have a running start."
  },
  { 
    "name":"Raging Swimmer",
    "minLevel":1,
    "specialAbilityType":"ex",
    "description":"When raging, the barbarian adds her level as an enhancement bonus on all Swim skill checks."
  },
  { 
    "name":"Renewed Vigor",
    "minLevel":4,
    "specialAbilityType":"ex",
    "description":"As a standard action, the barbarian heals 1d8 points of damage + her Constitution modifier. For every four levels the barbarian has attained above 4th, this amount of damage healed increases by 1d8, to a maximum of 5d8 at 20th level. A barbarian must be at least 4th level before selecting this power. This power can be used only once per day and only while raging."
  },
  { 
    "name":"Rolling Dodge",
    "minLevel":1,
    "specialAbilityType":"ex",
    "description":"The barbarian gains a +1 dodge bonus to her Armor Class against ranged attacks for a number of rounds equal to the barbarian's current Constitution modifier (minimum 1). This bonus increases by +1 for every 6 levels the barbarian has attained. Activating this ability is a move action that does not provoke an attack of opportunity."
  },
  { 
    "name":"Roused Anger",
    "minLevel":1,
    "specialAbilityType":"ex",
    "description":"The barbarian may enter a rage even if fatigued. While raging after using this ability, the barbarian is immune to the fatigued condition. Once this rage ends, the barbarian is exhausted for 10 minutes per round spent raging."
  },
  { 
    "name":"Scent",
    "minLevel":1,
    "specialAbilityType":"ex",
    "description":"The barbarian gains the scent ability while raging and can use this ability to locate unseen foes (see Special Abilities for rules on the scent ability)."
  },
  { 
    "name":"Strength Surge",
    "minLevel":1,
    "specialAbilityType":"ex",
    "description":"The barbarian adds her barbarian level on one Strength check or combat maneuver check, or to her Combat Maneuver Defense when an opponent attempts a maneuver against her. This power is used as an immediate action. This power can only be used once per rage."
  },
  { 
    "name":"Superstition",
    "minLevel":1,
    "specialAbilityType":"ex",
    "description":"The barbarian gains a +2 morale bonus on saving throws made to resist spells, supernatural abilities, and spell-like abilities. This bonus increases by +1 for every 4 levels the barbarian has attained. While raging, the barbarian cannot be a willing target of any spell and must make saving throws to resist all spells, even those cast by allies."
  },
  { 
    "name":"Surprise Accuracy",
    "minLevel":1,
    "specialAbilityType":"ex",
    "description":"The barbarian gains a +1 morale bonus on one attack roll. This bonus increases by +1 for every 4 levels the barbarian has attained. This power is used as a swift action before the roll to hit is made. This power can only be used once per rage."
  },
  { 
    "name":"Swift Foot",
    "minLevel":1,
    "multipleSelection":true,
    "specialAbilityType":"ex",
    "description":"The barbarian gains a 5-foot enhancement bonus to her speed. This increase is always active while the barbarian is raging. A barbarian can select this rage power up to three times. Its effects stack. "
  },
  { 
    "name":"Terrifying Howl",
    "minLevel":8,
    "prerequisite": "Intimidating Glare",
    "specialAbilityType":"ex",
    "description":"The barbarian unleashes a terrifying howl as a standard action. All shaken enemies within 30 feet must make a Will save (DC equal to 10 + 1/2 the barbarian's level + the barbarian's Strength modifier) or be panicked for 1d4+1 rounds. Once an enemy has made a save versus terrifying howl (successful or not), it is immune to this power for 24 hours. A barbarian must have the intimidating glare rage power to select this rage power. A barbarian must be at least 8th level before selecting this power."
  },
  { 
    "name":"Unexpected Strike",
    "minLevel":8,
    "specialAbilityType":"ex",
    "description":"The barbarian can make an attack of opportunity against a foe that moves into any square threatened by the barbarian, regardless of whether or not that movement would normally provoke an attack of opportunity. This power can only be used once per rage. A barbarian must be at least 8th level before selecting this power."
  }
];

const barbarianSpecialAbilities = [
  {
      name: 'Weapon and Armor Proficiency',
      specialAbilityType: 'ex',
      description: "A barbarian is proficient with all simple and martial weapons, light armor, medium armor, and shields (except tower shields)."
  },
  {
      name: 'Fast Movement',
      specialAbilityType: 'ex',
      description: "A barbarian's land speed is faster than the norm for her race by +10 feet. This benefit applies only when she is wearing no armor, light armor, or medium armor, and not carrying a heavy load. Apply this bonus before modifying the barbarian's speed because of any load carried or armor worn. This bonus stacks with any other bonuses to the barbarian's land speed.",
      statSection: StatSections.SPEED,
      fieldToUpdate: 'speed'
  },
  {
      name: 'Rage',
      specialAbilityType: 'ex',
      description: `A barbarian can call upon inner reserves of strength and ferocity, granting her additional combat prowess. Starting at 1st level, a barbarian can rage for a number of rounds per day equal to 4 + her Constitution modifier. At each level after 1st, she can rage for 2 additional rounds. Temporary increases to Constitution, such as those gained from rage and spells like bear's endurance, do not increase the total number of rounds that a barbarian can rage per day. A barbarian can enter rage as a free action. The total number of rounds of rage per day is renewed after resting for 8 hours, although these hours do not need to be consecutive.

      While in rage, a barbarian gains a +4 morale bonus to her Strength and Constitution, as well as a +2 morale bonus on Will saves. In addition, she takes a –2 penalty to Armor Class. The increase to Constitution grants the barbarian 2 hit points per Hit Dice, but these disappear when the rage ends and are not lost first like temporary hit points. While in rage, a barbarian cannot use any Charisma-, Dexterity-, or Intelligence-based skills (except Acrobatics, Fly, Intimidate, and Ride) or any ability that requires patience or concentration.
      
      A barbarian can end her rage as a free action and is fatigued after rage for a number of rounds equal to 2 times the number of rounds spent in the rage. A barbarian cannot enter a new rage while fatigued or exhausted but can otherwise enter rage multiple times during a single encounter or combat. If a barbarian falls unconscious, her rage immediately ends, placing her in peril of death.`
  },
  {
      name: 'Rage Powers',
      specialAbilityType: 'ex',
      selection: 'ragePowers',
      description: "As a barbarian gains levels, she learns to use her rage in new ways. Starting at 2nd level, a barbarian gains a rage power. She gains another rage power for every two levels of barbarian attained after 2nd level. A barbarian gains the benefits of rage powers only while raging, and some of these powers require the barbarian to take an action first. Unless otherwise noted, a barbarian cannot select an individual power more than once."
  },
  { 
      "name":"Uncanny Dodge",
      "specialAbilityType":"ex",
      "description":"At 2nd level, a barbarian gains the ability to react to danger before her senses would normally allow her to do so. She cannot be caught flat-footed, even if the attacker is invisible. She still loses her Dexterity bonus to AC if immobilized. A barbarian with this ability can still lose her Dexterity bonus to AC if an opponent successfully uses the feint action against her. If a barbarian already has uncanny dodge from a different class, she automatically gains improved uncanny dodge (see below) instead."
  },
  { 
      "name":"Trap Sense",
      "specialAbilityType":"ex",
      "description":"At 3rd level, a barbarian gains a +1 bonus on Reflex saves made to avoid traps and a +1 dodge bonus to AC against attacks made by traps. These bonuses increase by +1 every three barbarian levels thereafter (6th, 9th, 12th, 15th, and 18th level). Trap sense bonuses gained from multiple classes stack."
  },
  { 
      "name":"Improved Uncanny Dodge",
      "specialAbilityType":"ex",
      "description":"At 5th level and higher, a barbarian can no longer be flanked. This defense denies a rogue the ability to sneak attack the barbarian by flanking her, unless the attacker has at least four more rogue levels than the target has barbarian levels. If a character already has uncanny dodge (see above) from another class, the levels from the classes that grant uncanny dodge stack to determine the minimum rogue level required to flank the character."
  },
  { 
      "name":"Damage Reduction",
      "specialAbilityType":"ex",
      "description":"At 7th level, a barbarian gains damage reduction. Subtract 1 from the damage the barbarian takes each time she is dealt damage from a weapon or a natural attack. At 10th level, and every three barbarian levels thereafter (13th, 16th, and 19th level), this damage reduction rises by 1 point. Damage reduction can reduce damage to 0 but not below 0.",
      statSection: StatSections.DEFENSIVE_ABILITIES,
      fieldToUpdate: 'dr'
  },
  { 
      "name":"Greater Rage",
      "specialAbilityType":"ex",
      "description":"At 11th level, when a barbarian enters rage, the morale bonus to her Strength and Constitution increases to +6 and the morale bonus on her Will saves increases to +3."
  },
  { 
      "name":"Indomitable Will",
      "specialAbilityType":"ex",
      "description":"While in rage, a barbarian of 14th level or higher gains a +4 bonus on Will saves to resist enchantment spells. This bonus stacks with all other modifiers, including the morale bonus on Will saves she also receives during her rage.",
      statSection: StatSections.WILLSAVE,
      fieldToUpdate: 'will'
  },
  { 
      "name":"Tireless Rage",
      "specialAbilityType":"ex",
      "description":"Starting at 17th level, a barbarian no longer becomes fatigued at the end of her rage."
  },
  { 
      "name":"Mighty Rage",
      "specialAbilityType":"ex",
      "description":"At 20th level, when a barbarian enters rage, the morale bonus to her Strength and Constitution increases to +8 and the morale bonus on her Will saves increases to +4."
  }
];
const barbarian = {
    name: 'barbarian',
    abbreviation: 'bbn',
    alignment: 'non-lawful',
    hitDieType: 12,
    classSkills: [ "Acrobatics", "Climb", "Craft", "Handle Animal", "Intimidate", "Knowledge (nature)", "Perception", "Ride", "Survival", "Swim"],
    skillRanksPerLevel: 4,
    "base_attack_bonus": "fast",  //might like a different format  for the key but this matches creatureStatsByType
    "good_saving_throws": ["Fort"], //might like a different format  for the key but this matches creatureStatsByType
    ragePowers: barbarianRagePowers,
    specialAbilities: barbarianSpecialAbilities,
    advancement: barbarianAdvancement,
    levels: [
        {
          level: 1, 
          classAbilities: ['Fast Movement', 'Rage', 'Weapon and Armor Proficiency'],
        },
        {
          level: 2,
          classAbilities: ['Rage Powers', 'Uncanny Dodge']
        },
        {
          level: 3,
          classAbilities: ['Trap Sense'] // +1 per 3 levels
        },
        {
          level: 4,
          classAbilities: ['Rage Powers']
        },
        {
          level: 5,
          classAbilities: ['Improved Uncanny Dodge']
        },
        {
          level: 6,
          classAbilities: ['Rage Powers'] //also trap sense +2...but I am thinking we can make trap sense handle progression on its own
        },
        {
          level: 7,
          classAbilities: ['Damage Reduction'] //+1 per 3 levels 7,10,13,16,19like trap sense this levels up a predetermined interval of barbarian levels
        },
        {
          level: 8,
          classAbilities: ['Rage Powers']
        },
        {
          level: 9,
          classAbilities: [] //trap sense + 3
        },
        {
          level: 10,
          classAbilities: ['Rage Powers'] //Damage Reduction 2/-
        },
        {
          level: 11,
          classAbilities: ['Greater Rage']
        },
        {
          level: 12,
          classAbilities: ['Rage Powers'] //trap sense +4
        },
        {
          level: 13,
          classAbilities: [] //DR 3/-
        },
        {
          level: 14,
          classAbilities: ['Indomitable Will', 'Rage Powers']
        },
        {
          level: 15,
          classAbilities: [] //trap sense +5
        },
        {
          level: 16,
          classAbilities: ['Rage Powers'] //DR 4/-
        },
        {
          level: 17,
          classAbilities: ['Tireless Rage']
        },
        {
          level: 18,
          classAbilities: ['Rage Powers'] //trap sense +6
        },
        {
          level: 19,
          classAbilities: [] //DR 5/-
        },
        {
          level: 20,
          classAbilities: ['Mighty Rage', 'Rage Powers']
        }
    ]
};

export default barbarian;