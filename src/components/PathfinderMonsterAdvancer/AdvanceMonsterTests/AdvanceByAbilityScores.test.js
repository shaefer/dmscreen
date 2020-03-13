import { advanceMonster } from '../AdvanceMonster'
import Behir from '../../../models/Behir_v9'
import AngelAstralDeva from '../../../models/AngelAstralDeva'
import ProteanVoidWorm from '../../../models/ProteanVoidworm'
import Allosaurus from '../../../models/DinosaurAllosaurus'
import { Fiendish } from '../AdvancementTools/Templates';

it('add 2 dex and adjust cmd and cmd_details, ref saving throw, ac modifiers, init, ranged attack', () => {
    const result = advanceMonster(Behir, {dex: 2});
    expect(result.ability_scores.dex).toBe(14);
    expect(result.cmd).toBe(30);
    expect(result.cmd_details).toBe("30 (can't be tripped)");
    //expect(result.acAsInt).toBe(22) //TODO: Check if we still use this field in the lambda.
    expect(result.armor_class.ac.standard).toBe(22);
    expect(result.armor_class.ac.touch).toBe(10);
    expect(result.armor_class.ac_details).toBe("22, touch 10, flat-footed 20 (+2 Dex, +12 natural, -2 size)")
    expect(result.init).toBe(2);
    expect(result.saving_throws.ref).toBe(9);
});

it('add 2 dex to an advancedMonster statblock has same affect as initial.', () => {
    const firstAdvanceNoChange = advanceMonster(Behir, {dex: 0});
    const result = advanceMonster(firstAdvanceNoChange, {dex: 2});
    expect(result.ability_scores.dex).toBe(14);
    expect(result.cmd).toBe(30);
    expect(result.cmd_details).toBe("30 (can't be tripped)");
    //expect(result.acAsInt).toBe(22) //TODO: Check if we still use this field in the lambda.
    expect(result.armor_class.ac.standard).toBe(22);
    expect(result.armor_class.ac.touch).toBe(10);
    expect(result.armor_class.ac_details).toBe("22, touch 10, flat-footed 20 (+2 Dex, +12 natural, -2 size)")
    expect(result.init).toBe(2);
    expect(result.saving_throws.ref).toBe(9);
});

