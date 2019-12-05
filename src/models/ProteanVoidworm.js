const ProteanVoidWorm = { 
    "ability_scores":{ 
      "str":7,
      "dex":17,
      "con":10,
      "int":8,
      "wis":8,
      "cha":13
    },
    "acAsInt":15,
    "alignment":"CN",
    "armor_class":{ 
      "ac":{ 
        "standard":15,
        "flat_footed":12,
        "touch":15
      },
      "ac_details":"15, touch 15, flat-footed 12 (+3 Dex, +2 size)",
      "ac_modifiers":[ 
        { 
          "mod":3,
          "type":"Dex"
        },
        { 
          "mod":2,
          "type":"size"
        }
      ],
      "ac_modifiers_details":"+3 Dex, +2 size"
    },
    "base_attack":3,
    "cmb":4,
    "cmd":12,
    "cmd_details":"12 (can't be tripped)",
    "cr":"2",
    "crAsNum":2,
    "creature_subtype":"chaotic, extraplanar, protean, shapechanger",
    "creature_type":"Outsider",
    "defensive_abilities":"amorphous anatomy, freedom of movement",
    "description":"This tiny, iridescent serpent slithers through empty space, the air around it distorting as if from heat.",
    "environment":"any (Limbo)",
    "feats":"Skill Focus (Perception), Weapon Finesse",
    "hdType":10,
    "hitDice":3,
    "hitPointAdjustment":0,
    "hitPoints":16,
    "hp":"16 (3d10); fast healing 2",
    "immune":"acid",
    "init":3,
    "languages":"Common, Protean",
    "melee":"bite +8 (1d3-2), tail slap +3 (1d3-2 plus confusion)",
    "melee_attacks":[ 
      [ 
        { 
          "attackText":"bite ",
          "attackBonus":"+8",
          "damage":"(1d3-2)",
          "toHit":8,
          "attackCount":1,
          "damage_details":[ 
            { 
              "dice":[ 
                { 
                  "numOfDice":1,
                  "numOfSides":3,
                  "adjustment":-2
                }
              ],
              "damageType":""
            }
          ]
        },
        { 
          "attackText":"tail slap ",
          "attackBonus":"+3",
          "damage":"(1d3-2 plus confusion)",
          "toHit":3,
          "attackCount":1,
          "damage_details":[ 
            { 
              "dice":[ 
                { 
                  "numOfDice":1,
                  "numOfSides":3,
                  "adjustment":-2
                }
              ],
              "damageType":"plus confusion"
            }
          ]
        }
      ]
    ],
    "name":"Protean, Voidworm",
    "organization":"solitary, pair, or school (3-18)",
    "reach":0,
    "reach_details":"0 ft.",
    "resist":"electricity 10, sonic 10",
    "saving_throws":{ 
      "fort":1,
      "ref":6,
      "will":2
    },
    "sections":[ 
      { 
        "body":"<p>Debate rages as to whether or not the strange and capricious creatures called voidworms are actually proteans at all. To the wizards and sorcerers who summon them as familiars, the answer seems obvious-;these tiny dwellers of Limbo have all the requisite racial traits of proteans, down to their serpentine shapes. Yet the established protean castes find such claims outright insulting, claiming instead that it is such acts of conjuration that call voidworms forth from the raw stuff of Limbo, giving them shape and life according to the spellcasters' expectations, and that these lesser beings are but pale reflections of their formidable kin. Voidworms themselves have little to say on the matter-;creatures of the moment, and sparing little thought for the constantly mutable concept of &ldquo;reality,&rdquo; voidworms only barely grasp cause and effect, and the past has no more substance or significance for them than a dream. In order to gain a voidworm as a familiar, a spellcaster must be chaotic neutral, be caster level 7th, and have the Improved Familiar feat.</p>",
        "source":"Bestiary 2",
        "type":"section"
      },
      { 
        "body":"<p>Regardless of their actual origins, voidworms maintain a thriving ecology in the chaos of Limbo, forming together into darting, flashing schools that are often hunted for sport by naunets and other predators of chaos. Mortal wizards, however, most commonly encounter voidworms as summoned familiars. These tiny, serpentine creatures are particularly valued by illusionists, evokers, and other magical practitioners who deal with distorting or molding reality, though the familiars' bizarre logic and miniscule attention spans sometimes make them more trouble than they're worth. Still, their confusing attack and remarkable hardiness have saved more than one wizard on the battlefield, and their strange thought processes can sometimes offer unique insights in the laboratory. When traveling in more mundane lands, wizards often order voidworm familiars to use their change shape ability to disguise themselves as ordinary pets or animal familiars, though these disguises tend to slip when the voidworm grows curious or playful.</p>",
        "source":"Bestiary 2",
        "type":"section"
      },
      { 
        "body":"<p>A voidworm is only 2 feet long and weighs a mere 2 pounds. No two voidworms are exactly alike in their coloration or markings. Their two feathery wings generally take on brighter colors than the rest of their bodies, and in the case of voidworms conjured as familiars, these &ldquo;wings&rdquo; are the same color as their masters' eyes.</p>",
        "source":"Bestiary 2",
        "type":"section"
      }
    ],
    "senses":"blindsense 30 ft., darkvision 30 ft., detect law; Perception +8",
    "size":"Tiny",
    "skill_details":"Acrobatics +9 (+5 jump), Bluff +7, Escape Artist +7, Fly +19, Knowledge (arcana) +5, Perception +8, Stealth +15",
    "skills":[ 
      { 
        "name":"Acrobatics ",
        "value":9,
        "details":"+5 jump"
      },
      { 
        "name":"Bluff ",
        "value":7
      },
      { 
        "name":"Escape Artist",
        "value":7
      },
      { 
        "name":"Fly ",
        "value":19
      },
      { 
        "name":"Knowledge ",
        "value":5,
        "subName":"arcana"
      },
      { 
        "name":"Perception ",
        "value":8
      },
      { 
        "name":"Stealth ",
        "value":15
      }
    ],
    "source":"Bestiary 2",
    "space":2,
    "space_details":"2-1/2 ft.",
    "special_abilities":[ 
      { 
        "name":"Confusion",
        "description":"A creature struck by a voidworm's tail slap must make a DC 12 Will save or become confused for 1 round. This is a mind-affecting effect. The save DC is Charisma-based.",
        "savingThrow":{ 
          "hasSave":true,
          "SaveDc":"12",
          "SaveType":"Will",
          "SaveAbilityScore":"Charisma"
        },
        "type":"Supernatural"
      }
    ],
    "special_qualities":"change shape (2 forms, both of which must be Tiny animals; beast shape II)",
    "speed":"20 ft., fly 50 ft. (perfect)",
    "spells":[ 
      { 
        "spell-like abilities":"(CL 6th; concentration +7)<p class=\"stat-block-2\">Constant-<i>detect law</i></p><p class=\"stat-block-2\">At will-<i>dancing lights</i>, <i>ghost sound</i> (DC 11), <i>prestidigitation</i></p><p class=\"stat-block-2\">3/day-<i>blur</i> (self only), <i>obscuring mist</i></p><p class=\"stat-block-2\">1/week-<i>commune</i> (CL 12th, 6 questions)</p>"
      }
    ],
    "strengthInt":7,
    "treasure":"none",
    "type":"creature",
    "url":"pfsrd://Bestiary 2/Monsters/Protean/Voidworm",
    "xp":"600"
  }
  export default ProteanVoidWorm;