const AngelSolar = {
    "ability_scores": {
      "str": 28,
      "dex": 20,
      "con": 30,
      "int": 23,
      "wis": 27,
      "cha": 25
    },
    "acAsInt": 44,
    "alignment": "NG",
    "armor_class": {
      "ac": {
        "standard": 44,
        "flat_footed": 42,
        "touch": 11
      },
      "ac_details": "44, touch 11, flat-footed 42 (+14 armor, +1 Dex, +1 dodge, +19 natural, -1 size; +4 deflection vs. evil)",
      "ac_modifiers": [
        {
          "mod": 14,
          "type": "armor"
        },
        {
          "mod": 1,
          "type": "Dex"
        },
        {
          "mod": 1,
          "type": "dodge"
        },
        {
          "mod": 19,
          "type": "natural"
        },
        {
          "mod": -1,
          "type": "size"
        }
      ],
      "ac_modifiers_details": "+14 armor, +1 Dex, +1 dodge, +19 natural, -1 size; +4 deflection vs. evil"
    },
    "aura": "protective aura",
    "base_attack": 22,
    "cmb": 32,
    "cmd": 47,
    "cr": "23",
    "crAsNum": 23,
    "creature_subtype": "angel, extraplanar, good",
    "creature_type": "Outsider",
    "description": "This towering humanoid creature has shining topaz eyes, metallic skin, and three pairs of white wings.",
    "dr": "15/epic and evil",
    "environment": "any good-aligned plane",
    "feats": "Cleave, Deadly Aim, Dodge, Great Fortitude, Improved Initiative, Improved Sunder, Iron Will, Lightning Reflexes, Mobility, Power Attack, Toughness",
    "hdType": 10,
    "hitDice": 22,
    "hitPointAdjustment": 242,
    "hitPoints": 363,
    "hp": "363 (22d10+242); regeneration 15 (evil artifacts, effects, and spells)",
    "immune": "acid, cold, petrification",
    "init": 9,
    "languages": "Celestial, Draconic, Infernal; truespeech",
    "melee": "+5 dancing greatsword +35/+30/+25/+20 (3d6+18) or slam +30 (2d8+13)",
    "melee_attacks": [
      [
        {
          "attackText": "+5 dancing greatsword ",
          "attackBonus": "+35/+30/+25/+20",
          "damage": "(3d6+18)",
          "toHit": 35,
          "attackCount": 4,
          "weaponBased": true,
          "damage_details": [
            {
              "dice": [
                {
                  "numOfDice": 3,
                  "numOfSides": 6,
                  "adjustment": 18
                }
              ],
              "damageType": ""
            }
          ],
          "toHitAdjustments": [
            0,
            -5,
            -10,
            -15
          ]
        }
      ],
      [
        {
          "attackText": "slam ",
          "attackBonus": "+30",
          "damage": "(2d8+13)",
          "toHit": 30,
          "attackCount": 1,
          "damage_details": [
            {
              "dice": [
                {
                  "numOfDice": 2,
                  "numOfSides": 8,
                  "adjustment": 13
                }
              ],
              "damageType": ""
            }
          ]
        }
      ]
    ],
    "name": "Angel, Solar",
    "organization": "solitary or pair",
    "ranged": "+5 composite longbow plus 9 Str bonus +31/+26/+21/+16 (2d6+14 plus slaying arrow)",
    "ranged_attacks": [
      [
        {
          "attackText": "+5 composite longbow plus 9 Str bonus ",
          "attackBonus": "+31/+26/+21/+16",
          "damage": "(2d6+14 plus slaying arrow)",
          "toHit": 31,
          "attackCount": 4,
          "weaponBased": true,
          "damage_details": [
            {
              "dice": [
                {
                  "numOfDice": 2,
                  "numOfSides": 6,
                  "adjustment": 14
                }
              ],
              "damageType": "plus slaying arrow"
            }
          ],
          "toHitAdjustments": [
            0,
            -5,
            -10,
            -15
          ]
        }
      ]
    ],
    "reach": 10,
    "reach_details": "10 ft.",
    "resist": "electricity 10, fire 10",
    "saving_throws": {
      "fort": 25,
      "ref": 14,
      "will": 23,
      "will_details": "+23; +4 vs. poison, +4 resistance vs. evil"
    },
    "sections": [
      {
        "body": "<p>Solars are the greatest type of angel, usually serving at the right hand of a deity or championing a cause that benefits an entire world or plane. A typical solar looks roughly human, though some physically resemble other humanoid races and a rare few have even more unusual forms. A solar stands about 9 feet tall and weighs about 500 pounds, with a strong, commanding voice that is impossible to ignore. Most have silvery or golden skin.</p>",
        "source": "Bestiary",
        "type": "section"
      },
      {
        "body": "<p>Blessed with an array of magical powers and the spellcasting abilities of the most powerful clerics, solars are powerful opponents capable of single-handedly slaying mighty evils. They are the greatest trackers among the celestials, the most masterful of which are said to be able to track the days-old wake of a pit fiend flying through the Astral Plane. Some take on the mantle of monster-slayers and hunt powerful fiends and undead such as devourers, night hags, night shades, and pit fiends, even making forays into the evil planes and the Negative Energy Plane to destroy these creatures at their source before they can bring harm to mortals. A few very old solars have succeeded at this task and bear slayer-names of dread creatures that are now extinct by the solar's hand.</p>",
        "source": "Bestiary",
        "type": "section"
      },
      {
        "body": "<p>Solars accept roles as guardians, usually of fundamental supernatural concepts, or objects or creatures of great importance. On one world, a group of solars patrols the energy conduits of the sun, alert for any attempts by evil races such as drow to snuff out the light and bring eternal darkness. On another, seven solars stand watch over seven mystical chains keeping evil gods bound within a prison demiplane. On yet another, a solar with a flaming sword stands watch over the original mortal paradise so that no creature may enter.</p>",
        "source": "Bestiary",
        "type": "section"
      },
      {
        "body": "<p>In worlds where the gods cannot take physical form, they send solars to be their prophets and gurus (often pretending to be mortals), laying the foundation for cults that grow to become great religions. Likewise, in worlds oppressed by evil, solars are the secret priests who bring hope to the downtrodden, or in some cases allow themselves to be martyred so that their holy essence can explode outward to land and grow in the hearts of great heroes-to-be.</p>",
        "source": "Bestiary",
        "type": "section"
      },
      {
        "body": "<p>Though they are not gods, the solars' power approaches that of demigods, and they often have an advisory role for younger or weaker deities. In some polytheistic faiths, mortals worship one or more solars as aspects or near-equal servants of the true deities-;never without the deity's approval-;or consider notable solars to be offspring, consorts, lovers, or spouses of true deities (which they may be, depending on the deity).</p>",
        "source": "Bestiary",
        "type": "section"
      },
      {
        "body": "<p>Unlike other angels, most solars are created from an amalgam of good souls and raw divine energy to directly serve the gods, but an increasing number of these powerful angels have been &ldquo;promoted&rdquo; to their existence as solars from lesser creatures like planetars or devas. A few rare and powerful good souls ascend directly to the status of solar. The oldest solars predate mortality and are among the gods' first creations. These strange solars are paragons of their kind and have little direct interaction with mortals, focusing on the protection or destruction of abstract concepts such as gravity, dark matter, entropy, and primordial evil.</p>",
        "source": "Bestiary",
        "type": "section"
      },
      {
        "body": "<p>Solars who spend a long time in the Material Plane, especially those in the guise of mortals, are sometimes the source of half-celestial or aasimar bloodlines in mortal families, due either to romantic dalliances or simply the mortals' proximity to celestial energy. Actual offspring are rare, and when they occur, it is always a mortal mother that bears the child-;while solars can appear as either sex, the gods have not granted them the capacity for pregnancy or motherhood. Indeed, this fundamental truth is often what drives a solar to seek out a mortal lover. Since begetting a child upon a mortal is generally frowned upon by other solars, a solar father rarely interacts directly with the fate of his lover or child, so as to avoid bringing shame upon himself or his responsibilities. Yet such solars still watch over their progeny from afar, and in times of peril, they might even be moved to intercede to aid one of their endangered children, albiet in subtle and mysterious ways.</p>",
        "source": "Bestiary",
        "type": "section"
      },
      {
        "body": "<p>All angels respect the power and wisdom of solars, and though these mightiest of angels usually work alone, they sometimes command multiple armies led by planetars, acting as great field marshals for massive incursions against the legions of Hell or the hordes of the Abyss.</p>",
        "source": "Bestiary",
        "type": "section"
      }
    ],
    "senses": "darkvision 60 ft., low-light vision, detect evil, detect snares and pits, true seeing; Perception +33",
    "size": "Large",
    "skill_details": "Craft (any one) +31, Diplomacy +32, Fly +32, Knowledge (history) +31, Knowledge (nature) +31, Knowledge (planes) +31, Knowledge (religion) +31, Perception +33, Sense Motive +33, Spellcraft +31, Stealth +21, Survival +31",
    "skills": [
      {
        "name": "Craft ",
        "value": 31,
        "subName": "any one"
      },
      {
        "name": "Diplomacy ",
        "value": 32
      },
      {
        "name": "Fly ",
        "value": 32
      },
      {
        "name": "Knowledge ",
        "value": 31,
        "subName": "history"
      },
      {
        "name": "Knowledge ",
        "value": 31,
        "subName": "nature"
      },
      {
        "name": "Knowledge ",
        "value": 31,
        "subName": "planes"
      },
      {
        "name": "Knowledge ",
        "value": 31,
        "subName": "religion"
      },
      {
        "name": "Perception ",
        "value": 33
      },
      {
        "name": "Sense Motive",
        "value": 33
      },
      {
        "name": "Spellcraft ",
        "value": 31
      },
      {
        "name": "Stealth ",
        "value": 21
      },
      {
        "name": "Survival ",
        "value": 31
      }
    ],
    "source": "Bestiary",
    "space": 10,
    "space_details": "10 ft.",
    "special_abilities": [
      {
        "name": "Spells",
        "description": "Solars can cast divine spells as 20th-level clerics. They do not gain access to domains or other cleric abilities.",
        "savingThrow": {
          "hasSave": false
        }
      },
      {
        "name": "Slaying Arrow",
        "description": "A solar's bow needs no ammunition, and automatically creates a slaying arrow of the solar's choice when drawn.",
        "savingThrow": {
          "hasSave": false
        },
        "type": "Supernatural"
      }
    ],
    "special_qualities": "change shape (alter self)",
    "speed": "50 ft., fly 150 ft. (good); 35 ft., fly 100 ft. (good) in armor",
    "spells": [
      {
        "spell-like abilities": "(CL 20th)<p class=\"stat-block-2\">Constant-<i>detect evil</i>, <i>detect snares and pits</i>, <i>discern lies</i> (DC 21), <i>true seeing</i></p><p class=\"stat-block-2\">At Will-<i>aid</i>, <i>animate objects</i>, <i>commune</i>, <i>continual flame</i>, <i>dimensional anchor</i>, <i>greater dispel magic</i>, <i>holy smite</i> (DC 21), <i>imprisonment</i> (DC 26), <i>invisibility</i> (self only), <i>lesser restoration</i>, <i>remove curse</i>, <i>remove disease</i>, <i>remove fear</i>, <i>resist energy</i>, <i>summon monster VII</i>, <i>speak with dead</i> (DC 20), <i>waves of fatigue</i></p><p class=\"stat-block-2\">3/day-<i>blade barrier</i> (DC 23), <i>earthquake</i> (DC 25), <i>heal</i>, <i>mass charm monster</i> (DC 25), <i>permanency</i>, <i>resurrection</i>, <i>waves of exhaustion</i></p><p class=\"stat-block-2\">1/day-<i>greater restoration</i>, <i>power word blind</i>, <i>power word kill</i>, <i>power word stun</i>, <i>prismatic spray</i> (DC 24), <i>wish</i></p>"
      },
      {
        "spells prepared": "(CL 20th)<p class=\"stat-block-2\">9th-<i>etherealness</i>, <i>mass heal</i>, <i>miracle</i>, <i>storm of vengeance</i> (DC 27)</p><p class=\"stat-block-2\">8th-<i>fire storm</i> (DC 26), <i>holy aura</i> (2) (DC 26), <i>mass cure critical wounds</i> (2)</p><p class=\"stat-block-2\">7th-<i>destruction</i> (DC 25), <i>dictum</i> (DC 25), <i>ethereal jaunt</i>, <i>holy word</i> (DC 25), <i>regenerate</i></p><p class=\"stat-block-2\">6th-<i>banishment</i> (DC 24), <i>heroes' feast</i>, <i>mass cure moderate wounds</i>, <i>undeath to death</i> (DC 24), <i>word of recall</i></p><p class=\"stat-block-2\">5th-<i>break enchantment</i>, <i>breath of life</i>, <i>dispel evil</i> (DC 23), <i>plane shift</i> (DC 23), <i>righteous might</i>, <i>symbol of sleep</i> (DC 23)</p><p class=\"stat-block-2\">4th-<i>cure critical wounds</i> (3), <i>death ward</i>, <i>dismissal</i> (DC 22), <i>neutralize poison</i> (2) (DC 22)</p><p class=\"stat-block-2\">3rd-<i>cure serious wounds</i>, <i>daylight</i>, <i>invisibility purge</i>, <i>magic circle against evil</i>, <i>prayer</i>, <i>protection from energy</i>, <i>wind wall</i></p><p class=\"stat-block-2\">2nd-<i>align weapon</i>, <i>bear's endurance</i>, <i>bull's strength</i>, <i>consecrate</i>, <i>cure moderate wounds</i> (2), <i>eagle's splendor</i></p><p class=\"stat-block-2\">1st-<i>bless</i>, <i>cure light wounds</i> (3), <i>divine favor</i>, <i>entropic shield</i>, <i>shield of faith</i></p><p class=\"stat-block-2\">0 (at will)-<i>detect magic</i>, <i>purify food and drink</i>, <i>stabilize</i>, <i>virtue</i></p>"
      }
    ],
    "sr": 34,
    "strengthInt": 28,
    "treasure": "double (+5 full plate, +5 dancing greatsword, +5 composite longbow [+9 Str bonus])",
    "type": "creature",
    "url": "pfsrd://Bestiary/Monsters/Angel/Solar",
    "xp": "819,200"
  };

  export default AngelSolar;