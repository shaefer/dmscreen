import advancement from '../../components/ClassLevels/MonkAdvancement';

const specialAbilities = [
  {
      "description": "Monks are proficient with the club, crossbow (light or heavy), dagger, handaxe, javelin, kama, nunchaku, quarterstaff, sai, shortspear, short sword, shuriken, siangham, sling, and spear.Monks are not proficient with any armor or shields.When wearing armor, using a shield, or carrying a medium or heavy load, a monk loses his AC bonus, as well as his fast movement and flurry of blows abilities.", 
      "source": "Core Rulebook", 
      "type": "section", 
      "name": "Weapon and Armor Proficiency"
  }, 
  {
      "description": "When unarmored and unencumbered, the monk adds his Wisdom bonus (if any) to his AC and his CMD. In addition, a monk gains a +1 bonus to AC and CMD at 4th level. This bonus increases by 1 for every four monk levels thereafter, up to a maximum of +5 at 20th level.These bonuses to AC apply even against touch attacks or when the monk is flat-footed. He loses these bonuses when he is immobilized or helpless, when he wears any armor, when he carries a shield, or when he carries a medium or heavy load.", 
      "name": "AC Bonus", 
      "specialAbilityType":"ex",
      fieldToUpdate: ['armor_class']
  }, 
  {
      "description": "Starting at 1st level, a monk can make a flurry of blows as a full-attack action. When doing so, he may make on additional attack, taking a -2 penalty on all of his attack rolls, as if using the Two-Weapon Fighting feat. These attacks can be any combination of unarmed strikes and attacks with a monk special weapon (he does not need to use two weapons to use this ability). For the purpose of these attacks, the monk's base attack bonus from his monk class levels is equal to his monk level. For all other purposes, such as qualifying for a feat or a prestige class, the monk uses his normal base attack bonus. At 8th level, the monk can make two additional attacks when he uses flurry of blows, as if using Improved Two-Weapon Fighting (even if the monk does not meet the prerequisites for the feat).At 15th level, the monk can make three additional attacks using flurry of blows, as if using Greater Two-Weapon Fighting (even if the monk does not meet the prerequisites for the feat). A monk applies his full Strength bonus to his damage rolls for all successful attacks made with flurry of blows, whether the attacks are made with an off-hand or with a weapon wielded in both hands. A monk may substitute disarm, sunder, and trip combat maneuvers for unarmed attacks as part of a flurry of blows. A monk cannot use any weapon other than an unarmed strike or a special monk weapon as part of a flurry of blows. A monk with natural weapons cannot use such weapons as part of a flurry of blows, nor can he make natural attacks in addition to his flurry of blows attacks.", 
      "name": "Flurry of Blows", 
      "specialAbilityType":"ex",
      fieldToUpdate: ['special_qualities']
  }, 
  {
      "description": "At 1st level, a monk gains Improved Unarmed Strike as a bonus feat. A monk's attacks may be with fist, elbows, knees, and feet. This means that a monk may make unarmed strikes with his hands full. There is no such thing as an off-hand attack for a monk striking unarmed. A monk may thus apply his full Strength bonus on damage rolls for all his unarmed strikes.Usually a monk's unarmed strikes deal lethal damage, but he can choose to deal nonlethal damage instead with no penalty on his attack roll. He has the same choice to deal lethal or nonlethal damage while grappling.A monk's unarmed strike is treated as both a manufactured weapon and a natural weapon for the purpose of spells and effects that enhance or improve either manufactured weapons or natural weapons.A monk also deals more damage with his unarmed strikes than a normal person would, as shown above on Table: Monk. The unarmed damage values listed on Table: Monk is for Medium monks. A Small monk deals less damage than the amount given there with his unarmed attacks, while a Large monk deals more damage; see Small or Large Monk Unarmed Damage on the table given below.", 
      "name": "Unarmed Strike", 
      "specialAbilityType":"ex",
  }, 
  {
      "description": " At 1st level, 2nd level, and every 4 levels thereafter, a monk may select a bonus feat. These feats must be taken from the following list: Catch Off-Guard, Combat Reflexes, Deflect Arrows, Dodge, Improved Grapple, Scorpion Style, and Throw Anything. At 6th level, the following feats are added to the list: Gorgon's Fist, Improved Bull Rush, Improved Disarm, Improved Feint, Improved Trip, and Mobility. At 10th level, the following feats are added to the list: Improved Critical, Medusa's Wrath, Snatch Arrows, and Spring Attack. A monk need not have any of the prerequisites normally required for these feats to select them.", 
      "name": "Bonus Feat", 
      "source": "Core Rulebook"
  }, 
  {
      "description": "At 1st level, the monk gains Stunning Fist as a bonus feat, even if he does not meet the prerequisites. At 4th level, and every 4 levels thereafter, the monk gains the ability to apply a new condition to the target of his Stunning Fist. This condition replaces stunning the target for 1 round, and a successful saving throw still negates the effect. At 4th level, he can choose to make the target fatigued. At 8th level, he can make the target sickened for 1 minute. At 12th level, he can make the target staggered for 1d6+1 rounds. At 16th level, he can permanently blind or deafen the target. At 20th level, he can paralyze the target for 1d6+1 rounds. The monk must choose which condition will apply before the attack roll is made. These effects do not stack with themselves (a creature sickened by Stunning Fist cannot become nauseated if hit by Stunning Fist again), but additional hits do increase the duration.", 
      "name": "Stunning Fist", 
      "specialAbilityType":"ex",
      fieldToUpdate: 'acquiredSpecialAttacks',
  }, 
  {
      "description": "At 2nd level or higher, a monk can avoid damage from many area-effect attacks. If a monk makes a successful Reflex saving throw against an attack that normally deals half damage on a successful save, he instead takes no damage. Evasion can be used only if a monk is wearing light armor or no armor. A helpless monk does not gain the benefit of evasion.", 
      "name": "Evasion", 
      "specialAbilityType":"ex",
  }, 
  {
      "description": "At 3rd level, a monk gains an enhancement bonus to his land speed, as shown on Table: Monk. A monk in armor or carrying a medium or heavy load loses this extra speed.", 
      "name": "Fast Movement", 
      "specialAbilityType":"ex",
  }, 
  {
      "description": "At 3rd level, a monk uses his monk level in place of his base attack bonus when calculating his Combat Maneuver Bonus. Base attack bonuses granted from other classes are unaffected and are added normally.", 
      "name": "Maneuver Training", 
      "specialAbilityType":"ex",
  }, 
  {
      "description": "A monk of 3rd level or higher gains a +2 bonus on saving throws against enchantment spells and effects.", 
      "name": "Still Mind", 
      "specialAbilityType":"ex",
  }, 
  {
      "description": "points, supernatural energy he can use to accomplish amazing feats. The number of points in a monk's ki pool is equal to 1/2 his monk level + his Wisdom modifier. As long as he has at least 1 point in his ki pool, he can make a ki strike. At 4th level, ki strike allows his unarmed attacks to be treated as magic weapons for the purpose of overcoming damage reduction. At 7th level, his unarmed attacks are also treated as cold iron and silver for the purpose of overcoming damage reduction. At 10th level, his unarmed attacks are also treated as lawful weapons for the purpose of overcoming damage reduction. At 16th level, his unarmed attacks are treated as adamantine weapons for the purpose of overcoming damage reduction and bypassing hardness.By spending 1 point from his ki pool, a monk can make one additional attack at his highest attack bonus when making a flurry of blows attack. In addition, he can spend 1 point to increase his speed by 20 feet for 1 round. Finally, a monk can spend 1 point from his ki pool to give himself a +4 dodge bonus to AC for 1 round. Each of these powers is activated as a swift action. A monk gains additional powers that consume points from his ki pool as he gains levels.The ki pool is replenished each morning after 8 hours of rest or meditation; these hours do not need to be consecutive.", 
      "name": "Ki Pool", 
      "specialAbilityType":"ex",
  }, 
  {
      "description": "At 4th level or higher, a monk within arm's reach of a wall can use it to slow his descent. When first gaining this ability, he takes damage as if the fall were 20 feet shorter than it actually is. The monk's ability to slow his fall (that is, to reduce the effective distance of the fall when next to a wall) improves with his monk level until at 20th level he can use a nearby wall to slow his descent and fall any distance without harm.", 
      "name": "Slow Fall", 
      "specialAbilityType":"ex",
  }, 
  {
      "description": "At 5th level, a monk adds his level to all Acrobatics checks made to jump, both for vertical jumps and horizontal jumps. In addition, he always counts as having a running start when making jump checks using Acrobatics. By spending 1 point from his ki pool as a swift action, a monk gains a +20 bonus on Acrobatics checks made to jump for 1 round.", 
      "name": "High Jump", 
      "specialAbilityType":"ex",
  }, 
  {
      "description": "At 5th level, a monk gains immunity to all diseases, including supernatural and magical diseases.", 
      "name": "Purity of Body", 
      "specialAbilityType":"ex",
  }, 
  {
      "description": "At 7th level or higher, a monk can heal his own wounds as a standard action. He can heal a number of hit points of damage equal to his monk level by using 2 points from his ki pool.", 
      "name": "Wholeness of Body", 
      "specialAbilityType":"ex",
  }, 
  {
      "description": "At 9th level, a monk's evasion ability improves. He still takes no damage on a successful Reflex saving throw against attacks, but henceforth he takes only half damage on a failed save. A helpless monk does not gain the benefit of improved evasion.", 
      "name": "Improved Evasion", 
      "specialAbilityType":"ex",
  }, 
  {
      "description": "At 11th level, a monk gains immunity to poisons of all kinds.", 
      "name": "Diamond Body", 
      "specialAbilityType":"su",
  }, 
  {
      "description": ". Using this ability is a move action that consumes 2 points from his ki pool. His caster level for this effect is equal to his monk level. He cannot take other creatures with him when he uses this ability.", 
      "name": "Abundant Step", 
      "specialAbilityType":"ex",
  }, 
  {
      "description": "At 13th level, a monk gains spell resistance equal to his current monk level + 10. In order to affect the monk with a spell, a spellcaster must get a result on a caster level check (1d20 + caster level) that equals or exceeds the monk's spell resistance.", 
      "name": "Diamond Soul", 
      "specialAbilityType":"ex",
  }, 
  {
      "description": "Starting at 15th level, a monk can set up vibrations within the body of another creature that can thereafter be fatal if the monk so desires. He can use this quivering palm attack once per day, and he must announce his intent before making his attack roll. Creatures immune to critical hits cannot be affected. Otherwise, if the monk strikes successfully and the target takes damage from the blow, the quivering palm attack succeeds. Thereafter, the monk can try to slay the victim at any later time, as long as the attempt is made within a number of days equal to his monk level. To make such an attempt, the monk merely wills the target to die (a free action), and unless the target makes a Fortitude saving throw (DC 10 + 1/2 the monk's level + the monk's Wis modifier), it dies. If the saving throw is successful, the target is no longer in danger from that particular quivering palm attack, but it may still be affected by another one at a later time. A monk can have no more than 1 quivering palm in effect at one time. If a monk uses quivering palm while another is still in effect, the previous effect is negated.", 
      "name": "Quivering Palm", 
      "specialAbilityType":"ex",
  }, 
  {
      "description": "At 17th level, a monk no longer takes penalties to his ability scores for aging and cannot be magically aged. Any such penalties that he has already taken, however, remain in place. Age bonuses still accrue, and the monk still dies of old age when his time is up.", 
      "name": "Timeless Body", 
      "specialAbilityType":"ex",
  }, 
  {
      "description": "A monk of 17th level or higher can speak with any living creature.", 
      "name": "Tongue of the Sun and Moon", 
      "specialAbilityType":"ex",
  }, 
  {
      "description": ". Using this ability is a move action that consumes 3 points from his ki pool. This ability only affects the monk and cannot be used to make other creatures ethereal.", 
      "name": "Empty Body", 
      "specialAbilityType":"ex",
  }, 
  {
      "description": "At 20th level, a monk becomes a magical creature. He is forevermore treated as an outsider rather than as a humanoid (or whatever the monk's creature type was) for the purpose of spells and magical effects. Additionally, the monk gains damage reduction 10/chaotic, which allows him to ignore the first 10 points of damage from any attack made by a nonchaotic weapon or by any natural attack made by a creature that doesn't have similar damage reduction. Unlike other outsiders, the monk can still be brought back from the dead as if he were a member of his previous creature type.",
      "name": "Perfect Self", 
      "source": "Core Rulebook",
      "specialAbilityType":"ex",
  }
];

