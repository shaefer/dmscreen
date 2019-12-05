const Allosaurus = { 
    "ability_scores":{ 
      "str":26,
      "dex":13,
      "con":19,
      "int":2,
      "wis":15,
      "cha":10
    },
    "acAsInt":19,
    "alignment":"N",
    "armor_class":{ 
      "ac":{ 
        "standard":19,
        "flat_footed":18,
        "touch":9
      },
      "ac_details":"19, touch 9, flat-footed 18 (+1 Dex, +10 natural, -2 size)",
      "ac_modifiers":[ 
        { 
          "mod":1,
          "type":"Dex"
        },
        { 
          "mod":10,
          "type":"natural"
        },
        { 
          "mod":-2,
          "type":"size"
        }
      ],
      "ac_modifiers_details":"+1 Dex, +10 natural, -2 size"
    },
    "base_attack":8,
    "cmb":18,
    "cmd":29,
    "cr":"7",
    "crAsNum":7,
    "creature_type":"Animal",
    "description":"This bipedal dinosaur has a mouth filled with sharp teeth and short, powerful arms that end in sharp claws.",
    "environment":"temperate or warm forests or plains",
    "feats":"Alertness, Improved Critical (bite), Improved Initiative, Iron Will, Nimble Moves, Run",
    "hdType":8,
    "hitDice":11,
    "hitPointAdjustment":44,
    "hitPoints":93,
    "hp":"93 (11d8+44)",
    "init":5,
    "melee":"bite +14 (2d6+8/19-20 plus grab), 2 claws +14 (1d8+8)",
    "melee_attacks":[ 
      [ 
        { 
          "attackText":"bite ",
          "attackBonus":"+14",
          "damage":"(2d6+8/19-20 plus grab)",
          "toHit":14,
          "attackCount":1,
          "damage_details":[ 
            { 
              "dice":[ 
                { 
                  "numOfDice":2,
                  "numOfSides":6,
                  "adjustment":8
                }
              ],
              "critRange":"19-20",
              "damageType":"plus grab"
            }
          ]
        },
        { 
          "attackText":"2 claws ",
          "attackBonus":"+14",
          "damage":"(1d8+8)",
          "toHit":14,
          "attackCount":2,
          "damage_details":[ 
            { 
              "dice":[ 
                { 
                  "numOfDice":1,
                  "numOfSides":8,
                  "adjustment":8
                }
              ],
              "damageType":""
            }
          ]
        }
      ]
    ],
    "name":"Dinosaur, Allosaurus",
    "organization":"solitary, pair, or pack (3-6)",
    "racial_modifiers":"+8 Perception",
    "reach":15,
    "reach_details":"15 ft.",
    "saving_throws":{ 
      "fort":11,
      "ref":8,
      "will":7
    },
    "sections":[ 
      { 
        "body":"<p>A huge, swift hunter, the allosaurus measures 30 feet in length and weighs 10,000 pounds.</p>",
        "source":"Bestiary 2",
        "type":"section"
      },
      { 
        "ac":"+4 natural armor",
        "name":"Allosaurus",
        "source":"Bestiary 2",
        "url":"pfsrd://Bestiary 2/Monsters/Dinosaur/Allosaurus/Allosaurus",
        "speed":"40 ft.",
        "subtype":"base",
        "attack":"bite (1d6), 2 claws (1d4)",
        "type":"animal_companion",
        "ability_scores":"Str 14, Dex 16, Con 10, Int 2, Wis 15, Cha 10",
        "sections":[ 
          { 
            "ac":"+2 natural armor",
            "name":"7th-Level Advancement",
            "level":"7th",
            "url":"pfsrd://Bestiary 2/Monsters/Dinosaur/Allosaurus/Allosaurus/7th-Level Advancement",
            "subtype":"advancement",
            "attack":"bite (1d8), 2 claws (1d6)",
            "source":"Bestiary 2",
            "ability_scores":"Str +8, Dex -2, Con +4",
            "type":"animal_companion",
            "special_qualities":"grab, pounce.",
            "size":"Large"
          }
        ],
        "special_qualities":"low-light vision, scent.",
        "size":"Medium"
      }
    ],
    "senses":"low-light vision, scent; Perception +28",
    "size":"Huge",
    "skill_details":"Perception +28",
    "skills":[ 
      { 
        "name":"Perception ",
        "value":28
      }
    ],
    "source":"Bestiary 2",
    "space":15,
    "space_details":"15 ft.",
    "special_attacks":"pounce, rake (2 talons +14, 1d8+8)",
    "speed":"50 ft.",
    "strengthInt":26,
    "treasure":"None",
    "type":"creature",
    "url":"pfsrd://Bestiary 2/Monsters/Dinosaur/Allosaurus",
    "xp":"3,200"
  };
  export default Allosaurus;