export const Elf = {
    "ability_scores": {
        "str": 8,
        "dex": 17,
        "con": 11,
        "int": 16,
        "wis": 10,
        "cha": 12
    },
    "acAsInt": 18,
    "alignment": "CG",
    "armor_class": {
        "ac_details": "18, touch 13, flat-footed 15 (+5 armor, +3 dex)",
        "ac_modifiers": [
            {
                "mod": 5,
                "type": "armor",
                "maxDex": 3
            },
            {
                "mod": 3,
                "type": "Dex"
            }
        ],
        "ac_modifiers_details": "+5 armor, +3 dex",
        "ac": {
            "standard": 18,
            "flat_footed": 15,
            "touch": 13
        }
    },
    "base_attack": 0,
    "cmb": -1,
    "cmd": 2,
    "cr": "1/2",
    "crAsNum": 0.5,
    "creature_subtype": "Elf",
    "creature_type": "Humanoid",
    "description": "This is an elf.",
    "environment": "any",
    "feats": "",
    "hdType": 6,
    "hitDice": 0,
    "hitPointAdjustment": 0,
    "hitPoints": 5,
    "hp": "0 (0d6+0[racial])",
    "init": 0,
    "languages": "Common, Elven",
    "melee": "longsword -1 (1d8/19-20)",
    "melee_attacks": [
        [
            {
                "attackText": "longsword ",
                "attackBonus": "-1",
                "damage": "(1d8/19-20)",
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
                        ],
                        "critRangeAndMultiplier": "19-20"
                    }
                ]
            }
        ]
    ],
    "name": "Elf",
    "npc": true,
    "organization": "solitary, pair, or team (3-6)",
    "racial_modifiers": "+2 dex, +2 int, –2 con, +2 Perception",
    "racial_ability_scores": {
        "dex": 2,
        "int": 2,
        "con": -2
    },
    "ranged": "longbow +3 (1d8/x3)",
    "ranged_attacks": [
        [
            {
                "attackText": "longbow ",
                "attackBonus": "+3",
                "damage": "(1d8/x3)",
                "toHit": 3,
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
                        "critRangeAndMultiplier": "x3"
                    }
                ]
            }
        ]
    ],
    "resist": "",
    "saving_throws": {
        "fort": 0,
        "ref": 3,
        "will": 0,
    },
    "sections": [
        {
            "body": "<p>The long-lived elves are children of the natural world, similar in many superficial ways to fey creatures, yet different as well. Elves value their privacy and traditions, and while they are often slow to make friends, at both the personal and national levels, once an outsider is accepted as a comrade, such alliances can last for generations. Elves have a curious attachment to their surroundings, perhaps as a result of their incredibly long lifespans or some deeper, more mystical reason. Elves who dwell in a region for long find themselves physically adapting to match their surroundings, most noticeably taking on coloration reflecting the local environment. Those elves that spend their lives among the short-lived races, on the other hand, often develop a skewed perception of mortality and become morose, the result of watching wave after wave of companions age and die before their eyes.</p>"
        },
        {
            "body": "<p><b>Physical Description</b>: Although generally taller than humans, elves possess a graceful, fragile physique that is accentuated by their long, pointed ears. Their eyes are wide and almond-shaped, and filled with large, vibrantly colored pupils. While elven clothing often plays off the beauty of the natural world, those elves that live in cities tend to bedeck themselves in the latest fashion.</p>"
        }, 
        {
            "body": "<p><b>Society</b>: Many elves feel a bond with nature and strive to live in harmony with the natural world. Most, however, find manipulating earth and stone to be distasteful, and prefer instead to indulge in the finer arts, with their inborn patience making them particularly suited to wizardry.</p>"
        }, 
        {
            "body": "<p><b>Relations</b>: Elves are prone to dismissing other races, writing them off as rash and impulsive, yet they are excellent judges of character. An elf might not want a dwarf neighbor, but would be the first to acknowledge that dwarf's skill at smithing. They regard gnomes as strange (and sometimes dangerous) curiosities, and halflings with a measure of pity, for these small folk seem to the elves to be adrift, without a traditional home. Elves are fascinated with humans, as evidenced by the number of half-elves in the world, even if they usually disown such offspring. They regard half-orcs with distrust and suspicion.</p>"
        }, 
        {
            "body": "<p><b>Alignment and Religion</b>: Elves are emotional and capricious, yet value kindness and beauty. Most elves are chaotic good.</p>"
        }, 
        {
            "body": "<p><b>Adventurers</b>: Many elves embark on adventures out of a desire to explore the world, leaving their secluded forest realms to reclaim forgotten elven magic or search out lost kingdoms established millennia ago by their forefathers. For those raised among humans, the ephemeral and unfettered life of an adventurer holds natural appeal. Elves generally eschew melee because of their frailty, preferring instead to pursue classes such as wizards and rangers.</p>"
        }
    ],
    "senses": "Low-light vision, Perception +2",
    "size": "Medium",
    "skill_details": "",
    "skills": [],
    "source": "Bestiary",
    "special_attacks": "",
    "speed": "30 ft.",
    "spells": [],
    "strengthInt":8,
    "treasure": "NPC gear (scale mail, longsword, longbow with 100 arrows, other treasure)",
    "type": "creature",
    "xp": "200",
}