it('subtract 2 dex and adjust cmd and cmd_details, ref saving throw, ac modifiers, init, ranged attack', () => {
    const result = advanceMonster(Behir, {dex: -2});
    expect(result.ability_scores.dex).toBe(10);
    expect(result.cmd).toBe(28);
    expect(result.cmd_details).toBe("28 (can't be tripped)");
    //expect(result.acAsInt).toBe(20) //TODO: Check if we still use this field in the lambda.
    expect(result.armor_class.ac.standard).toBe(20);
    expect(result.armor_class.ac.touch).toBe(8);
    expect(result.armor_class.ac_details).toBe("20, touch 8, flat-footed 20 (+0 Dex, +12 natural, -2 size)")
    expect(result.init).toBe(0);
    expect(result.saving_throws.ref).toBe(7);
});
    /* No adjustment advancement output
{"ability_scores":{"str":23,"dex":12,"con":21,"int":7,"wis":14,"cha":12},
"acAsInt":21,"alignment":"N",
"armor_class":{"ac":{"standard":21,"flat_footed":20,"touch":9},"ac_details":"21, touch 9, flat-footed 20 (+1 Dex, +12 natural, -2 size)","ac_modifiers":[{"mod":1,"type":"Dex"},{"mod":12,"type":"natural"},{"mod":-2,"type":"size"}],"ac_modifiers_details":"+1 Dex, +12 natural, -2 size"},
"base_attack":10,"cmb":18,"cmb_details":"+18 (+22 grapple)","cmd":29,"cmd_details":"29 (can't be tripped)",
"cr":"8","crAsNum":8,"creature_type":"Magical Beast",
"description":"This slithering, multilegged blue reptile has a fearsome head crowned with two large, curling horns.",
"environment":"warm hills and deserts","feats":"Alertness, Cleave, Great Cleave, Power Attack, Weapon Focus (bite)",
"hdType":10,"hitDice":10,"hitPointAdjustment":50,"hitPoints":105,"hp":"105 (10d10+50)",
"immune":"electricity","init":1,"languages":"Common",
"melee":"bite +15 (2d6+9 plus grab)","melee_attacks":[[{"attackText":"bite ","attackBonus":"+15","damage":"(2d6+9 plus grab)","toHit":15,"attackCount":1,"damage_details":[{"dice":[{"numOfDice":2,"numOfSides":6,"adjustment":9}]}]}]],
"name":"Behir","organization":"solitary or pair","reach":10,"reach_details":"10 ft.",
"saving_throws":{"fort":12,"ref":8,"will":5},
"sections":[{"body":"<p>Temperamental and avaricious, the behir spends most of its time slithering through the sandy hills and desert cliffs that make up its territory, preying upon all creatures who dare to enter its hunting grounds. The creature's six pairs of powerful, clawed legs remain folded against its sides most of the time, only extending in combat to grapple foes or carry the behir forward in a terrifying, low-slung gallop, or else when climbing the sheer cliff faces common to behir lairs.</p>","source":"Bestiary","type":"section"},{"body":"<p>The average behir is 40 feet long and weighs 4,000 pounds. In addition to the two prominent horns on its head, many have additional decorative spines at regular intervals along the central ridges of their backs.</p>","source":"Bestiary","type":"section"},{"body":"<p>While territorial and bestial in its fury, the behir is neither stupid nor necessarily evil, though its self-centeredness and tendency to lay claim to everything visible from its high lairs frequently bring it into conflict with other races. As such, a behir can often be bought off or reasoned with by those brave negotiators willing to get close enough to make their pitch. In these cases, a behir's tendency to attack first and ask questions later (or not at all) means that anyone seeking to strike a deal must bring powerful incentives and impress the behir immediately with his offer.</p>","source":"Bestiary","type":"section"},{"body":"<p>It's often been speculated that behirs are somehow related to blue dragons, but the exact nature of this link remains unknown. Most dragons deny any such association and look down on the behir for its relative lack of intelligence-;a snubbing that infuriates the already short-tempered behir. Thanks to this casual disparagement, many behirs carry deep grudges against dragons, and attack without pause any who cross into their territories.</p>","source":"Bestiary","type":"section"}],
"senses":"darkvision 60 ft., low-light vision; Perception +6","size":"Huge",
"skill_details":"Climb +14, Perception +8, Stealth +5",
"skills":[{"name":"Climb ","value":14},{"name":"Perception ","value":8},{"name":"Stealth ","value":5}],
"source":"Bestiary","space":15,"space_details":"15 ft.",
"special_abilities":[{"name":"Grab","description":"A behir's grab attack works against creatures of any size category. It can constrict the same round it establishes a hold. On any round thereafter that it maintains its hold, the behir can choose to rake the grappled target or swallow it whole.","savingThrow":{"hasSave":false},"type":"Extraordinary"}],
"special_attacks":"breath weapon (20-foot line, 7d6 electricity damage, Reflex DC 20 for half, usable every 1d4 rounds), constrict (2d6+9), rake (6 claws +14, 1d4+6), swallow whole (2d8+9 bludgeoning damage, AC 16, 10 hp)",
"speed":"40 ft., climb 20 ft.","strengthInt":23,"totalHitDice":10,"treasure":"double","type":"creature",
"url":"pfsrd://Bestiary/Monsters/Behir","xp":"4,800",

"advancements":[],
"hpEntries":[{"source":"racial","hdDisplay":"10d10+50[racial]","hitDice":10,"hdType":10,"creatureType":"Magical Beast","hitPointAdjustment":50,"avgHitPoints":105}],
"crCalculation":{"originalCr":{"total":6.93,"original":8,"hp":8,"ac":8,"attack":8,"damage":4,"saves":6.67,"fort":9,"ref":5,"will":6},"advancedCr":{"total":6.93,"original":8,"hp":8,"ac":8,"attack":8,"damage":4,"saves":6.67,"fort":9,"ref":5,"will":6},"crDiff":0,"crAdjusted":8},
"specialAttacksAcquired":"",
"advancedName":"Behir"}
    */


