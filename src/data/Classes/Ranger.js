import * as StatSections from '../GeneralRules/StatSections';
import rangerAdvancement from '../../components/ClassLevels/RangerAdvancement';
import rangerSpells from './RangerSpells';

const crossbow = [
  {
    "name": "Deadly Aim",
    "minLevel": 1,
  },
  {
    "name": "Focused Shot",
    "minLevel": 1,
  },
  {
    "name": "Precise Shot",
    "minLevel": 1,
  },
  {
    "name": "Rapid Reload",
    "minLevel": 1,
  },
  {
    "name": "Crossbow Mastery",
    "minLevel": 6,
  },
  {
    "name": "Improved Precise Shot",
    "minLevel": 6,
  },
  {
    "name": "Pinpoint Targeting",
    "minLevel": 10,
  },
  {
    "name": "Shot on the Run",
    "minLevel": 10,
  },
]

const combatStyles = [
  {
    "description":"If the ranger selects crossbow style, he can choose from the following list whenever he gains a combat style feat: Deadly Aim, Focused Shot, Precise Shot, and Rapid Reload. At 6th level, he adds Crossbow Mastery and Improved Precise Shot to the list. At 10th level, he adds Pinpoint Targeting and Shot on the Run to the list.",
    "name":"Crossbow",
    "subSelectionCategory": crossbow
  },
  // {
  //   "description":"If the ranger selects mounted combat, he can choose from the following list whenever he gains a combat style feat: Mounted Combat, Mounted Archery, Ride-By Attack, and Trick Riding. At 6th level, he adds Mounted Shield and Spirited Charge to the list. At 10th level, he adds Mounted Skirmisher and Unseat to the list.",
  //   "name":"Mounted Combat",
  // },
  // {
  //   "description":"If the ranger selects natural weapon style, he can choose from the following list whenever he gains a combat style feat: Aspect of the Beast, Improved Natural Weapon, Rending Claws, and Weapon Focus. At 6th level, he adds Eldritch Fangs and Vital Strike to the list. At 10th level, he adds Multiattack and Improved Vital Strike to the list.",
  //   "name":"Natural Weapon",
  // },
  // {
  //   "description":"If the ranger selects two-handed weapon style, he can choose from the following list whenever he gains a combat style feat: Cleave, Power Attack, Pushing Assault, and Shield of Swings. At 6th level, he adds Furious Focus and Great Cleave to the list. At 10th level, he adds Dreadful Carnage and Improved Sunder to the list.",
  //   "name":"Two-Handed Weapon",
  // },
  // {
  //   "description":"If the ranger selects weapon and shield style, he can choose from the following list whenever he gains a combat style feat: Improved Shield Bash, Shield Focus, Shield Slam, and Two-Weapon Fighting. At 6th level, he adds Saving Shield and Shield Master to the list. At 10th level, he adds Bashing Finish and Greater Shield Focus to the list.",
  //   "name":"Weapon and Shield",
  // },
];



const favoredEnemies = [
  {"name": "Aberration"}, {"name": "Animal"}, {"name": "Construct"}, {"name": "Dragon"}, {"name": "Fey"},
  {"name": "Humanoid (aquatic)"}, {"name": "Humanoid (dwarf)"}, {"name": "Humanoid (elf)"}, {"name": "Humanoid (giant)"},
  {"name": "Humanoid (goblinoid)"}, {"name": "Humanoid (gnoll)"},
  {"name": "Humanoid (gnome)"}, {"name": "Humanoid (halfling)"}, {"name": "Humanoid (human)"}, {"name": "Humanoid (orc)"},
  {"name": "Humanoid (reptilian)"}, {"name": "Humanoid (other)"},
  {"name": "Magical Beast"}, {"name": "Monstrous Humanoid"}, {"name": "Ooze"}, {"name": "Outsider (air)"},
  {"name": "Outsider (chaotic)"}, {"name": "Outsider (earth)"}, {"name": "Outsider (evil)"}, {"name": "Outsider (fire)"}, {"name": "Outsider (good)"},
  {"name": "Outsider (lawful)"}, {"name": "Outsider (native)"}, {"name": "Outsider (water)"}, {"name": "Plant"},
  {"name": "Undead"}, {"name": "Vermin"}
];

