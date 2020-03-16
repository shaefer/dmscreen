export const HalfElf = {
    "ability_scores": {
        "str": 14,
        "dex": 15,
        "con": 12,
        "int": 13,
        "wis": 10,
        "cha": 10
    },
    "acAsInt": 17,
    "alignment": "CG",
    "armor_class": {
        "ac_details": "17, touch 12, flat-footed 15 (+5 armor, +2 dex)",
        "ac_modifiers": [
            {
                "mod": 5,
                "type": "armor",
                "maxDex": 3
            },
            {
                "mod": 2,
                "type": "Dex"
            }
        ],
        "ac_modifiers_details": "+5 armor, +2 dex",
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
    "creature_subtype": "elf, human",
    "creature_type": "Humanoid",
    "description": "This is a half-elf.",
    "environment": "any",
    "feats": "Skill Focus (Perception)",
    "hdType": 8,
    "hitDice": 0,
    "hitPointAdjustment": 0,
    "hitPoints": 5,
    "hp": "0 (0d8+0[racial])",
    "init": 0,
    "languages": "Common, Elven",
    "melee": "longsword +2 (1d8/19-20)",
    "melee_attacks": [
        [
            {
                "attackText": "longsword ",
                "attackBonus": "+2",
                "damage": "(1d8/19-20)",
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
                        "critRange": "19-20"
                    }
                ]
            }
        ]
    ],
    "name": "Half-elf",
    "npc": true,
    "organization": "solitary, pair, or team (3-6)",
    "racial_modifiers": "+2 any, +2 Perception, Skill Focus, 2 favored classes",
    "racial_ability_scores": {
        "any": 2
    },
    "ranged": "longbow +2 (1d8/x3)",
    "ranged_attacks": [
        [
            {
                "attackText": "longbow ",
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
        "fort": 1,
        "ref": 2,
        "will": 0,
    },
    "sections": [
        {
            "body": "<p>Elves have long drawn the covetous gazes of other races. Their generous life spans, magical affinity, and inherent grace each contribute to the admiration or bitter envy of their neighbors. Of all their traits, however, none so entrance their human associates as their beauty. Since the two races first came into contact with each other, the humans have held up elves as models of physical perfection, seeing in the fair folk idealized versions of themselves. For their part, many elves find humans attractive despite their comparatively barbaric ways, drawn to the passion and impetuosity with which members of the younger race play out their brief lives.</p>"
        },
        {
            "body": "<p>Sometimes this mutual infatuation leads to romantic relationships. Though usually short-lived, even by human standards, these trysts commonly lead to the birth of half-elves, a race descended of two cultures yet inheritor of neither. Half-elves can breed with one another, but even these \"pureblood\" half-elves tend to be viewed as bastards by humans and elves alike.</p>"
        },
        {
            "body": "<p><b>Physical Description</b>: Half-elves stand taller than humans but shorter than elves. They inherit the lean build and comely features of their elven lineage, but their skin color is dictated by their human side. While half-elves retain the pointed ears of elves, theirs are more rounded and less pronounced. A half-elf's human-like eyes tend to range a spectrum of exotic colors running from amber or violet to emerald green and deep blue.</p>"
        }, 
        {
            "body": "<p><b>Society</b>: The lack of a unified homeland and culture forces half-elves to remain versatile, able to conform to nearly any environment. While often attractive to both races for the same reasons as their parents, half-elves rarely fit in with either humans or elves, as both races see too much evidence of the other in them. This lack of acceptance weighs heavily on many half-elves, yet others are bolstered by their unique status, seeing in their lack of a formalized culture the ultimate freedom. As a result, half-elves are incredibly adaptable, capable of adjusting their mindsets and talents to whatever societies they find themselves in.</p>"
        }, 
        {
            "body": "<p><b>Relations</b>: A half-elf understands loneliness, and knows that character is often less a product of race than of life experience. As such, half-elves are often open to friendships and alliances with other races, and less likely to rely on first impressions when forming opinions of new acquaintances.</p>"
        }, 
        {
            "body": "<p><b>Alignment and Religion</b>: Half-elves' isolation strongly influences their characters and philosophies. Cruelty does not come naturally to them, nor does blending in and bending to societal convention—as a result, most half-elves are chaotic good. Half-elves' lack of a unified culture makes them less likely to turn to religion, but those who do generally follow the common faiths of their homeland.</p>"
        }, 
        {
            "body": "<p><b>Adventurers</b>: Half-elves tend to be itinerants, wandering the lands in search of a place they might finally call home. The desire to prove oneself to the community and establish a personal identity—or even a legacy—drives many half-elf adventurers to lives of bravery.</p>"
        }
    ],
    "senses": "Low-light vision, Perception +5",
    "size": "Medium",
    "skill_details": "",
    "skills": [],
    "source": "Bestiary",
    "special_attacks": "",
    "speed": "30 ft.",
    "spells": [],
    "strengthInt":14,
    "treasure": "NPC gear (scale mail, longsword, longbow with 100 arrows, other treasure)",
    "type": "creature",
    "xp": "200",
}