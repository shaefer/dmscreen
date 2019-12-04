const AngelAstralDeva ={ 
    "ability_scores":{ 
      "str":26,
      "dex":19,
      "con":21,
      "int":18,
      "wis":18,
      "cha":23
    },
    "acAsInt":29,
    "alignment":"NG",
    "armor_class":{ 
      "ac":{ 
        "standard":29,
        "flat_footed":25,
        "touch":14
      },
      "ac_details":"29, touch 14, flat-footed 25 (+4 Dex, +15 natural; +4 deflection vs. evil)",
      "ac_modifiers":[ 
        { 
          "mod":4,
          "type":"Dex"
        },
        { 
          "mod":15,
          "type":"natural"
        }
      ],
      "ac_modifiers_details":"+4 Dex, +15 natural; +4 deflection vs. evil"
    },
    "aura":"protective aura",
    "base_attack":15,
    "cmb":23,
    "cmd":37,
    "cr":"14",
    "crAsNum":14,
    "creature_subtype":"angel, extraplanar, good",
    "creature_type":"Outsider",
    "defensive_abilities":"uncanny dodge",
    "description":"This tall, human-like creature has long, feathery wings and a gentle inner radiance that makes it difficult to look directly at.",
    "dr":"10/evil",
    "environment":"any good-aligned plane",
    "feats":"Alertness, Cleave, Great Fortitude, Improved Initiative, Iron Will, Power Attack, Toughness, Weapon Focus (warhammer)",
    "hdType":10,
    "hitDice":15,
    "hitPointAdjustment":90,
    "hitPoints":172,
    "hp":"172 (15d10+90)",
    "immune":"acid, cold, petrification",
    "init":8,
    "languages":"Celestial, Draconic, Infernal; truespeech",
    "melee":"+2 disrupting warhammer +26/+21/+16 (1d8+14/x3 plus stun) or slam +23 (1d8+12)",
    "melee_attacks":[ 
      [ 
        { 
          "attackText":"+2 disrupting warhammer ",
          "attackBonus":"+26/+21/+16",
          "damage":"(1d8+14/x3 plus stun)",
          "toHit":26,
          "attackCount":3,
          "weaponBased":true,
          "damage_details":[ 
            { 
              "dice":[ 
                { 
                  "numOfDice":1,
                  "numOfSides":8,
                  "adjustment":14
                }
              ],
              "critMultiplier":"x3",
              "damageType":"plus stun"
            }
          ],
          "toHitAdjustments":[ 
            0,
            -5,
            -10
          ]
        }
      ],
      [ 
        { 
          "attackText":"slam ",
          "attackBonus":"+23",
          "damage":"(1d8+12)",
          "toHit":23,
          "attackCount":1,
          "damage_details":[ 
            { 
              "dice":[ 
                { 
                  "numOfDice":1,
                  "numOfSides":8,
                  "adjustment":12
                }
              ],
              "damageType":""
            }
          ]
        }
      ]
    ],
    "name":"Angel, Astral Deva",
    "organization":"solitary, pair, or squad (3-6)",
    "resist":"electricity 10, fire 10",
    "saving_throws":{ 
      "fort":16,
      "ref":13,
      "will":11,
      "will_details":"+11; +4 vs. poison, +4 resistance vs. evil"
    },
    "sections":[ 
      { 
        "body":"<p>Astral devas are messengers of the gods of good. They watch over planar travelers and sponsor powerful mortals, pushing them to take on good causes. A typical astral deva looks human except for its wings, though some look like other humanoid races and a rare few have even more unusual forms. An astral deva is 7-1/2 feet tall and weighs 250 pounds.</p>",
        "source":"Bestiary",
        "type":"section"
      },
      { 
        "body":"<p>Astral devas are usually created by deities from the souls of good mortals, though some souls spontaneously transform into astral devas without the intervention of a deity. Their skills and abilities make them excellent scouts and elite agents for celestial armies. They often carry long, flowing scrolls upon which are writ messages and judgments from the gods. An astral deva's scrolls frequently contain hints of prophecies and major events yet to come, and as such the devas are fiercely protective of the contents of these scrolls and let none, not even other astral devas, peruse them.</p>",
        "source":"Bestiary",
        "type":"section"
      }
    ],
    "senses":"darkvision 60 ft., low-light vision; Perception +26",
    "size":"Medium",
    "skill_details":"Acrobatics +22, Craft (any one) +22, Diplomacy +24, Fly +26, Intimidate +24, Knowledge (planes) +22, Knowledge (religion) +19, Perception +26, Sense Motive +26, Stealth +22",
    "skills":[ 
      { 
        "name":"Acrobatics ",
        "value":22
      },
      { 
        "name":"Craft ",
        "value":22,
        "subName":"any one"
      },
      { 
        "name":"Diplomacy ",
        "value":24
      },
      { 
        "name":"Fly ",
        "value":26
      },
      { 
        "name":"Intimidate ",
        "value":24
      },
      { 
        "name":"Knowledge ",
        "value":22,
        "subName":"planes"
      },
      { 
        "name":"Knowledge ",
        "value":19,
        "subName":"religion"
      },
      { 
        "name":"Perception ",
        "value":26
      },
      { 
        "name":"Sense Motive",
        "value":26
      },
      { 
        "name":"Stealth ",
        "value":22
      }
    ],
    "source":"Bestiary",
    "special_abilities":[ 
      { 
        "name":"Stun",
        "description":"If an astral deva strikes an opponent twice in one round with its warhammer, that creature must succeed on a DC 25 Fortitude save or be stunned for 1d6 rounds. The save DC is Strength-based.",
        "savingThrow":{ 
          "hasSave":true,
          "SaveDc":"25",
          "SaveType":"Fortitude",
          "SaveAbilityScore":"Strength"
        },
        "type":"Supernatural"
      },
      { 
        "name":"Uncanny Dodge",
        "description":"This ability functions identically to the rogue ability. If a deva gains uncanny dodge from a class level, he instead gains improved uncanny dodge.",
        "savingThrow":{ 
          "hasSave":false
        },
        "type":"Extraordinary"
      }
    ],
    "special_qualities":"change shape (alter self)",
    "speed":"50 ft., fly 100 ft. (good)",
    "spells":[ 
      { 
        "spell-like abilities":"(CL 13th)<p class=\"stat-block-2\">At Will-<i>aid</i>, <i>continual flame</i>, <i>detect evil</i>, <i>discern lies</i> (DC 20), <i>dispel evil</i> (DC 21), <i>dispel magic</i>, <i>holy aura</i> (DC 24), <i>holy smite</i> (DC 20), <i>holy word</i> (DC 23), <i>invisibility</i> (self only), <i>plane shift</i> (DC 23), <i>remove curse</i>, <i>remove disease</i>, <i>remove fear</i></p><p class=\"stat-block-2\">7/day-<i>cure light wounds</i>, <i>see invisibility</i></p><p class=\"stat-block-2\">1/day-<i>blade barrier</i> (DC 22), <i>heal</i></p>"
      }
    ],
    "sr":25,
    "strengthInt":26,
    "treasure":"double (+2 disrupting warhammer)",
    "type":"creature",
    "url":"pfsrd://Bestiary/Monsters/Angel/Astral Deva",
    "xp":"38,400"
  };
  export default AngelAstralDeva;