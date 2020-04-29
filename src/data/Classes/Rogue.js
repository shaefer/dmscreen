import advancement from '../../components/ClassLevels/RogueAdvancement';

const rogueTalents = [
  {
      "description": "A rogue with this ability can cause living opponents to bleed by hitting them with a sneak attack. This attack causes the target to take 1 additional point of damage each round for each die of the rogue's sneak attack (e.g., 4d6 equals 4 points of bleed). Bleeding creatures take that amount of damage every round at the start of each of their turns. The bleeding can be stopped by a DC 15 Heal check or the application of any effect that heals hit point damage. Bleeding damage from this ability does not stack with itself. Bleeding damage bypasses any damage reduction the creature might possess.", 
      "name": "Bleeding Attack*", 
      "source": "Core Rulebook",
      "specialAbilityType":"ex", 
  }, 
  {
      "description": "A rogue that selects this talent gains a bonus combat feat (see Feats).", 
      "name": "Combat Trick", 
      "source": "Core Rulebook",
      //subselection
  }, 
  {
      "description": "This ability allows a rogue to move at full speed using the Stealth skill without penalty.", 
      "name": "Fast Stealth", 
      "source": "Core Rulebook", 
      "specialAbilityType":"ex",
  }, 
  {
      "description": "A rogue that selects this talent gains Weapon Finesse as a bonus feat.", 
      "name": "Finesse Rogue", 
      "source": "Core Rulebook", 
      "specialAbilityType":"ex",
  }, 
  {
      "description": "This ability allows a rogue to move along narrow surfaces at full speed using the Acrobatics skill without penalty. In addition, a rogue with this talent is not flat-footed when using Acrobatics to move along narrow surfaces.", 
      "name": "Ledge Walker", 
      "source": "Core Rulebook", 
      "specialAbilityType":"ex",
  }, 
  {
      "description": "A rogue with this talent gains the ability to cast a 1st-level spell from the sorcerer/wizard spell list two times a day as a spell-like ability. The caster level for this ability is equal to the rogue's level. The save DC for this spell is 11 + the rogue's Intelligence modifier. The rogue must have an Intelligence of at least 11 to select this talent. A rogue must have the minor magic rogue talent before choosing this talent.", 
      "name": "Major Magic", 
      "source": "Core Rulebook", 
      "specialAbilityType":"sp",
  }, 
  {
      "description": "A rogue with this talent gains the ability to cast a 0-level spell from the sorcerer/wizard spell list. This spell can be cast three times a day as a spell-like ability. The caster level for this ability is equal to the rogue's level. The save DC for this spell is 10 + the rogue's Intelligence modifier. The rogue must have an Intelligence of at least 10 to select this talent.", 
      "name": "Minor Magic", 
      "source": "Core Rulebook", 
      "specialAbilityType":"sp",
  }, 
  {
      "description": "It takes a rogue with this ability half the normal amount of time to disable a trap using the Disable Device skill (minimum 1 round).", 
      "name": "Quick Disable", 
      "source": "Core Rulebook", 
      "specialAbilityType":"ex",
  }, 
  {
      "description": "Once per day, a rogue with this ability can gain a number of temporary hit points equal to the rogue's level. Activating this ability is an immediate action that can only be performed when she is brought to below 0 hit points. This ability can be used to prevent her from dying. These temporary hit points last for 1 minute. If the rogue's hit points drop below 0 due to the loss of these temporary hit points, she falls unconscious and is dying as normal.", 
      "name": "Resiliency", 
      "source": "Core Rulebook", 
      "specialAbilityType":"ex",
  }, 
  {
      "description": "While prone, a rogue with this ability can move at half speed. This movement provokes attacks of opportunity as normal. A rogue with this talent can take a 5-foot step while crawling.", 
      "name": "Rogue Crawl", 
      "source": "Core Rulebook", 
      "specialAbilityType":"ex",
  }, 
  {
      "description": "Opponents damaged by the rogue's sneak attack can't make attacks of opportunity for 1 round.", 
      "name": "Slow Reactions*", 
      "source": "Core Rulebook", 
      "specialAbilityType":"ex",
  }, 
  {
      "description": "A rogue with this ability can stand up from a prone position as a free action. This still provokes attacks of opportunity for standing up while threatened by a foe.", 
      "name": "Stand Up", 
      "source": "Core Rulebook", 
      "specialAbilityType":"ex",
  }, 
  {
      "description": "During the surprise round, opponents are always considered flat-footed to a rogue with this ability, even if they have already acted. ", 
      "name": "Surprise Attack", 
      "source": "Core Rulebook", 
      "specialAbilityType":"ex",
  }, 
  {
      "description": "Whenever a rogue with this talent comes within 10 feet of a trap, she receives an immediate Perception skill check to notice the trap. This check should be made in secret by the GM.", 
      "name": "Trap Spotter", 
      "source": "Core Rulebook", 
      "specialAbilityType":"ex",
  }, 
  {
      "description": "A rogue that selects this talent gains Weapon Focus as a bonus feat.", 
      "name": "Weapon Training", 
      "source": "Core Rulebook", 
      "specialAbilityType":"ex",
  },
  {
      "description": "A rogue with this ability can sneak attack opponents with such precision that her blows weaken and hamper them. An opponent damaged by one of her sneak attacks also takes 2 points of Strength damage.", 
      "name": "Crippling Strike", 
      "source": "Core Rulebook", 
      "specialAbilityType":"ex",
      "advancedTalent": true,
      "minLevel": 10,
      fieldToUpdate: 'acquiredSpecialAttacks'
  }, 
  {
      "description": "With this advanced talent, the rogue can roll with a potentially lethal blow to take less damage from it than she otherwise would. Once per day, when she would be reduced to 0 or fewer hit points by damage in combat (from a weapon or other blow, not a spell or special ability), the rogue can attempt to roll with the damage. To use this ability, the rogue must attempt a Reflex saving throw (DC = damage dealt). If the save succeeds, she takes only half damage from the blow; if it fails, she takes full damage. She must be aware of the attack and able to react to it in order to execute her defensive roll&mdash;if she is denied her Dexterity bonus to AC, she can't use this ability. Since this effect would not normally allow a character to make a Reflex save for half damage, the rogue's evasion ability does not apply to the defensive roll.", 
      "name": "Defensive Roll", 
      "source": "Core Rulebook", 
      "specialAbilityType":"ex",
      "advancedTalent": true,
      "minLevel": 10,
  }, 
  {
      "description": ", targeting the lowest-level spell effect active on the target. The caster level for this ability is equal to the rogue's level. A rogue must have the major magic rogue talent before choosing dispelling attack.", 
      "name": "Dispelling Attack", 
      "source": "Core Rulebook", 
      "specialAbilityType":"su",
      "advancedTalent": true,
      "minLevel": 10,
  }, 
  {
      "description": "This works like evasion, except that while the rogue still takes no damage on a successful Reflex saving throw against attacks, she henceforth takes only half damage on a failed save. A helpless rogue does not gain the benefit of improved evasion.", 
      "name": "Improved Evasion", 
      "source": "Core Rulebook", 
      "specialAbilityType":"ex",
      "advancedTalent": true,
      "minLevel": 10,
      fieldToUpdate: ['defensive_abilities']
  }, 
  {
      "description": "Once per round, the rogue can make an attack of opportunity against an opponent who has just been struck for damage in melee by another character. This attack counts as an attack of opportunity for that round. Even a rogue with the Combat Reflexes feat can't use the opportunist ability more than once per round.", 
      "name": "Opportunist", 
      "source": "Core Rulebook", 
      "specialAbilityType":"ex",
      "advancedTalent": true,
      "minLevel": 10,
  }, 
  {
      "description": "The rogue becomes so confident in the use of certain skills that she can use them reliably even under adverse conditions.Upon gaining this ability, she selects a number of skills equal to 3 + her Intelligence modifier. When making a skill check with one of these skills, she may take 10 even if stress and distractions would normally prevent her from doing so. A rogue may gain this special ability multiple times, selecting additional skills for skill mastery to apply to each time.", 
      "name": "Skill Mastery", 
      "source": "Core Rulebook", 
      "specialAbilityType":"ex",
      "advancedTalent": true,
      "minLevel": 10,
  }, 
  {
      "description": "This ability represents the rogue's ability to wriggle free from magical effects that would otherwise control or compel her. If a rogue with slippery mind is affected by an enchantment spell or effect and fails her saving throw, she can attempt it again 1 round later at the same DC. She gets only this one extra chance to succeed on her saving throw.", 
      "name": "Slippery Mind", 
      "source": "Core Rulebook", 
      "specialAbilityType":"ex",
      "advancedTalent": true,
      "minLevel": 10,
  }, 
  {
      "description": "A rogue may gain any feat that she qualifies for in place of a rogue talent.", 
      "name": "Feat", 
      "source": "Core Rulebook", 
      "advancedTalent": true,
      "minLevel": 10,
  }
]

