export const Gnome = {
    "ability_scores": {
        "str": 8,
        "dex": 12,
        "con": 16,
        "int": 13,
        "wis": 8,
        "cha": 17
    },
    "acAsInt": 17,
    "alignment": "NG",
    "armor_class": {
        "ac_details": "17, touch 12, flat-footed 16 (+5 armor, +1 dex, +1 size)",
        "ac_modifiers": [
            {
                "mod": 5,
                "type": "armor",
                "maxDex": 3
            },
            {
                "mod": 1,
                "type": "Dex"
            },
            {
                "mod": 1,
                "type": "size"
            }
        ],
        "ac_modifiers_details": "+5 armor, +1 dex, +1 size",
        "ac": {
            "standard": 17,
            "flat_footed": 16,
            "touch": 12
        }
    },
    "base_attack": 0,
    "cmb": -2,
    "cmd": -1,
    "cr": "1/2",
    "crAsNum": 0.5,
    "creature_subtype": "Gnome",
    "creature_type": "Humanoid",
    "description": "This is a gnome.",
    "environment": "any",
    "feats": "",
    "hdType": 8,
    "hitDice": 0,
    "hitPointAdjustment": 0,
    "hitPoints": 5,
    "hp": "0 (0d8+0[racial])",
    "init": 1,
    "languages": "Common, Gnome, Sylvan",
    "melee": "small heavy mace +0 (1d6-1)",
    "melee_attacks": [
        [
            {
                "attackText": "small heavy mace ",
                "attackBonus": "0",
                "damage": "(1d6-1)",
                "toHit": 0,
                "attackCount": 1,
                "damage_details": [
                    {
                        "dice": [
                            {
                                "numOfDice": 1,
                                "numOfSides": 6,
                                "adjustment": -1
                            }
                        ]
                    }
                ]
            }
        ]
    ],
    "name": "Gnome",
    "npc": true,
    "organization": "solitary, pair, or team (3-6)",
    "racial_modifiers": "+2 con, +2 cha, –2 str, +2 Perception, +2 Craft or +2 Profession",
    "racial_ability_scores": {
        "con": 2,
        "cha": 2,
        "str": -2
    },
    "ranged": "small light crossbow +2 (1d6/19-20)",
    "ranged_attacks": [
        [
            {
                "attackText": "small light crossbow ",
                "attackBonus": "+2",
                "damage": "(1d6/19-20)",
                "toHit": 2,
                "attackCount": 1,
                "damage_details": [
                    {
                        "dice": [
                            {
                                "numOfDice": 1,
                                "numOfSides": 6,
                                "adjustment": 0
                            }
                        ],
                        "critRange": "19-20"
                    }
                ]
            }
        ]
    ],
    "resist": "",
    "saving_throws": {
        "fort": 3,
        "ref": 1,
        "will": -1,
    },
    "sections": [
        {
            "body": "<p>Gnomes trace their lineage back to the mysterious realm of the fey, a place where colors are brighter, the wildlands wilder, and emotions more primal. Unknown forces drove the ancient gnomes from that realm long ago, forcing them to seek refuge in this world; despite this, the gnomes have never completely abandoned their fey roots or adapted to mortal culture. As a result, gnomes are widely regarded by the other races as alien and strange.</p>"
        },
        {
            "body": "<p><b>Physical Description</b>: Gnomes are one of the smallest of the common races, generally standing just over 3 feet in height. Their hair tends toward vibrant colors such as the fiery orange of autumn leaves, the verdant green of forests at springtime, or the deep reds and purples of wildflowers in bloom. Similarly, their flesh tones range from earthy browns to floral pinks, frequently with little regard for heredity. Gnomes possess highly mutable facial characteristics, and many have overly large mouths and eyes, an effect which can be both disturbing and stunning, depending on the individual.</p>"
        }, 
        {
            "body": "<p><b>Society</b>: Unlike most races, gnomes do not generally organize themselves within classic societal structures. Whimsical creatures at heart, they typically travel alone or with temporary companions, ever seeking new and more exciting experiences. They rarely form enduring relationships among themselves or with members of other races, instead pursuing crafts, professions, or collections with a passion that borders on zealotry. Male gnomes have a strange fondness for unusual hats and headgear, while females often proudly wear elaborate and eccentric hairstyles.</p>"
        }, 
        {
            "body": "<p><b>Relations</b>: Gnomes have difficulty interacting with the other races, on both emotional and physical levels. Gnome humor is hard to translate and often comes across as malicious or senseless to other races, while gnomes in turn tend to think of the taller races as dull and lumbering giants. They get along well with halflings and humans, but are overly fond of playing jokes on dwarves and half-orcs, whom most gnomes feel need to lighten up. They respect elves, but often grow frustrated with the comparatively slow pace at which members of the long-lived race make decisions. To the gnomes, action is always better than inaction, and many gnomes carry several highly involved projects with them at all times to keep themselves entertained during rest periods.</p>"
        }, 
        {
            "body": "<p><b>Alignment and Religion</b>: Although gnomes are impulsive tricksters, with sometimes inscrutable motives and equally confusing methods, their hearts are generally in the right place. They are prone to powerful fits of emotion, and find themselves most at peace within the natural world.</p>"
        }, 
        {
            "body": "<p><b>Adventurers</b>: Gnomes' propensity for wanderlust makes them natural adventurers. They often become wanderers to experience new aspects of life, for nothing is as novel as the uncounted dangers facing adventurers. Gnomes make up for their weakness with a proclivity for sorcery or bardic music.</p>"
        }
    ],
    "senses": "Low-light vision, Perception +2",
    "size": "Small",
    "skill_details": "",
    "skills": [],
    "source": "Bestiary",
    "special_attacks": "",
    "speed": "20 ft.",
    "spells": [],
    "strengthInt":8,
    "treasure": "NPC gear (scale mail, small heavy mace, small light crossbow with 20 bolts, other treasure)",
    "type": "creature",
    "xp": "200",
}