const monk = {
    name: 'monk',
    abbreviation: 'mnk',
    alignment: 'any lawful',
    hitDieType: 8,
    classSkills: [
      {name: "Acrobatics"},
      {name: "Climb"},
      {name: "Craft"},
      {name: "Escape Artist"},
      {name: "Intimidate"},
      {name: "Knowledge", subName: "history"},
      {name: "Knowledge", subName: "religion"},
      {name: "Perception"},
      {name: "Perform"},
      {name: "Profession"},
      {name: "Ride"},
      {name: "Sense Motive"},
      {name: "Stealth"},
      {name: "Swim"},
    ],
    skillRanksPerLevel: 4,
    "base_attack_bonus": "medium",  //might like a different format  for the key but this matches creatureStatsByType
    "good_saving_throws": ["Fort", "Ref", "Will"], //might like a different format  for the key but this matches creatureStatsByType
    primaryAbilityScore: 'wis',
    specialAbilities,
    preferredLevelForClassAbilities: 10, //6 and 10
    advancement: advancement,
    levels: [
        {
          level: 1, 
          classAbilities: ['AC Bonus', 'Bonus Feat', 'Flurry of Blows', 'Stunning Fist', 'Unarmed Strike', 'Weapon and Armor Proficiency'],
        },
        {
          level: 2,
          classAbilities: ['Bonus Feat', 'Evasion']
        },
        {
          level: 3,
          classAbilities: ['Fast Movement', 'Maneuver Training', 'Still Mind']
        },
        {
          level: 4,
          classAbilities: ['Ki Pool', 'Slow Fall']
        },
        {
          level: 5,
          classAbilities: ['High Jump', 'Purity of Body']
        },
        {
          level: 6,
          classAbilities: ['Bonus Feat', 'Slow Fall']
        },
        {
          level: 7,
          classAbilities: ['Wholeness of Body']
        },
        {
          level: 8,
          classAbilities: []
        },
        {
          level: 9,
          classAbilities: ['Improved Evasion']
        },
        {
          level: 10,
          classAbilities: ['Bonus Feat']
        },
        {
          level: 11,
          classAbilities: ['Diamond Body']
        },
        {
          level: 12,
          classAbilities: ['Abundant Step']
        },
        {
          level: 13,
          classAbilities: ['Diamond Soul']
        },
        {
          level: 14,
          classAbilities: []
        },
        {
          level: 15,
          classAbilities: ['Quivering Palm']
        },
        {
          level: 16,
          classAbilities: []
        },
        {
          level: 17,
          classAbilities: ['Timeless Body', 'Tongue of the Sun and Moon']
        },
        {
          level: 18,
          classAbilities: [] 
        },
        {
          level: 19,
          classAbilities: ['Empty Body'] 
        },
        {
          level: 20,
          classAbilities: ['Perfect Self']
        }
    ]
};

export default monk;