const baseMonster = {
    name: 'No Monster Yet!',
    ability_scores: {
        str: 10,
        dex: 10,
        con: 10,
        int: 10,
        wis: 10,
        cha: 10
    },
    "alignment": "N",
    armor_class: {
        ac: {
            "standard": 10,
            "flat_footed": 10,
            "touch": 10
        },
        //ac_details: "15, touch 10, flat-footed 15 (+5 armor)",
        ac_details: "10, touch 10, flat-footed 10",
        ac_modifiers: [
        //   {
        //     "mod": 5,
        //     "type": "armor"
        //   }
        ],
        //"ac_modifiers_details": "+5 armor"
    },
    "base_attack": 0,
    "cmb": 0,
    "cmd": 0,
    "cr": "0",
    "crAsNum": 0,
    "creature_subtype": "",
    "creature_type": "Humanoid",
    "description": "This is a creature.",
    "environment": "any land",
    "feats": "",
    "hdType": 8,
    "hitDice": 0,
    "hitPointAdjustment": 0,
    "hitPoints": 5,
    "hp": "5 (1d8+0)",
    "init": 0,
    "languages": "Common",
    "melee": "heavy mace +0 (1d8)",
    "melee_attacks": [
        [
            {
                "attackText": "heavy mace ",
                "attackBonus": "0",
                "damage": "(1d8)",
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
                    ]
                }
                ]
            }
        ]
    ],
    "organization": "solitary, pair, or team (3-6)",
    "racial_modifiers": "",//"+2 Diplomacy, +2 Perception",
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
    "resist": "", //"acid 5, cold 5, electricity 5",
    saving_throws: {
        "fort": 0,
        "ref": 0,
        "will": 0
    },
    "senses": "Perception +0",
    "size": "Medium",
    "skill_details": "Knowledge (religion) +5",
    "skills": [
        {
        "name": "Knowledge ",
        "value": 5,
        "subName": "religion"
        }
    ],
    "source": "Bestiary",
    "special_attacks": "",
    "speed": "30 ft. (20 ft. in armor)",
    "spells": [],
    "treasure": "NPC gear (scale mail, heavy mace, light crossbow with 10 bolts, other treasure)",
    "type": "creature",
    "xp": "200"
};

it('add 2 dex and adjust cmd and cmd_details, ref saving throw, ac modifiers, init, ranged attack', () => {
    const result = advanceMonster(baseMonster, {dex: 2});
    expect(result.ability_scores.dex).toBe(12);
    expect(result.cmd).toBe(1);
    expect(result.cmd_details).toBe(1);
    expect(result.armor_class.ac.standard).toBe(11);
    expect(result.armor_class.ac.touch).toBe(11);
    expect(result.armor_class.ac_details).toBe("11, touch 11, flat-footed 10 (+1 Dex)")
    expect(result.init).toBe(1);
    expect(result.saving_throws.ref).toBe(1);
});

it('add 2 dex and adjust cmd and cmd_details, ref saving throw, ac modifiers, init, ranged attack', () => {
    const result = advanceMonster(baseMonster, {dex: -1});
    expect(result.ability_scores.dex).toBe(9);
    expect(result.cmd).toBe(-1);
    expect(result.cmd_details).toBe(-1);
    expect(result.armor_class.ac.standard).toBe(9);
    expect(result.armor_class.ac.touch).toBe(9);
    expect(result.armor_class.ac_details).toBe("9, touch 9, flat-footed 10 (-1 Dex)")
    expect(result.init).toBe(-1);
    expect(result.saving_throws.ref).toBe(-1);
});