const specialAbilities = [
  {
      "description": "Rogues are proficient with all simple weapons, plus the hand crossbow, rapier, sap, shortbow, and short sword. They are proficient with light armor, but not with shields.", 
      "source": "Core Rulebook", 
      "name": "Weapon and Armor Proficiency"
  }, 
  {
      "description": "If a rogue can catch an opponent when he is unable to defend himself effectively from her attack, she can strike a vital spot for extra damage.The rogue's attack deals extra damage anytime her target would be denied a Dexterity bonus to AC (whether the target actually has a Dexterity bonus or not), or when the rogue flanks her target. This extra damage is 1d6 at 1st level, and increases by 1d6 every two rogue levels thereafter. Should the rogue score a critical hit with a sneak attack, this extra damage is not multiplied. Ranged attacks can count as sneak attacks only if the target is within 30 feet.With a weapon that deals nonlethal damage (like a sap, whip, or an unarmed strike), a rogue can make a sneak attack that deals nonlethal damage instead of lethal damage. She cannot use a weapon that deals lethal damage to deal nonlethal damage in a sneak attack, not even with the usual &ndash;4 penalty.The rogue must be able to see the target well enough to pick out a vital spot and must be able to reach such a spot. A rogue cannot sneak attack while striking a creature with concealment.", 
      "name": "Sneak Attack", 
      "source": "Core Rulebook",
      "specialAbilityType":"ex",
      fieldToUpdate: 'acquiredSpecialAttacks'
  }, 
  {
      "description": "A rogue adds 1/2 her level to Perception skill checks made to locate traps and to Disable Device skill checks (minimum +1). A rogue can use Disable Device to disarm magic traps.", 
      "name": "Trapfinding", 
      "source": "Core Rulebook",
      "specialAbilityType":"ex",
  }, 
  {
      "description": "At 2nd level and higher, a rogue can avoid even magical and unusual attacks with great agility. If she makes a successful Reflex saving throw against an attack that normally deals half damage on a successful save, she instead takes no damage. Evasion can be used only if the rogue is wearing light armor or no armor. A helpless rogue does not gain the benefit of evasion.", 
      "name": "Evasion", 
      "specialAbilityType":"ex",
      fieldToUpdate: ['defensive_abilities']
  }, 
  {
      "description": "As a rogue gains experience, she learns a number of talents that aid her and confound her foes. Starting at 2nd level, a rogue gains one rogue talent. She gains an additional rogue talent for every 2 levels of rogue attained after 2nd level. A rogue cannot select an individual talent more than once.Talents marked with an asterisk add effects to a rogue's sneak attack. Only one of these talents can be applied to an individual attack and the decision must be made before the attack roll is made. ", 
      "name": "Rogue Talents", 
      "specialAbilityType":"ex",
      isParent: true,
  }, 
  {
      "description": "",
      "name": "Rogue Talent Selection",
      "selection": 'rogueTalents',
      "selectionLevelRestrictions": true,
      parentName: "Rogue Talents"
  },
  {
    "description": "",
    "name": "Advanced Rogue Talent Selection",
    "selection": 'rogueTalents',
    "selectionLevelRestrictions": true,
    parentName: "Advanced Rogue Talents"
},
  {
      "description": "At 3rd level, a rogue gains an intuitive sense that alerts her to danger from traps, giving her a +1 bonus on Reflex saves made to avoid traps and a +1 dodge bonus to AC against attacks made by traps. These bonuses rise to +2 when the rogue reaches 6th level, to +3 when she reaches 9th level, to +4 when she reaches 12th level, to +5 at 15th, and to +6 at 18th level.Trap sense bonuses gained from multiple classes stack.", 
      "name": "Trap Sense", 
      "specialAbilityType":"ex",
      fieldToUpdate: ['defensive_abilities']
  }, 
  {
      "description": "Starting at 4th level, a rogue can react to danger before her senses would normally allow her to do so. She cannot be caught flat-footed, nor does she lose her Dex bonus to AC if the attacker is invisible. She still loses her Dexterity bonus to AC if immobilized. A rogue with this ability can still lose her Dexterity bonus to AC if an opponent successfully uses the feint action (see Combat) against her.If a rogue already has uncanny dodge from a different class, she automatically gains improved uncanny dodge (see below) instead.", 
      "name": "Uncanny Dodge", 
      "specialAbilityType":"ex",
      fieldToUpdate: ['defensive_abilities']
  }, 
  {
      "description": "A rogue of 8th level or higher can no longer be flanked.This defense denies another rogue the ability to sneak attack the character by flanking her, unless the attacker has at least four more rogue levels than the target does.If a character already has uncanny dodge (see above) from another class, the levels from the classes that grant uncanny dodge stack to determine the minimum rogue level required to flank the character.", 
      "name": "Improved Uncanny Dodge", 
      "specialAbilityType":"ex",
      fieldToUpdate: ['defensive_abilities']
  }, 
  {
      "description": "At 10th level, and every two levels thereafter, a rogue can choose one of the following advanced talents in place of a rogue talent.", 
      "name": "Advanced Talents",
  }, 
  {
      "description": "Upon reaching 20th level, a rogue becomes incredibly deadly when dealing sneak attack damage. Each time the rogue deals sneak attack damage, she can choose one of the following three effects: the target can be put to sleep for 1d4 hours, paralyzed for 2d6 rounds, or slain. Regardless of the effect chosen, the target receives a Fortitude save to negate the additional effect. The DC of this save is equal to 10 + 1/2 the rogue's level + the rogue's Intelligence modifier. Once a creature has been the target of a master strike, regardless of whether or not the save is made, that creature is immune to that rogue's master strike for 24 hours. Creatures that are immune to sneak attack damage are also immune to this ability.", 
      "name": "Master Strike", 
      "specialAbilityType":"ex",
      fieldToUpdate: 'acquiredSpecialAttacks'
  }
];

