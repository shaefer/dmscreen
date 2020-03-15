export const Dwarf = {
    "ability_scores": {
        "str": 15,
        "dex": 10,
        "con": 15,
        "int": 12,
        "wis": 16,
        "cha": 10
    },
    "acAsInt": 17,
    "alignment": "N",
    "armor_class": {
        "ac_details": "17, touch 10, flat-footed 17 (+7 armor)",
        "ac_modifiers": [
            {
                "mod": 7,
                "type": "armor",
                "maxDex": 0
            }
        ],
        "ac_modifiers_details": "+7 armor",
        "ac": {
            "standard": 17,
            "flat_footed": 17,
            "touch": 10
        }
    },
    "base_attack": 0,
    "cmb": 2,
    "cmd": 2,
    "cr": "1/2",
    "crAsNum": 0.5,
    "creature_subtype": "Dwarf",
    "creature_type": "Humanoid",
    "description": "This is a dwarf.",
    "environment": "any",
    "feats": "",
    "hdType": 6,
    "hitDice": 0,
    "hitPointAdjustment": 0,
    "hitPoints": 5,
    "hp": "0 (0d6+0[racial])",
    "init": 0,
    "languages": "Common, Dwarven",
    "melee": "battleaxe +2 (1d8/x3)",
    "melee_attacks": [
        [
            {
                "attackText": "battleaxe ",
                "attackBonus": "+2",
                "damage": "(1d8/x3)",
                "toHit": 2,
                "attackCount": 1,
                "damage_details": [
                    {
                        "dice": [
                            {
                                "numOfDice": 1,
                                "numOfSides": 8,
                                "adjustment": 2
                            }
                        ],
                        "critRangeAndMultiplier": "x3"
                    }
                ]
            }
        ]
    ],
    "name": "Dwarf",
    "npc": true,
    "organization": "solitary, pair, or team (3-6)",
    "racial_modifiers": "+2 con, +2 wis, -2 cha, speed never modified by armor",
    "racial_ability_scores": {
        "con": 2,
        "wis": 2,
        "cha": -2
    },
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
    "resist": "",
    "saving_throws": {
        "fort": 2,
        "ref": 0,
        "will": 3,
    },
    "sections": [
        {
            "body": "<p>Dwarves are a stoic but stern race, ensconced in cities carved from the hearts of mountains and fiercely determined to repel the depredations of savage races like orcs and goblins. More than any other race, the dwarves have acquired a reputation as dour and humorless craftsmen of the earth. It could be said that dwarven history shapes the dark disposition of many dwarves, for they reside in high mountains and dangerous realms below the earth, constantly at war with giants, goblins, and other such horrors.</p>"
        },
        {
            "body": "<p><b>Physical Description</b>: Dwarves are a short and stocky race, and stand about a foot shorter than most humans, with wide, compact bodies that account for their burly appearance. Male and female dwarves pride themselves on the length of their hair, and men often decorate their beards with a variety of clasps and intricate braids. A clean-shaven male dwarf is a sure sign of madness, or worse—no one familiar with their race trusts a beardless dwarf.</p>"
        }, 
        {
            "body": "<p><b>Society</b>: The great distances between their mountain citadels account for many of the cultural differences that exist within dwarven society. Despite these schisms, dwarves throughout the world are characterized by their love of stonework, their passion for stone- and metal-based craftsmanship and architecture, and a fierce hatred of giants, orcs, and goblinoids.</p>"
        }, 
        {
            "body": "<p><b>Relations</b>: Dwarves and orcs have long dwelt in proximity, theirs a history of violence as old as both their races. Dwarves generally distrust and shun half-orcs. They find halflings, elves, and gnomes to be too frail, flighty, or \"pretty\" to be worthy of proper respect. It is with humans that dwarves share the strongest link, for humans' industrious nature and hearty appetites come closest to matching those of the dwarven ideal.</p>"
        }, 
        {
            "body": "<p><b>Alignment and Religion</b>: Dwarves are driven by honor and tradition, and while they are often satirized as standoffish, they have a strong sense of friendship and justice, and those who win their trust understand that, while they work hard, they play even harder—especially when good ale is involved. Most dwarves are lawful good.</p>"
        }, 
        {
            "body": "<p><b>Adventurers</b>: Although dwarven adventurers are rare compared to humans, they can be found in most regions of the world. Dwarves often leave the confines of their redoubts to seek glory for their clans, to find wealth with which to enrich the fortress-homes of their birth, or to reclaim fallen dwarven citadels from racial enemies. Dwarven warfare is often characterized by tunnel fighting and melee combat, and as such most dwarves tend toward classes such as fighters and barbarians.</p>"
        }
    ],
    "senses": "Darkvision 60 ft., Perception +3",
    "size": "Medium",
    "skill_details": "",
    "skills": [],
    "source": "Bestiary",
    "special_attacks": "",
    "speed": "20 ft.",
    "spells": [],
    "strengthInt":15,
    "treasure": "NPC gear (splint mail, battleaxe, light crossbow with 10 bolts, other treasure)",
    "type": "creature",
    "xp": "200",
}