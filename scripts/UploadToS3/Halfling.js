export const Halfling = {
    "ability_scores": {
        "str": 6,
        "dex": 16,
        "con": 12,
        "int": 13,
        "wis": 10,
        "cha": 17
    },
    "acAsInt": 19,
    "alignment": "N",
    "armor_class": {
        "ac_details": "19, touch 14, flat-footed 16 (+5 armor, +3 dex, +1 size)",
        "ac_modifiers": [
            {
                "mod": 5,
                "type": "armor",
                "maxDex": 3
            },
            {
                "mod": 3,
                "type": "Dex"
            },
            {
                "mod": 1,
                "type": "size"
            }
        ],
        "ac_modifiers_details": "+5 armor, +3 dex, +1 size",
        "ac": {
            "standard": 19,
            "flat_footed": 16,
            "touch": 14
        }
    },
    "base_attack": 0,
    "cmb": -3,
    "cmd": 0,
    "cr": "1/2",
    "crAsNum": 0.5,
    "creature_subtype": "Halfling",
    "creature_type": "Humanoid",
    "description": "This is a halfling.",
    "environment": "any",
    "feats": "",
    "hdType": 8,
    "hitDice": 0,
    "hitPointAdjustment": 0,
    "hitPoints": 5,
    "hp": "0 (0d8+0[racial])",
    "init": 1,
    "languages": "Common, Halfling",
    "melee": "small heavy mace -1 (1d6-2)",
    "melee_attacks": [
        [
            {
                "attackText": "small heavy mace ",
                "attackBonus": "-1",
                "damage": "(1d6-2)",
                "toHit": -1,
                "attackCount": 1,
                "damage_details": [
                    {
                        "dice": [
                            {
                                "numOfDice": 1,
                                "numOfSides": 6,
                                "adjustment": -2
                            }
                        ]
                    }
                ]
            }
        ]
    ],
    "name": "Halfling",
    "npc": true,
    "organization": "solitary, pair, or team (3-6)",
    "racial_modifiers": "+2 dex, +2 cha, –2 str, +2 Perception, +2 Acrobatics, +2 Climb, +1 all saving throws",
    "racial_ability_scores": {
        "dex": 2,
        "cha": 2,
        "str": -2
    },
    "ranged": "small light crossbow +4 (1d6/19-20)",
    "ranged_attacks": [
        [
            {
                "attackText": "small light crossbow ",
                "attackBonus": "+4",
                "damage": "(1d6/19-20)",
                "toHit": 4,
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
        "fort": 2,
        "ref": 4,
        "will": 1,
    },
    "sections": [
        {
            "body": "<p>Optimistic and cheerful by nature, blessed with uncanny luck and driven by a powerful wanderlust, halflings make up for their short stature with an abundance of bravado and curiosity. At once excitable and easy-going, halflings like to keep an even temper and a steady eye on opportunity, and are not as prone as some of the more volatile races to violent or emotional outbursts. Even in the jaws of catastrophe, a halfling almost never loses his sense of humor.</p>"
        },
        {
            "body": "<p>Halflings are inveterate opportunists. Unable to physically defend themselves from the rigors of the world, they know when to bend with the wind and when to hide away. Yet a halfling's curiosity often overwhelms his good sense, leading to poor decisions and narrow escapes.</p>"
        },
        {
            "body": "<p>Though their curiosity drives them to travel and seek new places and experiences, halflings possess a strong sense of house and home, often spending above their means to enhance the comforts of home life.</p>"
        },
        {
            "body": "<p><b>Physical Description</b>: Halflings rise to a humble height of 3 feet. They prefer to walk barefoot, leading to the bottoms of their feet being roughly calloused. Tufts of thick, curly hair warm the tops of their broad, tanned feet. Their skin tends toward a rich almond color and their hair toward light shades of brown. A halfling's ears are pointed, but proportionately not much larger than those of a human.</p>"
        }, 
        {
            "body": "<p><b>Society</b>: Halflings claim no cultural homeland and control no settlements larger than rural assemblies of free towns. Far more often, they dwell at the knees of their human cousins in human cities, eking out livings as they can from the scraps of larger societies. Many halflings lead perfectly fulfilling lives in the shadow of their larger neighbors, while some prefer more nomadic lives on the road, traveling the world and experiencing all it has to offer.</p>"
        }, 
        {
            "body": "<p><b>Relations</b>: A typical halfling prides himself on his ability to go unnoticed by other races—it is this trait that allows so many halflings to excel at thievery and trickery. Most halflings, knowing full well the stereotyped view other races take of them as a result, go out of their way to be forthcoming and friendly to the bigger races when they're not trying to go unnoticed. They get along fairly well with gnomes, although most halflings regard these eccentric creatures with a hefty dose of caution. Halflings coexist well with humans as a general rule, but since some of the more aggressive human societies value halflings as slaves, halflings try not to grow too complacent when dealing with them. Halflings respect elves and dwarves, but these races generally live in remote regions far from the comforts of civilization that halflings enjoy, thus limiting opportunities for interaction. Only half-orcs are generally shunned by halflings, for their great size and violent natures are a bit too intimidating for most halflings to cope with.</p>"
        }, 
        {
            "body": "<p><b>Alignment and Religion</b>: Halflings are loyal to their friends and families, but since they dwell in a world dominated by races twice as large as themselves, they've come to grips with the fact that sometimes they'll need to scrap and scrounge for survival. Most halflings are neutral as a result.</p>"
        }, 
        {
            "body": "<p><b>Adventurers</b>: Their inherent luck coupled with their insatiable wanderlust makes halflings ideal for lives of adventure. Other such vagabonds tend to put up with the curious race in hopes that some of their mystical luck will rub off.</p>"
        }
    ],
    "senses": "Perception +2",
    "size": "Small",
    "skill_details": "",
    "skills": [],
    "source": "Bestiary",
    "special_attacks": "",
    "speed": "20 ft.",
    "spells": [],
    "strengthInt":6,
    "treasure": "NPC gear (scale mail, small heavy mace, small light crossbow with 20 bolts, other treasure)",
    "type": "creature",
    "xp": "200",
}