const rogue = {
    name: 'rogue',
    abbreviation: 'rog',
    alignment: 'any',
    hitDieType: 8,
    classSkills: [
      {name: "Acrobatics"},
      {name: "Appraise"},
      {name: "Bluff"},
      {name: "Climb"},
      {name: "Craft"},
      {name: "Diplomacy"},
      {name: "Disable Device"},
      {name: "Disguise"},
      {name: "Escape Artist"},
      {name: "Intimidate"},
      {name: "Knowledge", subName: "dungeoneering"},
      {name: "Knowledge", subName: "local"},
      {name: "Linguistics"},
      {name: "Perception"},
      {name: "Perform"},
      {name: "Profession"},
      {name: "Sense Motive"},
      {name: "Sleight of Hand"},
      {name: "Stealth"},
      {name: "Swim"},
      {name: "Use Magic Device"},
    ],
    skillRanksPerLevel: 8,
    "base_attack_bonus": "medium",  //might like a different format  for the key but this matches creatureStatsByType
    "good_saving_throws": ["Ref"], //might like a different format  for the key but this matches creatureStatsByType
    primaryAbilityScore: 'dex',
    specialAbilities,
    rogueTalents,
    preferredLevelForClassAbilities: 10,
    advancement: advancement,
    levels: [
        {
          level: 1, 
          classAbilities: ['Sneak Attack', 'Trapfinding'],
        },
        {
          level: 2,
          classAbilities: ['Evasion', 'Rogue Talents', 'Rogue Talent Selection']
        },
        {
          level: 3,
          classAbilities: ['Trap Sense']
        },
        {
          level: 4,
          classAbilities: ['Rogue Talent Selection', 'Uncanny Dodge']
        },
        {
          level: 5,
          classAbilities: []
        },
        {
          level: 6,
          classAbilities: ['Rogue Talent Selection']
        },
        {
          level: 7,
          classAbilities: []
        },
        {
          level: 8,
          classAbilities: ['Improved Uncanny Dodge']
        },
        {
          level: 9,
          classAbilities: []
        },
        {
          level: 10,
          classAbilities: ['Advanced Talents', 'Advanced Rogue Talent Selection']
        },
        {
          level: 11,
          classAbilities: []
        },
        {
          level: 12,
          classAbilities: ['Advanced Rogue Talent Selection']
        },
        {
          level: 13,
          classAbilities: []
        },
        {
          level: 14,
          classAbilities: ['Advanced Rogue Talent Selection']
        },
        {
          level: 15,
          classAbilities: []
        },
        {
          level: 16,
          classAbilities: ['Advanced Rogue Talent Selection']
        },
        {
          level: 17,
          classAbilities: []
        },
        {
          level: 18,
          classAbilities: ['Advanced Rogue Talent Selection'] 
        },
        {
          level: 19,
          classAbilities: [] 
        },
        {
          level: 20,
          classAbilities: ['Master Strike', 'Advanced Rogue Talent Selection']
        }
    ]
};

export default rogue;