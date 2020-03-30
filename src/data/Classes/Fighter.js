import * as StatSections from '../GeneralRules/StatSections';
import fighterAdvancement from '../../components/ClassLevels/FighterAdvancement';

const weaponGroup = [
  { 
    "name":"Axes",
    "description":"battleaxe, dwarven waraxe, greataxe, handaxe, heavy pick, light pick, orc double axe, and throwing axe."
  },
  { 
    "name":"Blades, Heavy",
    "description":"bastard sword, elven curve blade, falchion, greatsword, longsword, scimitar, scythe, and two-bladed sword."
  },
  { 
    "name":"Blades, Light",
    "description":"dagger, kama, kukri, rapier, sickle, starknife, and short sword."
  },
  { 
    "name":"Bows",
    "description":"composite longbow, composite shortbow, longbow, and shortbow."
  },
  { 
    "name":"Close",
    "description":"gauntlet, heavy shield, light shield, punching dagger, sap, spiked armor, spiked gauntlet, spiked shield, and unarmed strike."
  },
  { 
    "name":"Crossbows",
    "description":"hand crossbow, heavy crossbow, light crossbow, heavy repeating crossbow, and light repeating crossbow."
  },
  { 
    "name":"Double",
    "description":"dire flail, dwarven urgrosh, gnome hooked hammer, orc double axe, quarterstaff, and two-bladed sword."
  },
  { 
    "name":"Flails",
    "description":"dire flail, flail, heavy flail, morningstar, nunchaku, spiked chain, and whip."
  },
  { 
    "name":"Hammers",
    "description":"club, greatclub, heavy mace, light hammer, light mace, and warhammer."
  },
  { 
    "name":"Monk",
    "description":"kama, nunchaku, quarterstaff, sai, shuriken, siangham, and unarmed strike."
  },
  { 
    "name":"Natural",
    "description":"unarmed strike and all natural weapons, such as bite, claw, gore, tail, and wing."
  },
  { 
    "name":"Pole Arms",
    "description":"glaive, guisarme, halberd, and ranseur."
  },
  { 
    "name":"Spears",
    "description":"javelin, lance, longspear, shortspear, spear, and trident."
  },
  { 
    "name":"Thrown",
    "description":"blowgun, bolas, club, dagger, dart, halfling sling staff, javelin, light hammer, net, shortspear, shuriken, sling, spear, starknife, throwing axe, and trident."
  }
];

