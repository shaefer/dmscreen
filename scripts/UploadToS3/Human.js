export const Human = {
    "name": "Human",
    "ability_scores": {
        "str": 15,
        "dex": 14,
        "con": 13,
        "int": 12,
        "wis": 10,
        "cha": 8
    },
    "acAsInt": 17,
    "alignment": "N",
    "armor_class": {
        "ac_details": "17, touch 12, flat-footed 15 (+5 armor, +2 Dex)",
        "ac_modifiers": [
            {
                "mod": 2,
                "type": "Dex"
            },
            {
                "mod": 5,
                "type": "armor",
                "maxDex": 3
            }
        ],
        "ac_modifiers_details": "+5 armor, +2 Dex",
        "ac": {
            "standard": 17,
            "flat_footed": 15,
            "touch": 12
        }
    },
    "base_attack": 0,
    "cmb": 2,
    "cmd": 4,
    "cr": "1/2",
    "crAsNum": 0.5,
    "creature_subtype": "",
    "creature_type": "Humanoid",
    "description": "This is a creature.",
    "environment": "any",
    "feats": "",
    "hdType": 8,
    "hitDice": 0,
    "hitPointAdjustment": 0,
    "hitPoints": 5,
    "hp": "0 (0d8+0[racial])",
    "init": 2,
    "languages": "Common",
    "melee": "heavy mace +0 (1d8)",
    "melee_attacks": [
        [
            {
                "attackText": "heavy mace ",
                "attackBonus": "0",
                "damage": "(1d8)",
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
                        ]
                    }
                ]
            }
        ]
    ],
    "organization": "solitary, pair, or team (3-6)",
    "racial_modifiers": "+2 to any ability score, +1 skill rank per level, +1 feat at 1st level",
    "ranged": "light crossbow +0 (1d8/19-20)",
    "ranged_attacks": [
        [
            {
                "attackText": "light crossbow ",
                "attackBonus": "+0",
                "damage": "(1d8/19-20)",
                "toHit": 2,
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
        "fort": 1,
        "ref": 2,
        "will": 0,
    },
    "sections": [
        {
            "body": "<p>Humans possess exceptional drive and a great capacity to endure and expand, and as such are currently the dominant race in the world. Their empires and nations are vast, sprawling things, and the citizens of these societies carve names for themselves with the strength of their sword arms and the power of their spells. Humanity is best characterized by its tumultuousness and diversity, and human cultures run the gamut from savage but honorable tribes to decadent, devil-worshiping noble families in the most cosmopolitan cities. Human curiosity and ambition often triumph over their predilection for a sedentary lifestyle, and many leave their homes to explore the innumerable forgotten corners of the world or lead mighty armies to conquer their neighbors, simply because they can.</p>"
        },
        {
            "body": "<p><b>Physical Description</b>: The physical characteristics of humans are as varied as the world's climes. From the dark-skinned tribesmen of the southern continents to the pale and barbaric raiders of the northern lands, humans possess a wide variety of skin colors, body types, and facial features. Generally speaking, humans' skin color assumes a darker hue the closer to the equator they live.</p>"
        }, 
        {
            "body": "<p><b>Society</b>: Human society comprises a multitude of governments, attitudes, and lifestyles. Though the oldest human cultures trace their histories thousands of years into the past, when compared to the societies of common races like elves and dwarves, human society seems to be in a state of constant flux as empires fragment and new kingdoms subsume the old. In general, humans are known for their flexibility, ingenuity, and ambition.</p>"
        }, 
        {
            "body": "<p><b>Relations</b>: Humans are fecund, and their drive and numbers often spur them into contact with other races during bouts of territorial expansion and colonization. In many cases, this leads to violence and war, yet humans are also swift to forgive and forge alliances with races who do not try to match or exceed them in violence. Proud, sometimes to the point of arrogance, humans might look upon dwarves as miserly drunkards, elves as flighty fops, halflings as craven thieves, gnomes as twisted maniacs, and half-elves and half-orcs as embarrassments—but the race's diversity among its own members also makes humans quite adept at accepting others for what they are.</p>"
        }, 
        {
            "body": "<p><b>Alignment and Religion</b>: Humanity is perhaps the most heterogeneous of all the common races, with a capacity for great evil and boundless good. Some assemble into vast barbaric hordes, while others build sprawling cities that cover miles. Taken as a whole, most humans are neutral, yet they generally tend to congregate in nations and civilizations with specific alignments. Humans also have the widest range in gods and religion, lacking other races' ties to tradition and eager to turn to anyone offering them glory or protection.</p>"
        }, 
        {
            "body": "<p><b>Adventurers</b>: Ambition alone drives countless humans, and for many, adventuring serves as a means to an end, whether it be wealth, acclaim, social status, or arcane knowledge. A few pursue adventuring careers simply for the thrill of danger. Humans hail from myriad regions and backgrounds, and as such can fill any role within an adventuring party.</p>"
        }, 
        {
            "body": "<p><b>Names</b>: Unlike other races, who generally cleave to specific traditions and shared histories, humanity's diversity has resulted in a near-infinite set of names. The humans of a northern barbarian tribe have much different names than those hailing from a subtropical nation of sailors and tradesmen. Throughout most of the world humans speak Common, yet their names are as varied as their beliefs and appearances.</p>"
        }
    ],
    "senses": "Perception +0",
    "size": "Medium",
    "skill_details": "Knowledge +6",
    "skills": [
        {
            "name": "Knowledge",
            "value": 6
        }
    ],
    "source": "Bestiary",
    "special_attacks": "",
    "speed": "30 ft. (20 ft. in armor)",
    "spells": [],
    "strengthInt":15,
    "treasure": "NPC gear (scale mail, heavy mace, light crossbow with 10 bolts, other treasure)",
    "type": "creature",
    "xp": "200",
}