import advancement from '../../components/ClassLevels/SorcererAdvancement';
import spells from './SorcererSpells';

const bloodlinePowers = [
  {
    "description":"There is a taint in your blood, one that is alien and bizarre. You tend to think in odd ways, approaching problems from an angle that most would not expect. Over time, this taint manifests itself in your physical form.",
    "name":"Aberrant",
    "source":"Core Rulebook",
    "sections":[
      {
        "description":"Knowledge (dungeoneering).",
        "source":"Core Rulebook",
        "type":"section",
        "name":"Class Skill"
      },
      {
        "description":"<i>enlarge person</i> (3rd), <i>see invisibility</i> (5th), <i>tongues</i> (7th), <i>black tentacles</i> (9th), <i>feeblemind</i> (11th), <i>veil</i> (13th), <i>plane shift</i> (15th), <i>mind blank</i> (17th), <i>shapechange</i> (19th).",
        "source":"Core Rulebook",
        "type":"section",
        "name":"Bonus Spells"
      },
      {
        "description":"Combat Casting, Improved Disarm, Improved Grapple, Improved Initiative, Improved Unarmed Strike, Iron Will, Silent Spell, Skill Focus (Knowledge [dungeoneering]).",
        "source":"Core Rulebook",
        "type":"section",
        "name":"Bonus Feats"
      },
      {
        "description":"Whenever you cast a spell of the polymorph subschool, increase the duration of the spell by 50% (minimum 1 round). This bonus does not stack with the increase granted by the Extend Spell feat.",
        "source":"Core Rulebook",
        "type":"section",
        "name":"Bloodline Arcana"
      },
      {
        "description":"Aberrant sorcerers show increasing signs of their tainted heritage as they increase in level, although they are only visible when used.",
        "type":"section",
        "sections":[
          {
            "description":"Starting at 1st level, you can fire an acidic ray as a standard action, targeting any foe within 30 feet as a ranged touch attack. The acidic ray deals 1d6 points of acid damage + 1 for every two sorcerer levels you possess. You can use this ability a number of times per day equal to 3 + your Charisma modifier.",
            "name":"Acidic Ray",
            "url":"pfsrd://Core Rulebook/Classes/Sorcerer/Sorcerer Bloodlines/Aberrant/Bloodline Powers/Acidic Ray",
            "ability_types":{
              "ability_type":"Spell-Like"
            },
            "source":"Core Rulebook",
            "type":"ability"
          },
          {
            "description":"At 3rd level, your reach increases by 5 feet whenever you are making a melee touch attack. This ability does not otherwise increase your threatened area. At 11th level, this bonus to your reach increases to 10 feet. At 17th level, this bonus to your reach increases to 15 feet.",
            "name":"Long Limbs",
            "url":"pfsrd://Core Rulebook/Classes/Sorcerer/Sorcerer Bloodlines/Aberrant/Bloodline Powers/Long Limbs",
            "ability_types":{
              "ability_type":"Extraordinary"
            },
            "source":"Core Rulebook",
            "type":"ability"
          },
          {
            "description":"At 9th level, your anatomy changes, giving you a 25% chance to ignore any critical hit or sneak attack scored against you. This chance increases to 50% at 13th level.",
            "name":"Unusual Anatomy",
            "url":"pfsrd://Core Rulebook/Classes/Sorcerer/Sorcerer Bloodlines/Aberrant/Bloodline Powers/Unusual Anatomy",
            "ability_types":{
              "ability_type":"Extraordinary"
            },
            "source":"Core Rulebook",
            "type":"ability"
          },
          {
            "description":"At 15th level, you gain spell resistance equal to your sorcerer level + 10.",
            "name":"Alien Resistance",
            "url":"pfsrd://Core Rulebook/Classes/Sorcerer/Sorcerer Bloodlines/Aberrant/Bloodline Powers/Alien Resistance",
            "ability_types":{
              "ability_type":"Supernatural"
            },
            "source":"Core Rulebook",
            "type":"ability"
          },
          {
            "description":"At 20th level, your body becomes truly unnatural. You are immune to critical hits and sneak attacks. In addition, you gain blindsight with a range of 60 feet and damage reduction 5/&mdash;.",
            "name":"Aberrant Form",
            "url":"pfsrd://Core Rulebook/Classes/Sorcerer/Sorcerer Bloodlines/Aberrant/Bloodline Powers/Aberrant Form",
            "ability_types":{
              "ability_type":"Extraordinary"
            },
            "source":"Core Rulebook",
            "type":"ability"
          }
        ],
        "name":"Bloodline Powers",
        "source":"Core Rulebook"
      }
    ]
  },
  {
    "description":"Generations ago, a demon spread its filth into your heritage. While it does not manifest in all of your kin, for you it is particularly strong. You might sometimes have urges to chaos or evil, but your destiny (and alignment) is up to you.",
    "name":"Abyssal",
    "source":"Core Rulebook",
    "sections":[
      {
        "description":"Knowledge (planes).",
        "source":"Core Rulebook",
        "type":"section",
        "name":"Class Skill"
      },
      {
        "description":"<i>cause fear</i> (3rd), <i>bull's strength</i> (5th), <i>rage</i> (7th), <i>stoneskin</i> (9th), <i>dismissal</i> (11th), <i>transformation</i> (13th), <i>greater teleport</i> (15th), <i>unholy aura</i> (17th), <i>summon monster IX</i> (19th).",
        "source":"Core Rulebook",
        "type":"section",
        "name":"Bonus Spells"
      },
      {
        "description":"Augment Summoning, Cleave, Empower Spell, Great Fortitude, Improved Bull Rush, Improved Sunder, Power Attack, Skill Focus (Knowledge [planes]).",
        "source":"Core Rulebook",
        "type":"section",
        "name":"Bonus Feats"
      },
      {
        "description":"Whenever you cast a spell of the summoning subschool, the creatures summoned gain DR/good equal to 1/2 your sorcerer level (minimum 1). This does not stack with any DR the creature might have.",
        "source":"Core Rulebook",
        "type":"section",
        "name":"Bloodline Arcana"
      },
      {
        "description":"While some would say that you are possessed, you know better. The demonic influence in your blood grows as you gain power.",
        "type":"section",
        "sections":[
          {
            "description":"At 1st level, you can grow claws as a free action. These claws are treated as natural weapons, allowing you to make two claw attacks as a full attack action using your full base attack bonus. These attacks deal 1d4 points of damage each (1d3 if you are Small) plus your Strength modifier. At 5th level, these claws are considered magic weapons for the purpose of overcoming DR. At 7th level, the damage increases by one step to 1d6 points of damage (1d4 if you are Small). At 11th level, these claws become <i>flaming</i> <i>weapons</i>, each dealing an additional 1d6 points of fire damage on a successful hit. You can use your claws for a number of rounds per day equal to 3 + your Charisma modifier. These rounds do not need to be consecutive.",
            "name":"Claws",
            "url":"pfsrd://Core Rulebook/Classes/Sorcerer/Sorcerer Bloodlines/Abyssal/Bloodline Powers/Claws",
            "ability_types":{
              "ability_type":"Supernatural"
            },
            "source":"Core Rulebook",
            "type":"ability"
          },
          {
            "description":"At 3rd level, you gain resist electricity 5 and a +2 bonus on saving throws made against poison. At 9th level, your resistance to electricity increases to 10 and your bonus on poison saving throws increases to +4.",
            "name":"Demon Resistances",
            "url":"pfsrd://Core Rulebook/Classes/Sorcerer/Sorcerer Bloodlines/Abyssal/Bloodline Powers/Demon Resistances",
            "ability_types":{
              "ability_type":"Extraordinary"
            },
            "source":"Core Rulebook",
            "type":"ability"
          },
          {
            "description":"At 9th level, you gain a +2 inherent bonus to your Strength. This bonus increases to +4 at 13th level, and to +6 at 17th level.",
            "name":"Strength of the Abyss",
            "url":"pfsrd://Core Rulebook/Classes/Sorcerer/Sorcerer Bloodlines/Abyssal/Bloodline Powers/Strength of the Abyss",
            "ability_types":{
              "ability_type":"Extraordinary"
            },
            "source":"Core Rulebook",
            "type":"ability"
          },
          {
            "description":"At 15th level, whenever you summon a creature with the demon subtype or the fiendish template using a <i>summon monster</i> spell, you summon one additional creature of the same kind.",
            "name":"Added Summonings",
            "url":"pfsrd://Core Rulebook/Classes/Sorcerer/Sorcerer Bloodlines/Abyssal/Bloodline Powers/Added Summonings",
            "ability_types":{
              "ability_type":"Supernatural"
            },
            "source":"Core Rulebook",
            "type":"ability"
          },
          {
            "description":" <i></i>At 20th level, the power of the Abyss flows through you. You gain immunity to electricity and poison. You also gain resistance to acid 10, cold 10, and fire 10, and gain telepathy with a range of 60 feet (allowing you to communicate with any creature that can speak a language).",
            "name":"Demonic Might",
            "url":"pfsrd://Core Rulebook/Classes/Sorcerer/Sorcerer Bloodlines/Abyssal/Bloodline Powers/Demonic Might",
            "ability_types":{
              "ability_type":"Supernatural"
            },
            "source":"Core Rulebook",
            "type":"ability"
          }
        ],
        "name":"Bloodline Powers",
        "source":"Core Rulebook"
      }
    ]
  },
  {
    "description":"Your family has always been skilled in the eldritch art of magic. While many of your relatives were accomplished wizards, your powers developed without the need for study and practice.",
    "name":"Arcane",
    "source":"Core Rulebook",
    "sections":[
      {
        "description":"Knowledge (any one).",
        "source":"Core Rulebook",
        "type":"section",
        "name":"Class Skill"
      },
      {
        "description":"<i>identify</i> (3rd), <i>invisibility</i> (5th), <i>dispel magic</i> (7th), <i>dimension door</i> (9th), <i>overland flight</i> (11th), <i>true seeing</i> (13th), <i>greater teleport</i> (15th), <i>power word stun</i> (17th), <i>wish</i> (19th).",
        "source":"Core Rulebook",
        "type":"section",
        "name":"Bonus Spells"
      },
      {
        "description":"Combat Casting, Improved Counterspell, Improved Initiative, Iron Will, Scribe Scroll, Skill Focus (Knowledge [arcana]), Spell Focus, Still Spell.",
        "source":"Core Rulebook",
        "type":"section",
        "name":"Bonus Feats"
      },
      {
        "description":"Whenever you apply a metamagic feat to a spell that increases the slot used by at least one level, increase the spell's DC by +1. This bonus does not stack with itself and does not apply to spells modified by the Heighten Spell feat.",
        "source":"Core Rulebook",
        "type":"section",
        "name":"Bloodline Arcana"
      },
      {
        "description":"Magic comes naturally to you, but as you gain levels you must take care to prevent the power from overwhelming you. ",
        "type":"section",
        "sections":[
          {
            "description":" <i></i>At 1st level, you gain an arcane bond, as a wizard equal to your sorcerer level. Your sorcerer levels stack with any wizard levels you possess when determining the powers of your familiar or bonded object. This ability does not allow you to have both a familiar and a bonded item. Once per day, your bond item allows you to cast any one of your spells known (unlike a wizard's bonded item, which allows him to cast any one spell in his spellbook).",
            "name":"Arcane Bond",
            "url":"pfsrd://Core Rulebook/Classes/Sorcerer/Sorcerer Bloodlines/Arcane/Bloodline Powers/Arcane Bond",
            "ability_types":{
              "ability_type":"Supernatural"
            },
            "source":"Core Rulebook",
            "type":"ability"
          },
          {
            "description":"At 3rd level, you can apply any one metamagic feat you know to a spell you are about to cast without increasing the casting time. You must still expend a higher-level spell slot to cast this spell. You can use this ability once per day at 3rd level and one additional time per day for every four sorcerer levels you possess beyond 3rd, up to five times per day at 19th level. At 20th level, this ability is replaced by arcane apotheosis.",
            "name":"Metamagic Adept",
            "url":"pfsrd://Core Rulebook/Classes/Sorcerer/Sorcerer Bloodlines/Arcane/Bloodline Powers/Metamagic Adept",
            "ability_types":{
              "ability_type":"Extraordinary"
            },
            "source":"Core Rulebook",
            "type":"ability"
          },
          {
            "description":"At 9th level, you can add any one spell from the sorcerer/wizard spell list to your list of spells known. This spell must be of a level that you are capable of casting. You can also add one additional spell at 13th level and 17th level.",
            "name":"New Arcana",
            "url":"pfsrd://Core Rulebook/Classes/Sorcerer/Sorcerer Bloodlines/Arcane/Bloodline Powers/New Arcana",
            "ability_types":{
              "ability_type":"Extraordinary"
            },
            "source":"Core Rulebook",
            "type":"ability"
          },
          {
            "description":"At 15th level, pick one school of magic. The DC for any spells you cast from that school increases by +2. This bonus stacks with the bonus granted by Spell Focus.",
            "name":"School Power",
            "url":"pfsrd://Core Rulebook/Classes/Sorcerer/Sorcerer Bloodlines/Arcane/Bloodline Powers/School Power",
            "ability_types":{
              "ability_type":"Extraordinary"
            },
            "source":"Core Rulebook",
            "type":"ability"
          },
          {
            "description":"At 20th level, your body surges with arcane power. You can add any metamagic feats that you know to your spells without increasing their casting time, although you must still expend higher-level spell slots. Whenever you use magic items that require charges, you can instead expend spell slots to power the item. For every three levels of spell slots that you expend, you consume one less charge when using a magic item that expends charges.",
            "name":"Arcane Apotheosis",
            "url":"pfsrd://Core Rulebook/Classes/Sorcerer/Sorcerer Bloodlines/Arcane/Bloodline Powers/Arcane Apotheosis",
            "ability_types":{
              "ability_type":"Extraordinary"
            },
            "source":"Core Rulebook",
            "type":"ability"
          }
        ],
        "name":"Bloodline Powers",
        "source":"Core Rulebook"
      }
    ]
  },
  {
    "description":"Your bloodline is blessed by a celestial power, either from a celestial ancestor or through divine intervention. Although this power drives you along the path of good, your fate (and alignment) is your own to determine.",
    "name":"Celestial",
    "source":"Core Rulebook",
    "sections":[
      {
        "description":"Heal.",
        "source":"Core Rulebook",
        "type":"section",
        "name":"Class Skill"
      },
      {
        "description":"<i>bless</i> (3rd), <i>resist energy</i> (5th), <i>magic circle against evil</i> (7th), <i>remove curse</i> (9th),<i> flame strike</i> (11th), <i>greater dispel magic</i> (13th), <i>banishment</i> (15th), <i>sunburst</i> (17th),<i> gate</i> (19th).",
        "source":"Core Rulebook",
        "type":"section",
        "name":"Bonus Spells"
      },
      {
        "description":"Dodge, Extend Spell, Iron Will, Mobility, Mounted Combat, Ride-By Attack, Skill Focus (Knowledge [religion]), Weapon Finesse.",
        "source":"Core Rulebook",
        "type":"section",
        "name":"Bonus Feats"
      },
      {
        "description":"Whenever you cast a spell of the summoning subschool, the creatures summoned gain DR/evil equal to 1/2 your sorcerer level (minimum 1). This does not stack with any DR the creature might have.",
        "source":"Core Rulebook",
        "type":"section",
        "name":"Bloodline Arcana"
      },
      {
        "description":"Your celestial heritage grants you a great many powers, but they come at a price. The lords of the higher planes are watching you and your actions closely.",
        "type":"section",
        "sections":[
          {
            "description":"Starting at 1st level, you can unleash a ray of heavenly fire as a standard action, targeting any foe within 30 feet as a ranged touch attack. Against evil creatures, this ray deals 1d4 points of damage + 1 for every two sorcerer levels you possess. This damage is divine and not subject to energy resistance or immunity. This ray heals good creatures of 1d4 points of damage + 1 for every two sorcerer levels you possess. A good creature cannot benefit from your heavenly fire more than once per day. Neutral creatures are neither harmed nor healed by this effect. You can use this ability a number of times per day equal to 3 + your Charisma modifier.",
            "name":"Heavenly Fire",
            "url":"pfsrd://Core Rulebook/Classes/Sorcerer/Sorcerer Bloodlines/Celestial/Bloodline Powers/Heavenly Fire",
            "ability_types":{
              "ability_type":"Spell-Like"
            },
            "source":"Core Rulebook",
            "type":"ability"
          },
          {
            "description":"At 3rd level, you gain resist acid 5 and resist cold 5. At 9th level, your resistances increase to 10.",
            "name":"Celestial Resistances",
            "url":"pfsrd://Core Rulebook/Classes/Sorcerer/Sorcerer Bloodlines/Celestial/Bloodline Powers/Celestial Resistances",
            "ability_types":{
              "ability_type":"Extraordinary"
            },
            "source":"Core Rulebook",
            "type":"ability"
          },
          {
            "description":"At 9th level, you can sprout feathery wings and fly for a number of minutes per day equal to your sorcerer level, with a speed of 60 feet and good maneuverability. This duration does not need to be consecutive, but it must be used in 1 minute increments. ",
            "name":"Wings of Heaven",
            "url":"pfsrd://Core Rulebook/Classes/Sorcerer/Sorcerer Bloodlines/Celestial/Bloodline Powers/Wings of Heaven",
            "ability_types":{
              "ability_type":"Supernatural"
            },
            "source":"Core Rulebook",
            "type":"ability"
          },
          {
            "description":"At 15th level, you can reroll any one ability check, attack roll, skill check, or saving throw you just made. You must decide to use this ability after the die is rolled, but before the results are revealed by the GM. You must take the second result, even if it is worse. You can use this ability once per day.",
            "name":"Conviction",
            "url":"pfsrd://Core Rulebook/Classes/Sorcerer/Sorcerer Bloodlines/Celestial/Bloodline Powers/Conviction",
            "ability_types":{
              "ability_type":"Supernatural"
            },
            "source":"Core Rulebook",
            "type":"ability"
          },
          {
            "description":"At 20th level, you become infused with the power of the heavens. You gain immunity to acid, cold, and petrification. You also gain resist electricity 10, resist fire 10, and a +4 racial bonus on saves against poison. Finally, you gain unlimited use of the wings of heaven ability. Finally, you gain the ability to speak with any creature that has a language (as per the <i>tongues</i> spell).",
            "name":"Ascension",
            "url":"pfsrd://Core Rulebook/Classes/Sorcerer/Sorcerer Bloodlines/Celestial/Bloodline Powers/Ascension",
            "ability_types":{
              "ability_type":"Supernatural"
            },
            "source":"Core Rulebook",
            "type":"ability"
          }
        ],
        "name":"Bloodline Powers",
        "source":"Core Rulebook"
      }
    ]
  },
  {
    "description":"Your family is destined for greatness in some way. Your birth could have been foretold in prophecy, or perhaps it occurred during an especially auspicious event, such as a solar eclipse. Regardless of your bloodline's origin, you have a great future ahead.",
    "name":"Destined",
    "source":"Core Rulebook",
    "sections":[
      {
        "description":"Knowledge (history).",
        "source":"Core Rulebook",
        "type":"section",
        "name":"Class Skill"
      },
      {
        "description":":<i> alarm</i> (3rd), <i>blur</i> (5th), <i>protection from energy</i> (7th), <i>freedom of movement</i> (9th), <i>break enchantment</i> (11th), <i>mislead</i> (13th), <i>spell turning</i> (15th), <i>moment of prescience</i> (17th), <i>foresight</i> (19th).",
        "source":"Core Rulebook",
        "type":"section",
        "name":"Bonus Spells"
      },
      {
        "description":"Arcane Strike, Diehard, Endurance, Leadership, Lightning Reflexes, Maximize Spell, Skill Focus (Knowledge [history]), Weapon Focus.",
        "source":"Core Rulebook",
        "type":"section",
        "name":"Bonus Feats"
      },
      {
        "description":"Whenever you cast a spell with a range of &ldquo;personal,&rdquo; you gain a luck bonus equal to the spell's level on all your saving throws for 1 round.",
        "source":"Core Rulebook",
        "type":"section",
        "name":"Bloodline Arcana"
      },
      {
        "description":"You are destined for great things, and the powers that you gain serve to protect you.",
        "type":"section",
        "sections":[
          {
            "description":" <i></i>At 1st level, you can touch a creature as a standard action, giving it an insight bonus on attack rolls, skill checks, ability checks, and saving throws equal to 1/2 your sorcerer level (minimum 1) for 1 round. You can use this ability a number of times per day equal to 3 + your Charisma modifier.",
            "name":"Touch of Destiny",
            "url":"pfsrd://Core Rulebook/Classes/Sorcerer/Sorcerer Bloodlines/Destined/Bloodline Powers/Touch of Destiny",
            "ability_types":{
              "ability_type":"Spell-Like"
            },
            "source":"Core Rulebook",
            "type":"ability"
          },
          {
            "description":" <i></i>Starting at 3rd level, you gain a +1 luck bonus on all of your saving throws and to your AC during surprise rounds (see Combat) and when you are otherwise unaware of an attack. At 7th level and every four levels thereafter, this bonus increases by +1, to a maximum of +5 at 19th level.",
            "name":"Fated",
            "url":"pfsrd://Core Rulebook/Classes/Sorcerer/Sorcerer Bloodlines/Destined/Bloodline Powers/Fated",
            "ability_types":{
              "ability_type":"Supernatural"
            },
            "source":"Core Rulebook",
            "type":"ability"
          },
          {
            "description":" <i></i>At 9th level, you may reroll any one attack roll, critical hit confirmation roll, or level check made to overcome spell resistance. You must decide to use this ability after the first roll is made but before the results are revealed by the GM. You must take the second result, even if it is worse. At 9th level, you can use this ability once per day. At 17th level, you can use this ability twice per day.",
            "name":"It Was Meant To Be",
            "url":"pfsrd://Core Rulebook/Classes/Sorcerer/Sorcerer Bloodlines/Destined/Bloodline Powers/It Was Meant To Be",
            "ability_types":{
              "ability_type":"Supernatural"
            },
            "source":"Core Rulebook",
            "type":"ability"
          },
          {
            "description":" <i></i>At 15th level, your ultimate destiny is drawing near. Once per day, when an attack or spell that causes damage would result in your death, you may attempt a DC 20 Will save. If successful, you are instead reduced to &ndash;1 hit points and are automatically stabilized. The bonus from your fated ability applies to this save.",
            "name":"Within Reach",
            "url":"pfsrd://Core Rulebook/Classes/Sorcerer/Sorcerer Bloodlines/Destined/Bloodline Powers/Within Reach",
            "ability_types":{
              "ability_type":"Supernatural"
            },
            "source":"Core Rulebook",
            "type":"ability"
          },
          {
            "description":" <i></i>At 20th level, your moment of destiny is at hand. Any critical threats made against you only confirm if the second roll results in a natural 20 on the die. Any critical threats you score with a spell are automatically confirmed. Once per day, you can automatically succeed at one caster level check made to overcome spell resistance. You must use this ability before making the roll.",
            "name":"Destiny Realized",
            "url":"pfsrd://Core Rulebook/Classes/Sorcerer/Sorcerer Bloodlines/Destined/Bloodline Powers/Destiny Realized",
            "ability_types":{
              "ability_type":"Supernatural"
            },
            "source":"Core Rulebook",
            "type":"ability"
          }
        ],
        "name":"Bloodline Powers",
        "source":"Core Rulebook"
      }
    ]
  },
  {
    "description":"At some point in your family's history, a dragon interbred with your bloodline, and now its ancient power flows through your veins. ",
    "name":"Draconic",
    "source":"Core Rulebook",
    "sections":[
      {
        "description":"Perception.",
        "source":"Core Rulebook",
        "type":"section",
        "name":"Class Skill"
      },
      {
        "description":"<i>mage armor</i> (3rd), <i>resist energy</i> (5th), <i>fly</i> (7th), <i>fear</i> (9th), <i>spell resistance</i> (11th), <i>form of the dragon I</i> (13th), <i>form of the dragon II</i> (15th), <i>form of the dragon III</i> (17th), <i>wish</i> (19th).",
        "source":"Core Rulebook",
        "type":"section",
        "name":"Bonus Spells"
      },
      {
        "description":"Blind-Fight, Great Fortitude, Improved Initiative, Power Attack, Quicken Spell, Skill Focus (Fly), Skill Focus (Knowledge [arcana]), Toughness.",
        "source":"Core Rulebook",
        "type":"section",
        "name":"Bonus Feats"
      },
      {
        "description":"Whenever you cast a spell with an energy descriptor that matches your draconic bloodline's energy type, that spell deals +1 point of damage per die rolled.",
        "source":"Core Rulebook",
        "type":"section",
        "name":"Bloodline Arcana"
      },
      {
        "description":"The power of dragons flows through you and manifests in a number of ways. At 1st level, you must select one of the chromatic or metallic dragon types. This choice cannot be changed. A number of your abilities grant resistances and deal damage based on your dragon type, as noted on the following table.",
        "type":"section",
        "sections":[
          {
            "description":"<table><thead><tr><th>Dragon Type</th><th>Energy Type</th><th>Breath Shape</th></tr></thead><tbody><tr class=\"odd\"><td>Black</td><td>Acid</td><td>60-foot line</td></tr><tr class=\"even\"><td>Blue</td><td>Electricity</td><td>60-foot line</td></tr><tr class=\"odd\"><td>Green</td><td>Acid</td><td>30-foot cone</td></tr><tr class=\"even\"><td>Red</td><td>Fire</td><td>30-foot cone</td></tr><tr class=\"odd\"><td>White</td><td>Cold</td><td>30-foot cone</td></tr><tr class=\"even\"><td>Brass</td><td>Fire</td><td>60-foot line</td></tr><tr class=\"odd\"><td>Bronze</td><td>Electricity</td><td>60-foot line</td></tr><tr class=\"even\"><td>Copper</td><td>Acid</td><td>60-foot line</td></tr><tr class=\"odd\"><td>Gold</td><td>Fire</td><td>30-foot cone</td></tr><tr class=\"even\"><td>Silver</td><td>Cold</td><td>30-foot cone</td></tr></tbody></table>",
            "url":"pfsrd://Core Rulebook/Classes/Sorcerer/Sorcerer Bloodlines/Draconic/Bloodline Powers/Dragon Type",
            "type":"table",
            "name":"Dragon Type",
            "source":"Core Rulebook"
          },
          {
            "description":"Starting at 1st level, you can grow claws as a free action. These claws are treated as natural weapons, allowing you to make two claw attacks as a full attack action using your full base attack bonus. Each of these attacks deals 1d4 points of damage plus your Strength modifier (1d3 if you are Small). At 5th level, these claws are considered magic weapons for the purpose of overcoming DR. At 7th level, the damage increases by one step to 1d6 points of damage (1d4 if you are Small). At 11th level, these claws deal an additional 1d6 points of damage of your energy type on a successful hit. You can use your claws for a number of rounds per day equal to 3 + your Charisma modifier. These rounds do not need to be consecutive.",
            "name":"Claws",
            "url":"pfsrd://Core Rulebook/Classes/Sorcerer/Sorcerer Bloodlines/Draconic/Bloodline Powers/Claws",
            "ability_types":{
              "ability_type":"Supernatural"
            },
            "source":"Core Rulebook",
            "type":"ability"
          },
          {
            "description":"At 3rd level, you gain resist 5 against your energy type and a +1 natural armor bonus. At 9th level, your energy resistance increases to 10 and natural armor bonus increases to +2. At 15th level, your natural armor bonus increases to +4.",
            "name":"Dragon Resistances",
            "url":"pfsrd://Core Rulebook/Classes/Sorcerer/Sorcerer Bloodlines/Draconic/Bloodline Powers/Dragon Resistances",
            "ability_types":{
              "ability_type":"Extraordinary"
            },
            "source":"Core Rulebook",
            "type":"ability"
          },
          {
            "description":"At 9th level, you gain a breath weapon. This breath weapon deals 1d6 points of damage of your energy type per sorcerer level. Those caught in the area of the breath receive a Reflex save for half damage. The DC of this save is equal to 10 + 1/2 your sorcerer level + your Charisma modifier. The shape of the breath weapon depends on your dragon type (as indicated on the above chart). At 9th level, you can use this ability once per day. At 17th level, you can use this ability twice per day. At 20th level, you can use this ability three times per day.",
            "name":"Breath Weapon",
            "url":"pfsrd://Core Rulebook/Classes/Sorcerer/Sorcerer Bloodlines/Draconic/Bloodline Powers/Breath Weapon",
            "ability_types":{
              "ability_type":"Supernatural"
            },
            "source":"Core Rulebook",
            "type":"ability"
          },
          {
            "description":" <i></i>At 15th level, leathery dragon wings grow from your back as a standard action, giving you a fly speed of 60 feet with average maneuverability. You can dismiss the wings as a free action.",
            "name":"Wings",
            "url":"pfsrd://Core Rulebook/Classes/Sorcerer/Sorcerer Bloodlines/Draconic/Bloodline Powers/Wings",
            "ability_types":{
              "ability_type":"Supernatural"
            },
            "source":"Core Rulebook",
            "type":"ability"
          },
          {
            "description":" <i></i>At 20th level, your draconic heritage becomes manifest. You gain immunity to paralysis, sleep, and damage of your energy type. You also gain blindsense 60 feet.",
            "name":"Power of Wyrms",
            "url":"pfsrd://Core Rulebook/Classes/Sorcerer/Sorcerer Bloodlines/Draconic/Bloodline Powers/Power of Wyrms",
            "ability_types":{
              "ability_type":"Supernatural"
            },
            "source":"Core Rulebook",
            "type":"ability"
          }
        ],
        "name":"Bloodline Powers",
        "source":"Core Rulebook"
      }
    ]
  },
  {
    "description":"The power of the elements resides in you, and at times you can hardly control its fury. This influence comes from an elemental outsider in your family history or a time when you or your relatives were exposed to a powerful elemental force.",
    "name":"Elemental",
    "source":"Core Rulebook",
    "sections":[
      {
        "description":"Knowledge (planes).",
        "source":"Core Rulebook",
        "type":"section",
        "name":"Class Skill"
      },
      {
        "description":"<i>burning hands</i>* (3rd), <i>scorching ray</i>* (5th), <i>protection from energy</i> (7th), <i>elemental body I</i> (9th), <i>elemental body II</i> (11th), <i>elemental body III</i> (13th), <i>elemental body IV</i> (15th), <i>summon monster VIII</i> (elementals only) (17th), <i>elemental swarm</i> (19th).*These spells always deal a type of damage determined by your element. In addition, the subtype of these spells changes to match the energy type of your element.",
        "source":"Core Rulebook",
        "type":"section",
        "name":"Bonus Spells"
      },
      {
        "description":"Dodge, Empower Spell, Great Fortitude, Improved Initiative, Lightning Reflexes, Power Attack, Skill Focus (Knowledge [planes]), Weapon Finesse.",
        "source":"Core Rulebook",
        "type":"section",
        "name":"Bonus Feats"
      },
      {
        "description":"Whenever you cast a spell that deals energy damage, you can change the type of damage to match the type of your bloodline. This also changes the spell's type to match the type of your bloodline.",
        "source":"Core Rulebook",
        "type":"section",
        "name":"Bloodline Arcana"
      },
      {
        "description":"One of the four elements infuses your being, and you can draw upon its power in times of need. At first level, you must select one of the four elements: air, earth, fire, or water. This choice cannot be changed. A number of your abilities grant resistances and deal damage based on your element, as noted below.",
        "type":"section",
        "sections":[
          {
            "description":"<table><thead><tr><th>Element</th><th>Energy Type</th><th>Elemental Movement</th></tr></thead><tbody><tr class=\"odd\"><td>Air</td><td>Electricity</td><td>Fly 60 feet (average)</td></tr><tr class=\"even\"><td>Earth</td><td>Acid</td><td>Burrow 30 feet</td></tr><tr class=\"odd\"><td>Fire</td><td>Fire</td><td>+30 feet base speed</td></tr><tr class=\"even\"><td>Water</td><td>Cold</td><td>Swim 60 feet</td></tr></tbody></table>",
            "url":"pfsrd://Core Rulebook/Classes/Sorcerer/Sorcerer Bloodlines/Elemental/Bloodline Powers/Element",
            "type":"table",
            "name":"Element",
            "source":"Core Rulebook"
          },
          {
            "description":" <i></i>Starting at 1st level, you can unleash an elemental ray as a standard action, targeting any foe within 30 feet as a ranged touch attack. This ray deals 1d6 points of damage of your energy type + 1 for every two sorcerer levels you possess. You can use this ability a number of times per day equal to 3 + your Charisma modifier.",
            "name":"Elemental Ray",
            "url":"pfsrd://Core Rulebook/Classes/Sorcerer/Sorcerer Bloodlines/Elemental/Bloodline Powers/Elemental Ray",
            "ability_types":{
              "ability_type":"Spell-Like"
            },
            "source":"Core Rulebook",
            "type":"ability"
          },
          {
            "description":" <i></i>At 3rd level, you gain energy resistance 10 against your energy type. At 9th level, your energy resistance increases to 20.",
            "name":"Elemental Resistance",
            "url":"pfsrd://Core Rulebook/Classes/Sorcerer/Sorcerer Bloodlines/Elemental/Bloodline Powers/Elemental Resistance",
            "ability_types":{
              "ability_type":"Extraordinary"
            },
            "source":"Core Rulebook",
            "type":"ability"
          },
          {
            "description":" <i></i>At 9th level, you can unleash a blast of elemental power once per day. This 20-foot-radius burst does 1d6 points of damage of your energy type per sorcerer level. Those caught in the area of your blast receive a Reflex save for half damage. Creatures that fail their saves gain vulnerability to your energy type until the end of your next turn. The DC of this save is equal to 10 + 1/2 your sorcerer level + your Charisma modifier. At 9th level, you can use this ability once per day. At 17th level, you can use this ability twice per day. At 20th level, you can use this ability three times per day. This power has a range of 60 feet.",
            "name":"Elemental Blast",
            "url":"pfsrd://Core Rulebook/Classes/Sorcerer/Sorcerer Bloodlines/Elemental/Bloodline Powers/Elemental Blast",
            "ability_types":{
              "ability_type":"Spell-Like"
            },
            "source":"Core Rulebook",
            "type":"ability"
          },
          {
            "description":" <i></i>At 15th level, you gain a special movement type or bonus. This ability is based on your chosen element, as indicated on the above chart.",
            "name":"Elemental Movement",
            "url":"pfsrd://Core Rulebook/Classes/Sorcerer/Sorcerer Bloodlines/Elemental/Bloodline Powers/Elemental Movement",
            "ability_types":{
              "ability_type":"Supernatural"
            },
            "source":"Core Rulebook",
            "type":"ability"
          },
          {
            "description":"At 20th level, elemental power surges through your body. You gain immunity to sneak attacks, critical hits, and damage from your energy type.",
            "name":"Elemental Body",
            "url":"pfsrd://Core Rulebook/Classes/Sorcerer/Sorcerer Bloodlines/Elemental/Bloodline Powers/Elemental Body",
            "ability_types":{
              "ability_type":"Supernatural"
            },
            "source":"Core Rulebook",
            "type":"ability"
          }
        ],
        "name":"Bloodline Powers",
        "source":"Core Rulebook"
      }
    ]
  },
  {
    "description":"The capricious nature of the fey runs in your family due to some intermingling of fey blood or magic. You are more emotional than most, prone to bouts of joy and rage.",
    "name":"Fey",
    "source":"Core Rulebook",
    "sections":[
      {
        "description":"Knowledge (nature).",
        "source":"Core Rulebook",
        "type":"section",
        "name":"Class Skill"
      },
      {
        "description":"<i>entangle</i> (3rd), <i>hideous laughter</i> (5th), <i>deep slumber</i> (7th), <i>poison</i> (9th), <i>tree stride</i> (11th), <i>mislead</i> (13th), <i>phase door</i> (15th), <i>irresistible dance</i> (17th), <i>shapechange</i> (19th).",
        "source":"Core Rulebook",
        "type":"section",
        "name":"Bonus Spells"
      },
      {
        "description":"Dodge, Improved Initiative, Lightning Reflexes, Mobility, Point Blank Shot, Precise Shot, Quicken Spell, Skill Focus (Knowledge [nature]).",
        "source":"Core Rulebook",
        "type":"section",
        "name":"Bonus Feats"
      },
      {
        "description":"Whenever you cast a spell of the compulsion subschool, increase the spell's DC by +2.",
        "source":"Core Rulebook",
        "type":"section",
        "name":"Bloodline Arcana"
      },
      {
        "description":"You have always had a tie to the natural world, and as your power increases, so does the influence of the fey over your magic.",
        "type":"section",
        "sections":[
          {
            "description":" <i></i>At 1st level, you can cause a creature to burst out laughing for 1 round as a melee touch attack. A laughing creature can only take a move action but can defend itself normally. Once a creature has been affected by laughing touch, it is immune to its effects for 24 hours. You can use this ability a number of times per day equal to 3 + your Charisma modifier. This is a mind-affecting effect.",
            "name":"Laughing Touch",
            "url":"pfsrd://Core Rulebook/Classes/Sorcerer/Sorcerer Bloodlines/Fey/Bloodline Powers/Laughing Touch",
            "ability_types":{
              "ability_type":"Spell-Like"
            },
            "source":"Core Rulebook",
            "type":"ability"
          },
          {
            "description":" <i></i>At 3rd level, you can move through any sort of undergrowth (such as natural thorns, briars, overgrown areas, and similar terrain) at your normal speed and without taking damage or suffering any other impairment. Thorns, briars, and overgrown areas that have been magically manipulated to impede motion, however, still affect you.",
            "name":"Woodland Stride",
            "url":"pfsrd://Core Rulebook/Classes/Sorcerer/Sorcerer Bloodlines/Fey/Bloodline Powers/Woodland Stride",
            "ability_types":{
              "ability_type":"Extraordinary"
            },
            "source":"Core Rulebook",
            "type":"ability"
          },
          {
            "description":" <i></i>At 9th level, you can turn invisible for a number of rounds per day equal to your sorcerer level. This ability functions as <i>greater invisibility</i>. These rounds need not be consecutive.",
            "name":"Fleeting Glance",
            "url":"pfsrd://Core Rulebook/Classes/Sorcerer/Sorcerer Bloodlines/Fey/Bloodline Powers/Fleeting Glance",
            "ability_types":{
              "ability_type":"Spell-Like"
            },
            "source":"Core Rulebook",
            "type":"ability"
          },
          {
            "description":"At 15th level, you may reroll any caster level check made to overcome spell resistance. You must decide to use this ability before the results are revealed by the GM. You must take the second result, even if it is worse. You can use this ability at will.",
            "name":"Fey Magic",
            "url":"pfsrd://Core Rulebook/Classes/Sorcerer/Sorcerer Bloodlines/Fey/Bloodline Powers/Fey Magic",
            "ability_types":{
              "ability_type":"Supernatural"
            },
            "source":"Core Rulebook",
            "type":"ability"
          },
          {
            "description":" <i></i>At 20th level, your soul becomes one with the world of the fey. You gain immunity to poison and DR 10/cold iron. Creatures of the animal type do not attack you unless compelled to do so through magic. Once per day, you can cast <i>shadow walk</i> as a spell-like ability using your sorcerer level as your caster level.",
            "name":"Soul of the Fey",
            "url":"pfsrd://Core Rulebook/Classes/Sorcerer/Sorcerer Bloodlines/Fey/Bloodline Powers/Soul of the Fey",
            "ability_types":{
              "ability_type":"Supernatural"
            },
            "source":"Core Rulebook",
            "type":"ability"
          }
        ],
        "name":"Bloodline Powers",
        "source":"Core Rulebook"
      }
    ]
  },
  {
    "description":"Somewhere in your family's history, a relative made a deal with a devil, and that pact has influenced your family line ever since. In you, it manifests in direct and obvious ways, granting you powers and abilities. While your fate is still your own, you can't help but wonder if your ultimate reward is bound to the Pit.",
    "name":"Infernal",
    "source":"Core Rulebook",
    "sections":[
      {
        "description":"Diplomacy.",
        "source":"Core Rulebook",
        "type":"section",
        "name":"Class Skill"
      },
      {
        "description":"<i>protection from good</i> (3rd), <i>scorching ray</i> (5th), <i>suggestion</i> (7th), <i>charm monster</i> (9th), <i>dominate person</i> (11th), <i>planar binding</i> (devils and creatures with the fiendish template only) (13th), <i>greater teleport</i> (15th), <i>power word stun</i> (17th), <i>meteor swarm</i> (19th).",
        "source":"Core Rulebook",
        "type":"section",
        "name":"Bonus Spells"
      },
      {
        "description":"Blind-Fight, Combat Expertise, Deceitful, Extend Spell, Improved Disarm, Iron Will, Skill Focus (Knowledge [planes]), Spell Penetration.",
        "source":"Core Rulebook",
        "type":"section",
        "name":"Bonus Feats"
      },
      {
        "description":"Whenever you cast a spell of the charm subschool, increase the spell's DC by +2.",
        "source":"Core Rulebook",
        "type":"section",
        "name":"Bloodline Arcana"
      },
      {
        "description":"You can draw upon the power of Hell, although you must be wary of its corrupting influence. Such power does not come without a price.",
        "type":"section",
        "sections":[
          {
            "description":" <i></i>At 1st level, you can cause a creature to become shaken as a melee touch attack. This effect persists for a number of rounds equal to 1/2 your sorcerer level (minimum 1). Creatures shaken by this ability radiate an aura of evil, as if they were an evil outsider (see <i>detect evil</i>). Multiple touches do not stack, but they do add to the duration. You can use this ability a number of times per day equal to 3 + your Charisma modifier.",
            "name":"Corrupting Touch",
            "url":"pfsrd://Core Rulebook/Classes/Sorcerer/Sorcerer Bloodlines/Infernal/Bloodline Powers/Corrupting Touch",
            "ability_types":{
              "ability_type":"Spell-Like"
            },
            "source":"Core Rulebook",
            "type":"ability"
          },
          {
            "description":" <i></i>At 3rd level, you gain resist fire 5 and a +2 bonus on saving throws made against poison. At 9th level, your resistance to fire increases to 10 and your bonus on poison saving throws increases to +4.",
            "name":"Infernal Resistances",
            "url":"pfsrd://Core Rulebook/Classes/Sorcerer/Sorcerer Bloodlines/Infernal/Bloodline Powers/Infernal Resistances",
            "ability_types":{
              "ability_type":"Extraordinary"
            },
            "source":"Core Rulebook",
            "type":"ability"
          },
          {
            "description":"At 9th level, you can call down a column of hellfire. This 10-foot-radius burst does 1d6 points of fire damage per sorcerer level. Those caught in the area of your blast receive a Reflex save for half damage. Good creatures that fail their saves are shaken for a number of rounds equal to your sorcerer level. The DC of this save is equal to 10 + 1/2 your sorcerer level + your Charisma modifier. At 9th level, you can use this ability once per day. At 17th level, you can use this ability twice per day. At 20th level, you can use this ability three times per day. This power has a range of 60 feet.",
            "name":"Hellfire",
            "url":"pfsrd://Core Rulebook/Classes/Sorcerer/Sorcerer Bloodlines/Infernal/Bloodline Powers/Hellfire",
            "ability_types":{
              "ability_type":"Spell-Like"
            },
            "source":"Core Rulebook",
            "type":"ability"
          },
          {
            "description":" <i></i>At 15th level, you can grow fearsome bat wings as a standard action, giving you a fly speed of 60 feet with average maneuverability. The wings can be dismissed as a free action.",
            "name":"On Dark Wings",
            "url":"pfsrd://Core Rulebook/Classes/Sorcerer/Sorcerer Bloodlines/Infernal/Bloodline Powers/On Dark Wings",
            "ability_types":{
              "ability_type":"Supernatural"
            },
            "source":"Core Rulebook",
            "type":"ability"
          },
          {
            "description":" <i></i>At 20th level, your form becomes infused with vile power. You gain immunity to fire and poison. You also gain resistance to acid 10 and cold 10, and the ability to see perfectly in darkness of any kind to a range of 60 feet.",
            "name":"Power of the Pit",
            "url":"pfsrd://Core Rulebook/Classes/Sorcerer/Sorcerer Bloodlines/Infernal/Bloodline Powers/Power of the Pit",
            "ability_types":{
              "ability_type":"Supernatural"
            },
            "source":"Core Rulebook",
            "type":"ability"
          }
        ],
        "name":"Bloodline Powers",
        "source":"Core Rulebook"
      }
    ]
  },
  {
    "description":"The taint of the grave runs through your family. Perhaps one of your ancestors became a powerful lich or vampire, or maybe you were born dead before suddenly returning to life. Either way, the forces of death move through you and touch your every action.",
    "name":"Undead",
    "source":"Core Rulebook",
    "sections":[
      {
        "description":"Knowledge (religion).",
        "source":"Core Rulebook",
        "type":"section",
        "name":"Class Skill"
      },
      {
        "description":"<i>chill touch</i> (3rd), <i>false life</i> (5th), <i>vampiric touch</i> (7th), <i>animate dead</i> (9th), <i>waves of fatigue</i> (11th), <i>undeath to death</i> (13th), <i>finger of death</i> (15th), <i>horrid wilting</i> (17th), <i>energy drain</i> (19th).",
        "source":"Core Rulebook",
        "type":"section",
        "name":"Bonus Spells"
      },
      {
        "description":"Combat Casting, Diehard, Endurance, Iron Will, Skill Focus (Knowledge [religion]), Spell Focus, Still Spell, Toughness.",
        "source":"Core Rulebook",
        "type":"section",
        "name":"Bonus Feats"
      },
      {
        "description":"Some undead are susceptible to your mind-affecting spells. Corporeal undead that were once humanoids are treated as humanoids for the purposes of determining which spells affect them.",
        "source":"Core Rulebook",
        "type":"section",
        "name":"Bloodline Arcana"
      },
      {
        "description":"You can call upon the foul powers of the afterlife. Unfortunately, the more you draw upon them, the closer you come to joining them.",
        "type":"section",
        "sections":[
          {
            "description":"Starting at 1st level, you can make a melee touch attack as a standard action that causes a living creature to become shaken for a number of rounds equal to 1/2 your sorcerer level (minimum 1). If you touch a shaken creature with this ability, it becomes frightened for 1 round if it has fewer Hit Dice than your sorcerer level. You can use this ability a number of times per day equal to 3 + your Charisma modifier.",
            "name":"Grave Touch",
            "url":"pfsrd://Core Rulebook/Classes/Sorcerer/Sorcerer Bloodlines/Undead/Bloodline Powers/Grave Touch",
            "ability_types":{
              "ability_type":"Spell-Like"
            },
            "source":"Core Rulebook",
            "type":"ability"
          },
          {
            "description":" <i></i>At 3rd level, you gain resist cold 5 and DR 5/&mdash; against nonlethal damage. At 9th level, your resistance to cold increases to 10 and your DR increases to 10/&mdash; against nonlethal damage.",
            "name":"Death's Gift",
            "url":"pfsrd://Core Rulebook/Classes/Sorcerer/Sorcerer Bloodlines/Undead/Bloodline Powers/Deaths Gift",
            "ability_types":{
              "ability_type":"Supernatural"
            },
            "source":"Core Rulebook",
            "type":"ability"
          },
          {
            "description":" <i></i>At 9th level, you can cause a swarm of skeletal arms to burst from the ground to rip and tear at your foes. The skeletal arms erupt from the ground in a 20-foot-radius burst. Anyone in this area takes 1d6 points of slashing damage per sorcerer level. Those caught in the area receive a Reflex save for half damage. Those who fail the save are unable to move for 1 round. The DC of this save is equal to 10 + 1/2 your sorcerer level + your Charisma modifier. The skeletal arms disappear after 1 round. The arms must burst up from a solid surface. At 9th level, you can use this ability once per day. At 17th level, you can use this ability twice per day. At 20th level, you can use this ability three times per day. This power has a range of 60 feet.",
            "name":"Grasp of the Dead",
            "url":"pfsrd://Core Rulebook/Classes/Sorcerer/Sorcerer Bloodlines/Undead/Bloodline Powers/Grasp of the Dead",
            "ability_types":{
              "ability_type":"Spell-Like"
            },
            "source":"Core Rulebook",
            "type":"ability"
          },
          {
            "description":" <i></i>At 15th level, you can become incorporeal for 1 round per sorcerer level. While in this form, you gain the incorporeal subtype. You only take half damage from corporeal sources as long as they are magic (you take no damage from non-magic weapons and objects). Likewise, your spells deal only half damage to corporeal creatures. Spells and other effects that do not deal damage function normally. You can use this ability once per day.",
            "name":"Incorporeal Form",
            "url":"pfsrd://Core Rulebook/Classes/Sorcerer/Sorcerer Bloodlines/Undead/Bloodline Powers/Incorporeal Form",
            "ability_types":{
              "ability_type":"Spell-Like"
            },
            "source":"Core Rulebook",
            "type":"ability"
          },
          {
            "description":" <i></i>At 20th level, your form begins to rot (the appearance of this decay is up to you) and undead see you as one of them. You gain immunity to cold, nonlethal damage, paralysis, and sleep. You also gain DR 5/&mdash;. Unintelligent undead do not notice you unless you attack them. You receive a +4 morale bonus on saving throws made against spells and spell-like abilities cast by undead.",
            "name":"One of Us",
            "url":"pfsrd://Core Rulebook/Classes/Sorcerer/Sorcerer Bloodlines/Undead/Bloodline Powers/One of Us",
            "ability_types":{
              "ability_type":"Extraordinary"
            },
            "source":"Core Rulebook",
            "type":"ability"
          }
        ],
        "name":"Bloodline Powers",
        "source":"Core Rulebook"
      }
    ]
  }
];

