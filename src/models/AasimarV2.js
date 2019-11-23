const Aasimar = {
  "ability_scores": {
    "str": 8,
    "dex": 10,
    "con": 14,
    "int": 13,
    "wis": 17,
    "cha": 14
  },
  "acAsInt": 15,
  "alignment": "NG",
  "armor_class": {
    "ac": {
      "standard": 15,
      "flat_footed": 15,
      "touch": 10
    },
    "ac_details": "15, touch 10, flat-footed 15 (+5 armor)",
    "ac_modifiers": [
      {
        "mod": 5,
        "type": "armor"
      }
    ],
    "ac_modifiers_details": "+5 armor"
  },
  "base_attack": 0,
  "cmb": -1,
  "cmd": 9,
  "cr": "1/2",
  "crAsNum": 0.5,
  "creature_subtype": "native",
  "creature_type": "Outsider",
  "description": "This supernaturally beautiful woman looks human, yet emanates a strange sense of calm and benevolence.",
  "environment": "any land",
  "feats": "Turn Undead",
  "hdType": 8,
  "hitDice": 1,
  "hitPointAdjustment": 3,
  "hitPoints": 11,
  "hp": "11 (1d8+3)",
  "init": 0,
  "languages": "Celestial, Common, Draconic",
  "level": "cleric 1",
  "melee": "heavy mace -1 (1d8-1)",
  "melee_attacks": [
    [
      {
        "attackText": "heavy mace ",
        "attackBonus": "-1",
        "damage": "(1d8-1)",
        "toHit": -1,
        "attackCount": 1,
        "damage_details": [
          {
            "dice": [
              {
                "numOfDice": 1,
                "numOfSides": 8,
                "adjustment": -1
              }
            ]
          }
        ]
      }
    ]
  ],
  "name": "Aasimar",
  "organization": "solitary, pair, or team (3-6)",
  "racial_modifiers": "+2 Diplomacy, +2 Perception",
  "ranged": "light crossbow +0 (1d8/19-20)",
  "ranged_attacks": [
    [
      {
        "attackText": "light crossbow ",
        "attackBonus": "+0",
        "damage": "(1d8/19-20)",
        "toHit": 0,
        "attackCount": 1,
        "damage_details": [
          {
            "dice": [
              {
                "numOfDice": 1,
                "numOfSides": 8,
                "adjustment": 0
              }
            ],
            "critRangeAndMultiplier": "19-20"
          }
        ]
      }
    ]
  ],
  "resist": "acid 5, cold 5, electricity 5",
  "saving_throws": {
    "fort": 4,
    "ref": 0,
    "will": 5
  },
  "sections": [
    {
      "body": "<p>Aasimars are humans with a significant amount of celestial or other good outsider blood in their ancestry. Aasimars are not always good, but it is a natural tendency for them, and they gravitate to good faiths or organizations associated with celestials. Aasimar heritage can hide for generations, only to appear suddenly in the child of two apparently human parents. Most societies interpret aasimar births as good omens. Aasimars look mostly human except for some minor physical trait that reveals their unusual heritage. Typical aasimar features are hair that shines like metal, unusual eye or skin color, or even glowing golden halos. </p>",
      "source": "Bestiary",
      "type": "section"
    },
    {
      "body": "<p>Aasimars are defined by class levels-;they do not possess racial Hit Dice. Aasimars have the following racial traits.</p>",
      "name": "Aasimar",
      "source": "Bestiary",
      "url": "pfsrd://Bestiary/Monsters/Aasimar/Aasimar",
      "type": "race",
      "subtype": "monster_race",
      "sections": [
        {
          "body": "<p>Aasimars are insightful, confident, and personable.</p>",
          "source": "Bestiary",
          "type": "section",
          "name": "+2 Charisma, +2 Wisdom"
        },
        {
          "body": "<p>Aasimars have a base speed of 30 feet.</p>",
          "source": "Bestiary",
          "type": "section",
          "name": "Normal Speed"
        },
        {
          "body": "<p>Aasimars can see in the dark up to 60 feet.</p>",
          "source": "Bestiary",
          "type": "section",
          "name": "Darkvision"
        },
        {
          "body": "<p>Aasimars have a +2 racial bonus on Diplomacy and Perception checks.</p>",
          "url": "pfsrd://Bestiary/Monsters/Aasimar/Aasimar/Skilled",
          "type": "section",
          "name": "Skilled",
          "source": "Bestiary"
        },
        {
          "body": "<p>Aasimars can use <i>daylight</i> once per day as a spell-like ability (caster level equals the aasimar's class level).</p>",
          "url": "pfsrd://Bestiary/Monsters/Aasimar/Aasimar/Spell-Like Ability",
          "type": "section",
          "name": "Spell-Like Ability",
          "source": "Bestiary"
        },
        {
          "body": "<p>Aasimars have acid resistance 5, cold resistance 5, and electricity resistance 5.</p>",
          "url": "pfsrd://Bestiary/Monsters/Aasimar/Aasimar/Celestial Resistance",
          "type": "section",
          "name": "Celestial Resistance",
          "source": "Bestiary"
        },
        {
          "body": "<p>Aasimars begin play speaking Common and Celestial. Aasimars with high Intelligence scores can choose any of the following bonus languages: Draconic, Dwarven, Elven, Gnome, Halfling, and Sylvan.</p>",
          "source": "Bestiary",
          "type": "section",
          "name": "Languages"
        },
        {
          "type": "section",
          "sections": [
            {
              "body": "Aasimar Monster Entry",
              "source": "Bestiary",
              "type": "link"
            }
          ],
          "name": "See Also",
          "source": "Bestiary"
        }
      ]
    }
  ],
  "senses": "darkvision 60 ft.; Perception +5",
  "size": "Medium",
  "skill_details": "Diplomacy +8, Heal +7, Knowledge (religion) +5",
  "skills": [
    {
      "name": "Diplomacy ",
      "value": 8
    },
    {
      "name": "Heal ",
      "value": 7
    },
    {
      "name": "Knowledge ",
      "value": 5,
      "subName": "religion"
    }
  ],
  "source": "Bestiary",
  "special_attacks": "channel positive energy (5/day, 1d6, DC 12), rebuke death (1d4+1, 6/day), touch of good (6/day)",
  "speed": "30 ft. (20 ft. in armor)",
  "spells": [
    {
      "spell-like abilities": "(CL 1st)<p class=\"stat-block-2\">1/day-<i>daylight</i></p>"
    },
    {
      "spells prepared": "(CL 1st)<p class=\"stat-block-2\">1st-<i>bless</i>, <i>command</i> (DC 14), <i>protection from evil</i><sup>D</sup></p><p class=\"stat-block-2\">0 (at will)-<i>detect magic, guidance, stabilize</i></p><p class=\"stat-block-2\"><b>D</b> domain spell; <b>Domains</b> Good, Healing</p>"
    }
  ],
  "strengthInt": 8,
  "treasure": "NPC gear (scale mail, heavy mace, light crossbow with 10 bolts, other treasure)",
  "type": "creature",
  "url": "pfsrd://Bestiary/Monsters/Aasimar",
  "xp": "200"
};
export default Aasimar;