const favoredTerrains = [
  {"name": "Cold"}, {"name": "Desert"}, {"name": "Forest"}, {"name": "Jungle"}, {"name": "Mountain"}, {"name": "Plains"}, 
  {"name": "Planes"}, {"name": "Swamp"}, {"name": "Underground"}, {"name": "Urban"}, {"name": "Water"}
]

const specialAbilities = [
  {
      "description": "<p>A ranger is proficient with all simple and martial weapons and with light armor, medium armor, and shields (except tower shields).</p>", 
      "name": "Weapon and Armor Proficiency", 
  }, 
  {
      "description": "<p id=\"favored-enemy\">At 1st level, a ranger selects a creature type from the ranger favored enemies table. He gains a +2 bonus on Bluff, Knowledge, Perception, Sense Motive, and Survival checks against creatures of his selected type. Likewise, he gets a +2 bonus on weapon attack and damage rolls against them. A ranger may make Knowledge skill checks untrained when attempting to identify these creatures.</p><p>At 5th level and every five levels thereafter (10th, 15th, and 20th level), the ranger may select an additional favored enemy. In addition, at each such interval, the bonus against any one favored enemy (including the one just selected, if so desired) increases by +2. </p><p>If the ranger chooses humanoids or outsiders as a favored enemy, he must also choose an associated subtype, as indicated on the table below. (Note that there are other types of humanoid to choose from&mdash;those called out specifically on the table below are merely the most common.) If a specific creature falls into more than one category of favored enemy, the ranger's bonuses do not stack; he simply uses whichever bonus is higher.</p>", 
      "name": "Favored Enemy", 
      "specialAbilityType":"ex",
      isParent: true
  }, 
  {
    "name": "Favored Enemy Selection",
    selection: 'favoredEnemies',
    parentName: 'Favored Enemy',
  },
  {
      "description": "<p id=\"track\">A ranger adds half his level (minimum 1) to Survival skill checks made to follow tracks.</p>", 
      "name": "Track", 
      "specialAbilityType":"ex",
  }, 
  {
      "description": "<p id=\"wild-empathy-ranger\">A ranger can improve the initial attitude of an animal. This ability functions just like a Diplomacy check to improve the attitude of a person (see Using Skills). The ranger rolls 1d20 and adds his ranger level and his Charisma bonus to determine the wild empathy check result. The typical domestic animal has a starting attitude of indifferent, while wild animals are usually unfriendly.</p><p>To use wild empathy, the ranger and the animal must be within 30 feet of one another under normal visibility conditions. Generally, influencing an animal in this way takes 1 minute, but, as with influencing people, it might take more or less time.</p><p>The ranger can also use this ability to influence a magical beast with an Intelligence score of 1 or 2, but he takes a &ndash;4 penalty on the check.</p>", 
      "name": "Wild Empathy", 
      "specialAbilityType":"ex",
  }, 
  {
      "description": "<p id=\"combat-style-feat\">At 2nd level, a ranger must select one of two combat styles to pursue: archery or two-weapon combat. The ranger's expertise manifests in the form of bonus feats at 2nd, 6th, 10th, 14th, and 18th level. He can choose feats from his selected combat style, even if he does not have the normal prerequisites.</p>", 
      "name": "Combat Style Feat", 
      "specialAbilityType":"ex",
      isParent: true,
  }, 
  {
      "description": "",
      "name": "Combat Style Selection",
      "specialAbilityType": "ex",
      selection: 'combatStyles',
      subSelection: 'selectedCombatStyle',
      parentName: 'Combat Style Feat',
  },
  {
    "description": "",
    "name": "Combat Style Feat Selection",
    "specialAbilityType": "ex",
    selection: 'selectedCombatStyle',
    selectionLevelRestrictions: true,
    parentName: 'Combat Style',
},
  {
      "description": "<p id=\"endurance\">A ranger gains Endurance as a bonus feat at 3rd level.</p>", 
      "name": "Endurance",  
      "specialAbilityType":"ex",
  }, 
  {
      "description": "<p id=\"favored-terrain\">At 3rd level, a ranger may select a type of terrain from the Favored Terrains table. The ranger gains a +2 bonus on initiative checks and Knowledge (geography), Perception, Stealth, and Survival skill checks when he is in this terrain. A ranger traveling through his favored terrain normally leaves no trail and cannot be tracked (though he may leave a trail if he so chooses).</p><p>At 8th level and every five levels thereafter, the ranger may select an additional favored terrain. In addition, at each such interval, the skill bonus and initiative bonus in any one favored terrain (including the one just selected, if so desired), increases by +2. </p><p>If a specific terrain falls into more than one category of favored terrain, the ranger's bonuses do not stack; he simply uses whichever bonus is higher.</p>", 
      "name": "Favored Terrain", 
      "specialAbilityType":"ex",
      isParent: true
  }, 
  {
    "name": "Favored Terrain Selection",
    selection: 'favoredTerrains',
    parentName: 'Favored Terrain',
  },
  {
      "description": "<p id=\"hunter-s-bond\">At 4th level, a ranger forms a bond with his hunting companions. This bond can take one of two forms. Once the form is chosen, it cannot be changed. The first is a bond to his companions. This bond allows him to spend a move action to grant half his favored enemy bonus against a single target of the appropriate type to all allies within 30 feet who can see or hear him. This bonus lasts for a number of rounds equal to the ranger's Wisdom modifier (minimum 1). This bonus does not stack with any favored enemy bonuses possessed by his allies; they use whichever bonus is higher.</p><p>The second option is to form a close bond with an animal companion. A ranger who selects an animal companion can choose from the following list: badger, bird, camel, cat (small), dire rat, dog, horse, pony, snake (viper or constrictor), or wolf. If the campaign takes place wholly or partly in an aquatic environment, the ranger may choose a shark instead. This animal is a loyal companion that accompanies the ranger on his adventures as appropriate for its kind. A ranger's animal companion shares his favored enemy and favored terrain bonuses.</p><p>This ability functions like the druid animal companion ability (which is part of the Nature Bond class feature), except that the ranger's effective druid level is equal to his ranger level &ndash; 3.</p>", 
      "name": "Hunter's Bond", 
      "specialAbilityType":"ex",
  }, 
  {
      "description": "<p id=\"spells-ranger\">Beginning at 4th level, a ranger gains the ability to cast a small number of divine spells, which are drawn from the ranger spell list presented in Spell Lists. A ranger must choose and prepare his spells in advance.</p><p>To prepare or cast a spell, a ranger must have a Wisdom score equal to at least 10 + the spell level. The Difficulty Class for a saving throw against a ranger's spell is 10 + the spell level + the ranger's Wisdom modifier.</p><p>Like other spellcasters, a ranger can cast only a certain number of spells of each spell level per day. His base daily spell allotment is given on Table: Ranger. In addition, he receives bonus spells per day if he has a high Wisdom score (see Table: Ability Modifiers and Bonus Spells). When Table: Ranger indicates that the ranger gets 0 spells per day of a given spell level, he gains only the bonus spells he would be entitled to based on his Wisdom score for that spell level.</p><p>A ranger must spend 1 hour per day in quiet meditation to regain his daily allotment of spells. A ranger may prepare and cast any spell on the ranger spell list, provided that he can cast spells of that level, but he must choose which spells to prepare during his daily meditation.</p><p>Through 3rd level, a ranger has no caster level. At 4th level and higher, his caster level is equal to his ranger level &ndash; 3.</p>", 
      "name": "Spells"
  }, 
  {
      "description": "<p id=\"woodland-stride-ranger\">Starting at 7th level, a ranger may move through any sort of undergrowth (such as natural thorns, briars, overgrown areas, and similar terrain) at his normal speed and without taking damage or suffering any other impairment.</p><p>Thorns, briars, and overgrown areas that are enchanted or magically manipulated to impede motion, however, still affect him.</p>", 
      "name": "Woodland Stride", 
      "specialAbilityType":"ex",
  }, 
  {
      "description": "<p id=\"swift-tracker\">Beginning at 8th level, a ranger can move at his normal speed while using Survival to follow tracks without taking the normal &ndash;5 penalty. He takes only a &ndash;10 penalty (instead of the normal &ndash;20) when moving at up to twice normal speed while tracking.</p>", 
      "name": "Swift Tracker", 
      "specialAbilityType":"ex",
  }, 
  {
      "description": "<p id=\"evasion-ranger\">When he reaches 9th level, a ranger can avoid even magical and unusual attacks with great agility. If he makes a successful Reflex saving throw against an attack that normally deals half damage on a successful save, he instead takes no damage. Evasion can be used only if the ranger is wearing light armor, medium armor, or no armor. A helpless ranger does not gain the benefit of evasion.</p>", 
      "name": "Evasion", 
      "specialAbilityType":"ex",
  }, 
  {
      "description": "<p id=\"quarry\">At 11th level, a ranger can, as a standard action, denote one target within his line of sight as his quarry. Whenever he is following the tracks of his quarry, a ranger can take 10 on his Survival skill checks while moving at normal speed, without penalty. In addition, he receives a +2 insight bonus on attack rolls made against his quarry, and all critical threats are automatically confirmed. A ranger can have no more than one quarry at a time and the creature's type must correspond to one of his favored enemy types. He can dismiss this effect at any time as a free action, but he cannot select a new quarry for 24 hours. If the ranger sees proof that his quarry is dead, he can select a new quarry after waiting 1 hour.</p>", 
      "name": "Quarry", 
      "specialAbilityType":"ex",
  }, 
  {
      "description": "<p id=\"camouflage\">A ranger of 12th level or higher can use the Stealth skill to hide in any of his favored terrains, even if the terrain doesn't grant cover or concealment.</p>", 
      "name": "Camouflage", 
      "specialAbilityType":"ex",
  }, 
  {
      "description": "<p id=\"improved-evasion-ranger\">At 16th level, a ranger's evasion improves. This ability works like evasion, except that while the ranger still takes no damage on a successful Reflex saving throw against attacks, he henceforth takes only half damage on a failed save. A helpless ranger does not gain the benefit of improved evasion.</p>", 
      "name": "Improved Evasion", 
      "specialAbilityType":"ex",
  }, 
  {
      "description": "<p id=\"hide-in-plain-sight-ranger\">While in any of his favored terrains, a ranger of 17th level or higher can use the Stealth skill even while being observed.</p>", 
      "name": "Hide in Plain Sight", 
      "specialAbilityType":"ex",
  }, 
  {
      "description": "<p id=\"improved-quarry\">At 19th level, the ranger's ability to hunt his quarry improves. He can now select a quarry as a free action, and can now take 20 while using Survival to track his quarry, while moving at normal speed without penalty. His insight bonus to attack his quarry increases to +4. If his quarry is killed or dismissed, he can select a new one after 10 minutes have passed.</p>", 
      "name": "Improved Quarry", 
      "specialAbilityType":"ex",
  }, 
  {
      "description": "<p id=\"master-hunter\">A ranger of 20th level becomes a master hunter. He can always move at full speed while using Survival to follow tracks without penalty. He can, as a standard action, make a single attack against a favored enemy at his full attack bonus. If the attack hits, the target takes damage normally and must make a Fortitude save or die. The DC of this save is equal to 10 + 1/2 the ranger's level + the ranger's Wisdom modifier. A ranger can choose instead to deal an amount of nonlethal damage equal to the creature's current hit points. A successful save negates this damage. A ranger can use this ability once per day against each favored enemy type he possesses, but not against the same creature more than once in a 24-hour period.</p>", 
      "name": "Master Hunter", 
      "specialAbilityType":"ex",
  }
]
const ranger = {
    name: 'ranger',
    abbreviation: 'rng',
    alignment: 'any',
    hitDieType: 10,
    classSkills: [
        {name: "Climb"},
        {name: "Craft"},
        {name: "Handle Animal"},
        {name: "Heal"},
        {name: "Intimidate"},
        {name: "Knowledge", subName: "dungeoneering"},
        {name: "Knowledge", subName: "geography"},
        {name: "Knowledge", subName: "nature"},
        {name: "Perception"},
        {name: "Profession"},
        {name: "Ride"},
        {name: "Spellcraft"},
        {name: "Stealth"},
        {name: "Survival"},
        {name: "Swim"},
    ],
    skillRanksPerLevel: 6,
    "base_attack_bonus": "fast",  //might like a different format  for the key but this matches creatureStatsByType
    "good_saving_throws": ["Fort", "Ref"], //might like a different format  for the key but this matches creatureStatsByType
    specialAbilities: specialAbilities,
    advancement: rangerAdvancement,
    combatStyles: combatStyles,
    selectedCombatStyle: crossbow,
    favoredEnemies: favoredEnemies,
    favoredTerrains: favoredTerrains,
    isCaster: true,
    prepareSpells: true,
    casterLevelAdjustment: -3,
    zeroLevelSpells: false,
    primaryAbilityScore: 'wis',
    //TODO: Handle Bonus Spells, Starting spell level of 1 vs 0. 
    spellsByLevel: [
      rangerSpells.filter(x => x.ranger === 1), 
      rangerSpells.filter(x => x.ranger === 2), 
      rangerSpells.filter(x => x.ranger === 3), 
      rangerSpells.filter(x => x.ranger === 4)
    ],
    levels: [
        {
          level: 1, 
          classAbilities: ['Favored Enemy', 'Favored Enemy Selection', 'Track', 'Wild Empathy', 'Weapon and Armor Proficiency'],
          spellsPerDay: [0, 0, 0, 0],
        },
        {
          level: 2,
          classAbilities: ['Combat Style Feat', 'Combat Style Selection', 'Combat Style Feat Selection'],
          spellsPerDay: [0, 0, 0, 0],
        },
        {
          level: 3,
          classAbilities: ['Endurance', 'Favored Terrain', 'Favored Terrain Selection'],
          spellsPerDay: [0, 0, 0, 0],
        },
        {
          level: 4,
          classAbilities: [`Hunter's Bond`],
          spellsPerDay: [0, 0, 0, 0],
        },
        {
          level: 5,
          classAbilities: ['Favored Enemy Selection'],
          spellsPerDay: [1, 0, 0, 0],
        },
        {
          level: 6,
          classAbilities: ['Combat Style Feat Selection'],
          spellsPerDay: [1, 0, 0, 0],
        },
        {
          level: 7,
          classAbilities: ['Woodland Stride'],
          spellsPerDay: [1, 0, 0, 0],
        },
        {
          level: 8,
          classAbilities: ['Swift Tracker', 'Favored Terrain Selection'],
          spellsPerDay: [1, 1, 0, 0],
        },
        {
          level: 9,
          classAbilities: ['Evasion'],
          spellsPerDay: [2, 1, 0, 0],
        },
        {
          level: 10,
          classAbilities: ['Favored Enemy Selection', 'Combat Style Feat Selection'],
          spellsPerDay: [2, 1, 0, 0],
        },
        {
          level: 11,
          classAbilities: ['Quarry'],
          spellsPerDay: [2, 1, 1, 0],
        },
        {
          level: 12,
          classAbilities: ['Camouflage'],
          spellsPerDay: [2, 2, 1, 0],
        },
        {
          level: 13,
          classAbilities: ['Favored Terrain Selection'],
          spellsPerDay: [3, 2, 1, 0],
        },
        {
          level: 14,
          classAbilities: ['Combat Style Feat Selection'],
          spellsPerDay: [3, 2, 1, 1],
        },
        {
          level: 15,
          classAbilities: ['Favored Enemy Selection'],
          spellsPerDay: [3, 2, 2, 1],
        },
        {
          level: 16,
          classAbilities: ['Improved Evasion'],
          spellsPerDay: [3, 3, 2, 1],
        },
        {
          level: 17,
          classAbilities: ['Hide in Plain Sight'],
          spellsPerDay: [4, 3, 2, 1],
        },
        {
          level: 18,
          classAbilities: ['Favored Terrain Selection', 'Combat Style Feat Selection'],
          spellsPerDay: [4, 3, 2, 2],
        },
        {
          level: 19,
          classAbilities: ['Improved Quarry'],
          spellsPerDay: [4, 3, 3, 2],
        },
        {
          level: 20,
          classAbilities: ['Favored Enemy Selection', 'Master Hunter'],
          spellsPerDay: [4, 4, 3, 3],
        }
    ]
};

export default ranger;