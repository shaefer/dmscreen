export const HalfOrc = {
    "ability_scores": {
        "str": 17,
        "dex": 13,
        "con": 14,
        "int": 10,
        "wis": 12,
        "cha": 8
    },
    "acAsInt": 15,
    "alignment": "CN",
    "armor_class": {
        "ac_details": "15, touch 11, flat-footed 14 (+4 armor, +1 dex)",
        "ac_modifiers": [
            {
                "mod": 4,
                "type": "armor",
                "maxDex": 4
            },
            {
                "mod": 1,
                "type": "Dex"
            }
        ],
        "ac_modifiers_details": "+4 armor, +1 dex",
        "ac": {
            "standard": 15,
            "flat_footed": 14,
            "touch": 11
        }
    },
    "base_attack": 0,
    "cmb": 3,
    "cmd": 4,
    "cr": "1/2",
    "crAsNum": 0.5,
    "creature_subtype": "human, orc",
    "creature_type": "Humanoid",
    "description": "This is a half-orc.",
    "environment": "any",
    "feats": "",
    "hdType": 8,
    "hitDice": 0,
    "hitPointAdjustment": 0,
    "hitPoints": 5,
    "hp": "0 (0d8+0[racial])",
    "init": 1,
    "languages": "Common, Orc",
    "melee": "greataxe +3 (1d12+4/x3)",
    "melee_attacks": [
        [
            {
                "attackText": "greataxe ",
                "attackBonus": "+3",
                "damage": "(1d12+4/x3)",
                "toHit": 3,
                "attackCount": 1,
                "damage_details": [
                    {
                        "dice": [
                            {
                                "numOfDice": 1,
                                "numOfSides": 12,
                                "adjustment": 4
                            }
                        ],
                        "critMultiplier": "x3"
                    }
                ]
            }
        ]
    ],
    "name": "Half-orc",
    "npc": true,
    "organization": "solitary, pair, or team (3-6)",
    "racial_modifiers": "+2 any, +2 Intimidate",
    "racial_ability_scores": {
        "any": 2
    },
    "ranged": "longbow +1 (1d8/x3)",
    "ranged_attacks": [
        [
            {
                "attackText": "longbow ",
                "attackBonus": "+1",
                "damage": "(1d8/x3)",
                "toHit": 1,
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
                        "critMultiplier": "x3"
                    }
                ]
            }
        ]
    ],
    "resist": "",
    "saving_throws": {
        "fort": 2,
        "ref": 1,
        "will": 1,
    },
    "sections": [
        {
            "body": "<p>Half-orcs are monstrosities, their tragic births the result of perversion and violence—or at least, that's how other races see them. It's true that half-orcs are rarely the result of loving unions, and as such are usually forced to grow up hard and fast, constantly fighting for protection or to make names for themselves. Feared, distrusted, and spat upon, half-orcs still consistently manage to surprise their detractors with great deeds and unexpected wisdom—though sometimes it's easier just to crack a few skulls.</p>"
        },
        {
            "body": "<p><b>Physical Description</b>: Both genders of half-orc stand between 6 and 7 feet tall, with powerful builds and greenish or grayish skin. Their canines often grow long enough to protrude from their mouths, and these \"tusks,\" combined with heavy brows and slightly pointed ears, give them their notoriously bestial appearance. While half-orcs may be impressive, few ever describe them as beautiful.</p>"
        }, 
        {
            "body": "<p><b>Society</b>: Unlike half-elves, where at least part of society's discrimination is born out of jealousy or attraction, half-orcs get the worst of both worlds: physically weaker than their orc kin, they also tend to be feared or attacked outright by the legions of humans who don't bother making the distinction between full orcs and halfbloods. Still, while not exactly accepted, half-orcs in civilized societies tend to be valued for their martial prowess, and orc leaders have actually been known to spawn them intentionally, as the halfbreeds regularly make up for their lack of physical strength with increased cunning and aggression, making them natural chieftains and strategic advisors.</p>"
        }, 
        {
            "body": "<p><b>Relations</b>: A lifetime of persecution leaves the average half-orc wary and quick to anger, yet those who break through his savage exterior might find a well-hidden core of empathy. Elves and dwarves tend to be the least accepting of half-orcs, seeing in them too great a resemblance to their racial enemies, but other races aren't much more understanding. Human societies with few orc problems tend to be the most accommodating, and there half-orcs make natural mercenaries and enforcers.</p>"
        }, 
        {
            "body": "<p><b>Alignment and Religion</b>: Forced to live either among brutish orcs or as lonely outcasts in civilized lands, most half-orcs are bitter, violent, and reclusive. Evil comes easily to them, but they are not evil by nature—rather, most half-orcs are chaotic neutral, having been taught by long experience that there's no point doing anything but that which directly benefits themselves.</p>"
        }, 
        {
            "body": "<p><b>Adventurers</b>: Staunchly independent, many half-orcs take to lives of adventure out of necessity, seeking to escape their painful pasts or improve their lot through force of arms. Others, more optimistic or desperate for acceptance, take up the mantle of crusaders in order to prove their worth to the world.</p>"
        }
    ],
    "senses": "Darkvision 60 ft., Perception +1",
    "size": "Medium",
    "skill_details": "",
    "skills": [],
    "source": "Bestiary",
    "special_attacks": "",
    "speed": "30 ft.",
    "spells": [],
    "strengthInt":17,
    "treasure": "NPC gear (chain shirt, greataxe, longbow with 100 arrows, other treasure)",
    "type": "creature",
    "xp": "200",
}