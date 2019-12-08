import creatureStatsByType from "../../components/PathfinderMonsterAdvancer/AdvancementTools/creatureStatsByType";
import { exception } from "react-ga";
//creatureStatsByType gives a lot of this information in a fixed format...we'll have to match things up eventually.
const barbarian = {
    alignment: 'non-lawful',
    hitDieType: 12,
    classSkills: [],
    skillRanksPerLevel: 4,
    "base_attack_bonus": "fast",  //might like a different format  for the key but this matches creatureStatsByType
    "good_saving_throws": ["Fort"], //might like a different format  for the key but this matches creatureStatsByType
    levels: [
        {
            level: 1, 
            classAbilities: ['Fast Movement', 'Rage', 'Weapon and Armor Proficiency'],
        }
    ]
};

const barbarianRagePowers = [
    {
        'Animal Fury': {
            minLevel: 1,
            specialAbilityType: 'ex',
            description: `While raging, the barbarian gains a bite attack. If used as part of a full attack action, the bite attack is made at the barbarian's full base attack bonus –5. If the bite hits, it deals 1d4 points of damage (assuming the barbarian is Medium; 1d3 points of damage if Small) plus half the barbarian's Strength modifier. A barbarian can make a bite attack as part of the action to maintain or break free from a grapple. This attack is resolved before the grapple check is made. If the bite attack hits, any grapple checks made by the barbarian against the target this round are at a +2 bonus.`
        },
        'Clear Mind': {
            minLevel: 8,
            specialAbilityType: 'ex',
            description: `A barbarian may reroll a failed Will save. This power is used as an immediate action after the first save is attempted, but before the results are revealed by the GM. The barbarian must take the second result, even if it is worse. A barbarian must be at least 8th level before selecting this power. This power can only be used once per rage.`
        },
        'Fearless Rage': {
            minLevel: 12,
            specialAbilityType: 'ex',
            description: `While raging, the barbarian is immune to the shaken and frightened conditions. A barbarian must be at least 12th level before selecting this rage power.`
        },
        'Guarded Stance': {
            minLevel: 1,
            specialAbilityType: 'ex',
            description: `The barbarian gains a +1 dodge bonus to her Armor Class against melee attacks for a number of rounds equal to the barbarian's current Constitution modifier (minimum 1). This bonus increases by +1 for every 6 levels the barbarian has attained. Activating this ability is a move action that does not provoke an attack of opportunity.`
        },
        'Increased Damage Reduction': {
            minLevel: 8,
            specialAbilityType: 'ex',
            description: `The barbarian's damage reduction increases by 1/—. This increase is always active while the barbarian is raging. A barbarian can select this rage power up to three times. Its effects stack. A barbarian must be at least 8th level before selecting this rage power.`
        },
        'Internal Fortitude': {
            minLevel: 8,
            specialAbilityType: 'ex',
            description: `While raging, the barbarian is immune to the sickened and nauseated conditions. A barbarian must be at least 8th level before selecting this rage power.`
        },
        'Intimidating Glare': {
            minLevel: 1,
            specialAbilityType: 'ex',
            description: `The barbarian can make an Intimidate check against one adjacent foe as a move action. If the barbarian successfully demoralizes her opponent, the foe is shaken for 1d4 rounds + 1 round for every 5 points by which the barbarian's check exceeds the DC.`
        },
        'Knockback': {
            minLevel: 1,
            specialAbilityType: 'ex',
            description: `Once per round, the barbarian can make a bull rush attempt against one target in place of a melee attack. If successful, the target takes damage equal to the barbarian's Strength modifier and is moved back as normal. The barbarian does not need to move with the target if successful. This does not provoke an attack of opportunity.`
        },
        'Low-Light Vision': {
            minLevel: 1,
            specialAbilityType: 'ex',
            description: `The barbarian's senses sharpen and she gains low-light vision while raging.`
        },
        'Mighty Swing': {
            minLevel: 12,
            specialAbilityType: 'ex',
            description: `The barbarian automatically confirms a critical hit. This power is used as an immediate action once a critical threat has been determined. A barbarian must be at least 12th level before selecting this power. This power can only be used once per rage.`
        },
        'Moment of Clarity': {
            minLevel: 1,
            specialAbilityType: 'ex',
            description: `The barbarian does not gain any benefits or take any of the penalties from rage for 1 round. Activating this power is a swift action. This includes the penalty to Armor Class and the restriction on what actions can be performed. This round still counts against her total number of rounds of rage per day. This power can only be used once per rage.`
        },
        'Night Vision': {
            minLevel: 1,
            prerequisite: 'Low-Light Vision',
            specialAbilityType: 'ex',
            description: `The barbarian's senses grow incredibly sharp while raging and she gains darkvision 60 feet. A barbarian must have low-light vision as a rage power or a racial trait to select this rage power.`
        },
        'No Escape': {
            minLevel: 1,
            specialAbilityType: 'ex',
            description: `The barbarian can move up to double her normal speed as an immediate action but she can only use this ability when an adjacent foe uses a withdraw action to move away from her. She must end her movement adjacent to the enemy that used the withdraw action. The barbarian provokes attacks of opportunity as normal during this movement. This power can only be used once per rage.`
        },
        'Powerful Blow': {
            minLevel: 1,
            specialAbilityType: 'ex',
            description: `The barbarian gains a +1 bonus on a single damage roll. This bonus increases by +1 for every 4 levels the barbarian has attained. This power is used as a swift action before the roll to hit is made. This power can only be used once per rage.`
        },
        'Quick Reflexes': {
            minLevel: 1,
            specialAbilityType: 'ex',
            description: `While raging, the barbarian can make one additional attack of opportunity per round.`
        },
        'Raging Climber': {
            minLevel: 1,
            specialAbilityType: 'ex',
            description: `When raging, the barbarian adds her level as an enhancement bonus on all Climb skill checks.`
        },
        'Raging Leaper': {
            minLevel: 1,
            specialAbilityType: 'ex',
            description: `When raging, the barbarian adds her level as an enhancement bonus on all Acrobatics skill checks made to jump. When making a jump in this way, the barbarian is always considered to have a running start.`
        },
        'Raging Swimmer': {
            minLevel: 1,
            specialAbilityType: 'ex',
            description: `When raging, the barbarian adds her level as an enhancement bonus on all Swim skill checks.`
        },

    }
];