const specialAbilities = [
  {
    "description":"Sorcerers are proficient with all simple weapons. They are not proficient with any type of armor or shield. Armor interferes with a sorcerer's gestures, which can cause her spells with somatic components to fail (see Arcane Spells and Armor).",
    "source":"Core Rulebook",
    "name":"Weapon and Armor Proficiency"
  },
  {
    "description":"A sorcerer casts arcane spells drawn primarily from the sorcerer/wizard spell list presented in Spell Lists. She can cast any spell she knows without preparing it ahead of time. To learn or cast a spell, a sorcerer must have a Charisma score equal to at least 10 + the spell level. The Difficulty Class for a saving throw against a sorcerer's spell is 10 + the spell level + the sorcerer's Charisma modifier.Like other spellcasters, a sorcerer can cast only a certain number of spells of each spell level per day. Her base daily spell allotment is given on Table: Sorcerer. In addition, she receives bonus spells per day if she has a high Charisma score (see Table: Ability Modifiers and Bonus Spells).A sorcerer's selection of spells is extremely limited. A sorcerer begins play knowing four 0-level spells and two 1st-level spells of her choice. At each new sorcerer level, she gains one or more new spells, as indicated on Table: Sorcerer Spells Known. (Unlike spells per day, the number of spells a sorcerer knows is not affected by her Charisma score; the numbers on Table: Sorcerer Spells Known are fixed.) These new spells can be common spells chosen from the sorcerer/wizard spell list, or they can be unusual spells that the sorcerer has gained some understanding of through study. Upon reaching 4th level, and at every even-numbered sorcerer level after that (6th, 8th, and so on), a sorcerer can choose to learn a new spell in place of one she already knows. In effect, the sorcerer loses the old spell in exchange for the new one. The new spell's level must be the same as that of the spell being exchanged. A sorcerer may swap only a single spell at any given level, and must choose whether or not to swap the spell at the same time that she gains new spells known for the level.Unlike a wizard or a cleric, a sorcerer need not prepare her spells in advance. She can cast any spell she knows at any time, assuming she has not yet used up her spells per day for that spell level.",
    "source":"Core Rulebook",
    "name":"Spells"
  },
  {
    "description":"Each sorcerer has a source of magic somewhere in her heritage that grants her spells, bonus feats, an additional class skill, and other special abilities. This source can represent a blood relation or an extreme event involving a creature somewhere in the family's past. For example, a sorcerer might have a dragon as a distant relative or her grandfather might have signed a terrible contract with a devil. Regardless of the source, this influence manifests in a number of ways as the sorcerer gains levels. A sorcerer must pick one bloodline upon taking her first level of sorcerer. Once made, this choice cannot be changed.At 3rd level, and every two levels thereafter, a sorcerer learns an additional spell, derived from her bloodline. These spells are in addition to the number of spells given on Table: Sorcerer Spells Known. These spells cannot be exchanged for different spells at higher levels.At 7th level, and every six levels thereafter, a sorcerer receives one bonus feat, chosen from a list specific to each bloodline. The sorcerer must meet the prerequisites for these bonus feats. ",
    "name":"Bloodline",
    "source":"Core Rulebook",
    isParent: true
  },
  {
    "name": "Bloodline Selection",
    "selection": "bloodlinePowers",
    "parentName": 'Bloodline'
  },
  {
    "description":"Sorcerers learn a number of cantrips, or 0-level spells. These spells are cast like any other spell, but they do not consume any slots and may be used again.",
    "name":"Cantrips",
    "source":"Core Rulebook"
  },
  {
    "description":"A sorcerer gains Eschew Materials as a bonus feat at 1st level.",
    "name":"Eschew Materials",
    "source":"Core Rulebook"
  }
];
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
    bloodlinePowers,
    advancement,
    isCaster: true,
    prepareSpells: false,
    primaryAbilityScore: 'cha',
    spellsByLevel: [spells.filter(x => x.sor === 0), spells.filter(x => x.sor === 1), spells.filter(x => x.sor === 2), spells.filter(x => x.sor === 3), spells.filter(x => x.sor === 4), spells.filter(x => x.sor === 5), 
                    spells.filter(x => x.sor === 6), spells.filter(x => x.sor === 7), spells.filter(x => x.sor === 8), spells.filter(x => x.sor === 9)],
    levels: [
        {
          level: 1, 
          classAbilities: ['Bloodline', 'Bloodline Selection', 'Cantrips', 'Eschew Materials', 'Weapon and Armor Proficiency'],
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
          classAbilities: [],
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
          classAbilities: [], 
          spellsPerDay: [0, 6, 4, 0, 0, 0, 0, 0, 0, 0],
          spellsKnown:  [6, 4, 2, 0, 0, 0, 0, 0, 0, 0],
        },
        {
          level: 6,
          classAbilities: [],
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
          classAbilities: [],
          spellsPerDay: [0, 6, 6, 5, 3, 0, 0, 0, 0, 0],
          spellsKnown:  [8, 5, 3, 2, 1, 0, 0, 0, 0, 0],
        },
        {
          level: 9,
          classAbilities: [],
          spellsPerDay: [0, 6, 6, 6, 4, 0, 0, 0, 0, 0],
          spellsKnown:  [8, 5, 4, 3, 2, 0, 0, 0, 0, 0],
        },
        {
          level: 10,
          classAbilities: [],
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
          classAbilities: [],
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
          classAbilities: [],
          spellsPerDay: [0, 6, 6, 6, 6, 6, 5, 3, 0, 0],
          spellsKnown:  [9, 5, 5, 4, 4, 3, 2, 1, 0, 0],
        },
        {
          level: 15,
          classAbilities: [], 
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
          classAbilities: [],
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
          classAbilities: [],
          spellsPerDay: [0, 6, 6, 6, 6, 6, 6, 6, 6, 6],
          spellsKnown:  [9, 5, 5, 4, 4, 4, 3, 3, 3, 3],
        }
    ]
};

export default sorcerer;