const fighterSpecialAbilities = [
  {
      name: 'Bonus Feat',
      specialAbilityType: 'ex',
      description: "At 1st level, and at every even level thereafter, a fighter gains a bonus feat in addition to those gained from normal advancement (meaning that the fighter gains a feat at every level). These bonus feats must be selected from those listed as combat feats, sometimes also called \"fighter bonus feats.\" Upon reaching 4th level, and every four levels thereafter (8th, 12th, and so on), a fighter can choose to learn a new bonus feat in place of a bonus feat he has already learned. In effect, the fighter loses the bonus feat in exchange for the new one. The old feat cannot be one that was used as a prerequisite for another feat, prestige class, or other ability. A fighter can only change one feat at any given level and must choose whether or not to swap the feat at the time he gains a new bonus feat for the level.",
      statSection: StatSections.FEATS,
      fieldToUpdate: 'additionalFeats'
  },
  {
      name: 'Bravery',
      specialAbilityType: 'ex',
      description: "Starting at 2nd level, a fighter gains a +1 bonus on Will saves against fear. This bonus increases by +1 for every four levels beyond 2nd.",
      statSection: StatSections.SAVING_THROWS,
      fieldToUpdate: 'saving_throws'
  },
  {
      name: 'Armor Training',
      specialAbilityType: 'ex',
      description: `Starting at 3rd level, a fighter learns to be more maneuverable while wearing armor. Whenever he is wearing armor, he reduces the armor check penalty by 1 (to a minimum of 0) and increases the maximum Dexterity bonus allowed by his armor by 1. Every four levels thereafter (7th, 11th, and 15th), these bonuses increase by +1 each time, to a maximum –4 reduction of the armor check penalty and a +4 increase of the maximum Dexterity bonus allowed.`,
      statSection: StatSections.ARMOR_CLASS,
      fieldToUpdate: 'armor_class'
  },
  {
      name: 'Weapon Training Selection',
      specialAbilityType: 'ex',
      parentName: 'Weapon Training',
      selection: 'weaponGroup',
      selectionLevelRestrictions: false,
      description: 'This will be replaced by Selection Description'
  },
  {
      name: 'Weapon Training',
      specialAbilityType: 'ex',
      isParent: true,
      description: `Starting at 5th level, a fighter can select one group of weapons, as noted below. Whenever he attacks with a weapon from this group, he gains a +1 bonus on attack and damage rolls.

      Every four levels thereafter (9th, 13th, and 17th), a fighter becomes further trained in another group of weapons. He gains a +1 bonus on attack and damage rolls when using a weapon from this group. In addition, the bonuses granted by previous weapon groups increase by +1 each. For example, when a fighter reaches 9th level, he receives a +1 bonus on attack and damage rolls with one weapon group and a +2 bonus on attack and damage rolls with the weapon group selected at 5th level. Bonuses granted from overlapping groups do not stack. Take the highest bonus granted for a weapon if it resides in two or more groups.
      
      A fighter also adds this bonus to any combat maneuver checks made with weapons from this group. This bonus also applies to the fighter's Combat Maneuver Defense when defending against disarm and sunder attempts made against weapons from this group.
      
      Weapon groups are defined as follows (GMs may add other weapons to these groups, or add entirely new groups):
      
      <p style='margin: 0.1em 0em 0.1em 1em'>Axes: battleaxe, dwarven waraxe, greataxe, handaxe, heavy pick, light pick, orc double axe, and throwing axe.
      
      <br/>Blades, Heavy: bastard sword, elven curve blade, falchion, greatsword, longsword, scimitar, scythe, and two-bladed sword.
      
      <br/>Blades, Light: dagger, kama, kukri, rapier, sickle, starknife, and short sword.
      
      <br/>Bows: composite longbow, composite shortbow, longbow, and shortbow.
      
      <br/>Close: gauntlet, heavy shield, light shield, punching dagger, sap, spiked armor, spiked gauntlet, spiked shield, and unarmed strike.
      
      <br/>Crossbows: hand crossbow, heavy crossbow, light crossbow, heavy repeating crossbow, and light repeating crossbow.
      
      <br/>Double: dire flail, dwarven urgrosh, gnome hooked hammer, orc double axe, quarterstaff, and two-bladed sword.
      
      <br/>Flails: dire flail, flail, heavy flail, morningstar, nunchaku, spiked chain, and whip.
      
      <br/>Hammers: club, greatclub, heavy mace, light hammer, light mace, and warhammer.
      
      <br/>Monk: kama, nunchaku, quarterstaff, sai, shuriken, siangham, and unarmed strike.
      
      <br/>Natural: unarmed strike and all natural weapons, such as bite, claw, gore, tail, and wing.
      
      <br/>Pole Arms: glaive, guisarme, halberd, and ranseur.
      
      <br/>Spears: javelin, lance, longspear, shortspear, spear, and trident.
      
      <br/>Thrown: blowgun, bolas, club, dagger, dart, halfling sling staff, javelin, light hammer, net, shortspear, shuriken, sling, spear, starknife, throwing axe, and trident.
      </p>`
  },
  { 
      "name":"Armor Mastery",
      "specialAbilityType":"ex",
      "description":"At 19th level, a fighter gains DR 5/— whenever he is wearing armor or using a shield.",
      statSection: StatSections.DEFENSIVE_ABILITIES,
      fieldToUpdate: 'dr'
  },
  { 
      "name":"Weapon Mastery",
      "specialAbilityType":"ex",
      "description":"At 20th level, a fighter chooses one weapon, such as the longsword, greataxe, or longbow. Any attacks made with that weapon automatically confirm all critical threats and have their damage multiplier increased by 1 (×2 becomes ×3, for example). In addition, he cannot be disarmed while wielding a weapon of this type.",
      statSection: StatSections.ATTACKS,
      fieldToUpdate: 'melee' //TODO: Update fieldToUpdate to allow an array of multiple fields that might need updating? or add a fieldToUpdate2?
  },
];

const fighter = {
    name: 'fighter',
    abbreviation: 'ftr',
    alignment: 'any',
    hitDieType: 10,
    classSkills: [ {name: "Climb"}, {name: "Craft"}, {name: "Handle Animal"}, {name: "Intimidate"}, {name: "Knowledge", subName: 'dungeoneering'}, {name: "Knowledge", subName: 'engineering'}, {name: "Profession"}, {name: "Ride"}, {name: "Survival"}, {name: "Swim"}],
    skillRanksPerLevel: 2,
    "base_attack_bonus": "fast",  //might like a different format  for the key but this matches creatureStatsByType
    "good_saving_throws": ["Fort"], //might like a different format  for the key but this matches creatureStatsByType
    primaryAbilityScore: 'str',
    specialAbilities: fighterSpecialAbilities,
    advancement: fighterAdvancement,
    weaponGroup: weaponGroup,
    levels: [
        {
          level: 1, 
          classAbilities: ['Bonus Feat'],
        },
        {
          level: 2,
          classAbilities: ['Bonus Feat', 'Bravery']
        },
        {
          level: 3,
          classAbilities: ['Armor Training']
        },
        {
          level: 4,
          classAbilities: []
        },
        {
          level: 5,
          classAbilities: ['Weapon Training', 'Weapon Training Selection']
        },
        {
          level: 6,
          classAbilities: []
        },
        {
          level: 7,
          classAbilities: []
        },
        {
          level: 8,
          classAbilities: []
        },
        {
          level: 9,
          classAbilities: ["Weapon Training Selection"]
        },
        {
          level: 10,
          classAbilities: []
        },
        {
          level: 11,
          classAbilities: []
        },
        {
          level: 12,
          classAbilities: []
        },
        {
          level: 13,
          classAbilities: ["Weapon Training Selection"]
        },
        {
          level: 14,
          classAbilities: []
        },
        {
          level: 15,
          classAbilities: []
        },
        {
          level: 16,
          classAbilities: []
        },
        {
          level: 17,
          classAbilities: ["Weapon Training Selection"]
        },
        {
          level: 18,
          classAbilities: [] 
        },
        {
          level: 19,
          classAbilities: ['Armor Mastery'] 
        },
        {
          level: 20,
          classAbilities: ['Weapon Mastery']
        }
    ]
};

export default fighter;