const barbarianSpecialAbilities = {
    'Weapon and Armor Proficiency': {
        specialAbilityType: 'ex',
        description: `A barbarian is proficient with all simple and martial weapons, light armor, medium armor, and shields (except tower shields).`
    },
    'Fast Movement': {
        specialAbilityType: 'ex',
        description: `A barbarian's land speed is faster than the norm for her race by +10 feet. This benefit applies only when she is wearing no armor, light armor, or medium armor, and not carrying a heavy load. Apply this bonus before modifying the barbarian's speed because of any load carried or armor worn. This bonus stacks with any other bonuses to the barbarian's land speed.`
    },
    'Rage': {
        specialAbilityType: 'ex',
        description: `A barbarian can call upon inner reserves of strength and ferocity, granting her additional combat prowess. Starting at 1st level, a barbarian can rage for a number of rounds per day equal to 4 + her Constitution modifier. At each level after 1st, she can rage for 2 additional rounds. Temporary increases to Constitution, such as those gained from rage and spells like bear's endurance, do not increase the total number of rounds that a barbarian can rage per day. A barbarian can enter rage as a free action. The total number of rounds of rage per day is renewed after resting for 8 hours, although these hours do not need to be consecutive.

        While in rage, a barbarian gains a +4 morale bonus to her Strength and Constitution, as well as a +2 morale bonus on Will saves. In addition, she takes a –2 penalty to Armor Class. The increase to Constitution grants the barbarian 2 hit points per Hit Dice, but these disappear when the rage ends and are not lost first like temporary hit points. While in rage, a barbarian cannot use any Charisma-, Dexterity-, or Intelligence-based skills (except Acrobatics, Fly, Intimidate, and Ride) or any ability that requires patience or concentration.
        
        A barbarian can end her rage as a free action and is fatigued after rage for a number of rounds equal to 2 times the number of rounds spent in the rage. A barbarian cannot enter a new rage while fatigued or exhausted but can otherwise enter rage multiple times during a single encounter or combat. If a barbarian falls unconscious, her rage immediately ends, placing her in peril of death.`
    },
    'Rage Powers': {
        specialAbilityType: 'ex',
        description: `As a barbarian gains levels, she learns to use her rage in new ways. Starting at 2nd level, a barbarian gains a rage power. She gains another rage power for every two levels of barbarian attained after 2nd level. A barbarian gains the benefits of rage powers only while raging, and some of these powers require the barbarian to take an action first. Unless otherwise noted, a barbarian cannot select an individual power more than once.`
    },
}

const incompleteBarbarianRagePowers = [ 
    { 
      "name":"Renewed Vigor",
      "specialAbilityType":"ex",
      "description":"As a standard action, the barbarian heals 1d8 points of damage + her Constitution modifier. For every four levels the barbarian has attained above 4th, this amount of damage healed increases by 1d8, to a maximum of 5d8 at 20th level. A barbarian must be at least 4th level before selecting this power. This power can be used only once per day and only while raging."
    },
    { 
      "name":"Rolling Dodge",
      "specialAbilityType":"ex",
      "description":"The barbarian gains a +1 dodge bonus to her Armor Class against ranged attacks for a number of rounds equal to the barbarian's current Constitution modifier (minimum 1). This bonus increases by +1 for every 6 levels the barbarian has attained. Activating this ability is a move action that does not provoke an attack of opportunity."
    },
    { 
      "name":"Roused Anger",
      "specialAbilityType":"ex",
      "description":"The barbarian may enter a rage even if fatigued. While raging after using this ability, the barbarian is immune to the fatigued condition. Once this rage ends, the barbarian is exhausted for 10 minutes per round spent raging."
    },
    { 
      "name":"Scent",
      "specialAbilityType":"ex",
      "description":"The barbarian gains the scent ability while raging and can use this ability to locate unseen foes (see Special Abilities for rules on the scent ability)."
    },
    { 
      "name":"Strength Surge",
      "specialAbilityType":"ex",
      "description":"The barbarian adds her barbarian level on one Strength check or combat maneuver check, or to her Combat Maneuver Defense when an opponent attempts a maneuver against her. This power is used as an immediate action. This power can only be used once per rage."
    },
    { 
      "name":"Superstition",
      "specialAbilityType":"ex",
      "description":"The barbarian gains a +2 morale bonus on saving throws made to resist spells, supernatural abilities, and spell-like abilities. This bonus increases by +1 for every 4 levels the barbarian has attained. While raging, the barbarian cannot be a willing target of any spell and must make saving throws to resist all spells, even those cast by allies."
    },
    { 
      "name":"Surprise Accuracy",
      "specialAbilityType":"ex",
      "description":"The barbarian gains a +1 morale bonus on one attack roll. This bonus increases by +1 for every 4 levels the barbarian has attained. This power is used as a swift action before the roll to hit is made. This power can only be used once per rage."
    },
    { 
      "name":"Swift Foot",
      "specialAbilityType":"ex",
      "description":"The barbarian gains a 5-foot enhancement bonus to her speed. This increase is always active while the barbarian is raging. A barbarian can select this rage power up to three times. Its effects stack. "
    },
    { 
      "name":"Terrifying Howl",
      "specialAbilityType":"ex",
      "description":"The barbarian unleashes a terrifying howl as a standard action. All shaken enemies within 30 feet must make a Will save (DC equal to 10 + 1/2 the barbarian's level + the barbarian's Strength modifier) or be panicked for 1d4+1 rounds. Once an enemy has made a save versus terrifying howl (successful or not), it is immune to this power for 24 hours. A barbarian must have the intimidating glare rage power to select this rage power. A barbarian must be at least 8th level before selecting this power."
    },
    { 
      "name":"Unexpected Strike",
      "specialAbilityType":"ex",
      "description":"The barbarian can make an attack of opportunity against a foe that moves into any square threatened by the barbarian, regardless of whether or not that movement would normally provoke an attack of opportunity. This power can only be used once per rage. A barbarian must be at least 8th level before selecting this power."
    }
  ]
export default barbarian;