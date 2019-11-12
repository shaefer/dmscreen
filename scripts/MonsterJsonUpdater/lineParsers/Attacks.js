
import getCaptureGroups from '../utils/RegexHelper';
//(^[\+\d+]*[ a-zA-Z]*)([\/?\+?\-?\d+]+) ?(\([^\)]+\))
//(^[\+\d+]*[ a-zA-Z\*]*)([\/?\+?\-?\d*]*) ?(touch|melee|melee touch)* ?(\([^\)]+\)) added handling of a "type" after to hit.
//,? ?([\+\d+]*[ a-zA-Z\*\,\d]*)([\/?\+?\-?\d*]*) ?(touch|melee|melee touch)* ?(\([^\)]+\))*
//,? ?([\+\d+]*[ a-zA-Z\*\,\d]*)([\/?\+?\-?\d*]*) ?(melee touch|touch|melee)* ?(\([^\)]+\))*
//,? ?([\dd\+\d ]*[\+\d]*[ a-zA-Z\*\,\d]*)([\/?\+?\-?\d*]*) ?(melee touch|touch|melee)* ?(\([^\)]+\))*
export const parseMeleeAttacks = (line) => {
    const json = JSON.parse(line);

    //split attacks on " or " and then on "," (and trim any whitespace)
    
    if (json.melee) {
        const melee = cleanHtml(json.melee);
        json.melee = melee;
        const attackSequences = (json.name !== 'Inevitable, Marut' && json.name !== 'Julunggali') ? melee.split(" or ") : [melee];
        //if (attackSequences.length > 2) console.log("HAS MORE THAN 2 ATTACK SEQUENCES", json.name, melee)
        const fullAttacks = attackSequences.map(x => {
            const regex = /,? ?([\dd\+\d ]*[\+\d]*[ a-zA-Z\*\,\d]*)([\/?\+?\-?\d*]*) ?(melee touch|touch|melee)* ?(\([^\)]+\))*/g;
            const matches = getCaptureGroups(regex, x);
            if (matches) {
                //console.log("YES" + matches.length, json.name, x)
                
                const validMatches = matches.map(m => {
                    return {
                        attackText: m[1],
                        attackBonus: m[2],
                        attackType: m[3],
                        damage: m[4]
                    };
                }).filter(x => x.attackText);
                //if (attackSequences.length > 1 && validMatches.length > 1) console.log(json.name, validMatches)
                return validMatches; //current pattern has a blank match on a lot of entries. 
                

            }
            console.error("NO MATCH", json.name, x)
            return "";
        });
        //do something with fullattacks
        //rebuild melee string with all the parts we collected...it should match perfectly...address any that don't

            const fullAttackText = displayFullAttack(fullAttacks);

            const diffMeasure = getEditDistance(melee, fullAttackText);

            if (diffMeasure > 0) {
                //console.log("--------------" + json.name + "------------")
                console.log(json.name, diffMeasure)
                console.log(melee)
                console.log(fullAttackText)

            } else {
                json.melee = fullAttackText;
                json.melee_attacks = fullAttacks;
            }
    }

    const result = JSON.stringify(json) + "\n";
    return {result: result, success: true, id: json.name};
}


/**
 * Natural Attacks
Most creatures possess one or more natural attacks (attacks made without a weapon). 
These attacks fall into one of two categories, primary and secondary attacks. 
Primary attacks are made using the creature’s full base attack bonus and add the creature’s full Strength bonus on damage rolls. 
Secondary attacks are made using the creature’s base attack bonus –5 and add only 1/2 the creature’s Strength bonus on damage rolls. 
If a creature has only one natural attack, it is always made using the creature’s full base attack bonus and adds 1-1/2 times the creature’s Strength bonus on damage rolls. 
This increase does not apply if the creature has multiple attacks but only takes one. 
If a creature has only one type of attack, but has multiple attacks per round, that attack is treated as a primary attack, regardless of its type. 
You do not receive additional natural attacks for a high base attack bonus. 
Instead, you receive additional attack rolls for multiple limb and body parts capable of making the attack (as noted by the race or ability that grants the attacks).
 */

/**
 * 
Natural Attack	Base Damage by Size*	Damage Type	Attack type
        Fine	Dim.	Tiny	Small	Medium	Large	Huge	Garg.	Col.
Bite	1	    1d2	    1d3	    1d4	    1d6	    1d8	    2d6	    2d8	    4d6	B, P, and S	Primary
Claw	–	    1	1d2	1d3	1d4	1d6	1d8	2d6	2d8	B and S	Primary
Gore	1	    1d2	1d3	1d4	1d6	1d8	2d6	2d8	4d6	P	Primary
Hoof, Tentacle, Wing	–	1	1d2	1d3	1d4	1d6	1d8	2d6	2d8	B	Secondary
Pincers, Tail Slap	1	1d2	1d3	1d4	1d6	1d8	2d6	2d8	4d6	B	Secondary
Slam	–	1	1d2	1d3	1d4	1d6	1d8	2d6	2d8	B	Primary
Sting	–	1	1d2	1d3	1d4	1d6	1d8	2d6	2d8	P	Primary
Talons	–	1	1d2	1d3	1d4	1d6	1d8	2d6	2d8	S	Primary
Other	–	1	1d2	1d3	1d4	1d6	1d8	2d6	2d8	B, P, or S	Secondary
 */
export const parseNaturalAttacks = (line) => {
    const json = JSON.parse(line);

    //toHit and dice.adjustment (although this will need to account for 1x 1.5x or 2x str bonus)
    const startingDmgProgressionEquivalent = {"3d4":"2d6", "1d12":"2d6", "2d10":"4d6", "2d4":"1d8"}; //dmg amounts not on chart  equated to one that  is on the chart.
    const completeDmgProgression = ["1", "1d2", "1d3", "1d4", "1d6", "1d8", "2d6", "2d8", "4d6", "4d8", "6d6", "6d8", "8d6", "8d8", "10d6", "10d8", "12d6", "12d8"];
    const hoofTentacleWing = {seqStart: "Diminutive", damageType: ["B"], primary: false};
    const pincerTailSlap = {seqStart: "Fine", damageType: ["B"], primary: false};
    const slamStingTalon = {seqStart: "Diminutive", primary: true};
    const naturalAttacks = {
        attackNames: ["bite", "claw", "gore", "slam", "sting", "talons", "hoof", "tentacle", "wing", "pincer", "tail"],
        bite: {name: "bite", seqStart:"Fine", damageType: ["B", "P", "S"], primary: true},
        claw: {name: "claw", seqStart: "Diminutive", damageType: ["B", "S"], primary: true},
        gore: {name: "gore", seqStart: "Fine", damageType: ["P"], primary: true},
        hoof: {name: "hoof", ...hoofTentacleWing},
        tentacle: {name: "tentacle", ...hoofTentacleWing},
        wing: {name: "wing", ...hoofTentacleWing},
        pincer: {name: "pincer", ...pincerTailSlap},
        tail: {name: "tail slap", ...pincerTailSlap},
        slam: {name: "slam", damageType: ["B"], ...slamStingTalon},
        sting: {name: 'sting', damageType: ["P"], ...slamStingTalon},
        talon: {name: 'talon', damageType: ["S"], ...slamStingTalon},
        other: {name: 'other', seqStart: "Diminutive", damageType: ["B", "P", "S"], primary: false}
    };
    
    const result = JSON.stringify(json) + "\n";
    return {result: result, success: true, id: json.name};
}

export const parseRangedAttacks = (line) => {
    const json = JSON.parse(line);

    //split attacks on " or " and then on "," (and trim any whitespace)
    
    if (json.ranged) {
        const ranged = cleanHtml(json.ranged);
        json.ranged = ranged;
        const attackSequences = (json.name !== 'Inevitable, Marut' && json.name !== 'Julunggali') ? ranged.split(" or ") : [ranged];
        //if (attackSequences.length > 2) console.log("HAS MORE THAN 2 ATTACK SEQUENCES", json.name, ranged)
        const fullAttacks = attackSequences.map(x => {
            const regex = /,? ?([\dd\+\d ]*[\+\d]*[ a-zA-Z\*\,\d]*)([\/?\+?\-?\d*]*) ?(ranged touch|touch|ranged)* ?(\([^\)]+\))*/g;
            const matches = getCaptureGroups(regex, x);
            if (matches) {
                //console.log("YES" + matches.length, json.name, x)
                
                const validMatches = matches.map(m => {
                    return {
                        attackText: m[1],
                        attackBonus: m[2],
                        attackType: m[3],
                        damage: m[4]
                    };
                }).filter(x => x.attackText);
                //if (attackSequences.length > 1 && validMatches.length > 1) console.log(json.name, validMatches)
                return validMatches; //current pattern has a blank match on a lot of entries. 
                

            }
            console.error("NO MATCH", json.name, x)
            return "";
        });
        //do something with fullattacks
        //rebuild ranged string with all the parts we collected...it should match perfectly...address any that don't

            const fullAttackText = displayFullAttack(fullAttacks);

            const diffMeasure = getEditDistance(ranged, fullAttackText);

            if (diffMeasure > 0) {
                //console.log("--------------" + json.name + "------------")
                console.log(json.name, diffMeasure)
                console.log(ranged)
                console.log(fullAttackText)

            } else {
                json.ranged = fullAttackText;
                json.ranged_attacks = fullAttacks;
            }
    }

    const result = JSON.stringify(json) + "\n";
    return {result: result, success: true, id: json.name};
}

export const parseMeleeAttackToHitAndDamage = (line) => {
    const json = JSON.parse(line);
    const monsterName = json.name;
    const meleeAttacks = json.melee_attacks;
    if (meleeAttacks) {
        for (let i = 0; i < meleeAttacks.length; i++) {
            const attackSeq = meleeAttacks[i];
            for (let j = 0; j < attackSeq.length; j++) {
                const attack = attackSeq[j];
                parseAndSetAttackToHitAndAttackCount(monsterName, attack);
                parseAndSetDamageDetails(monsterName, attack);
            }
        }
    }

    const result = JSON.stringify(json) + "\n";
    return {result: result, success: true, id: json.name};
}

export const parseRangedAttackToHitAndDamage = (line) => {
    const json = JSON.parse(line);
    const monsterName = json.name;
    const attacks = json.ranged_attacks;
    if (attacks) {
        for (let i = 0; i < attacks.length; i++) {
            const attackSeq = attacks[i];
            for (let j = 0; j < attackSeq.length; j++) {
                const attack = attackSeq[j];
                parseAndSetAttackToHitAndAttackCount(monsterName, attack);
                parseAndSetDamageDetails(monsterName, attack);
            }
        }
    }

    const result = JSON.stringify(json) + "\n";
    return {result: result, success: true, id: json.name};
}

const parseAndSetAttackToHitAndAttackCount = (monsterName, attack) => {
    if (attack.attackBonus === '') return;
    attack.toHit = parseInt(attack.attackBonus);
    const slashesInAttackBonus = attack.attackBonus.match(/\//g)||[];
    const startsWithNumber = attack.attackText.match(/^\d+/);
    if (startsWithNumber && slashesInAttackBonus.length === 0) {
        //Asura, Adhukait +15/+10 2 mwk kukris is an example of a creature that lists 2 weapons but that is already accounted for in the attackBonus.
        attack.attackCount = parseInt(startsWithNumber[0]);
    } else {
        attack.attackCount = (slashesInAttackBonus).length + 1;
    }
    if (slashesInAttackBonus.length > 0) {
        attack.weaponBased = true;
    }
    console.log(monsterName, attack.toHit, attack.attackCount, attack.attackBonus, attack.attackText);
}

const withPlus = (stat) => {
    return (stat >= 0) ? `+${stat}` : stat;
}

const parseAndSetDamageDetails = (monsterName, attack) => {
    const dmg = attack.damage;
    //try this to just get damageDescriptor without trying to parse specifics (may still want to strip an ending "plus " from the descriptor)
    const damageAmountsRegex = /(\d+d\d+[\+\-]*\d*|(?<!DC )(?<!DC \d)\d+)\/?(\d*-\d*\/[×x][234]|\d*-\d*|[x×][234])* ?([\[a-zA-Z\s]+)/gm;
    const damageAmountsRegex = /(\d+d\d+[\+\-]*\d*|(?<!DC )(?<!DC \d)\d+)\/?(\d*-\d*\/[×x][234]|\d*-\d*|[x×][234])* ?(cold|bleed|acid|electricity|fire|negative energy|energy|sonic|Strength|Dexterity|Constitution|Wisdom|Intelligence|Charisma|Str|Dex|Con|Int|Wis|Cha)* ?(damage|drain)*/gm;
    const matches = getCaptureGroups(damageAmountsRegex, dmg)
    const damageDetails = matches.map(x => {
        const dice = parseDiceNotation(x[1]);
        return {
            dice: dice,
            critRangeAndMultiplier: x[2],
            damageType: x[3],
            statDamageOrDrain: x[4]
        };
    });
    attack.damage_details = damageDetails;
    console.log(monsterName, JSON.stringify(attack.damage_details));
}

const parseDiceNotation = (diceNotation) => {
    if (diceNotation.indexOf("d") === -1) {
        //just a straight number...no dice to roll.
        return [{numOfDice: 0, numOfSides: 0, adjustment: diceNotation}];
    } else {
        //https://regex101.com/r/FD7Z9L/1
        const diceRegex = /((\d*)d(\d*))([\+\-]?\d*)/gm;
        const matches = getCaptureGroups(diceRegex, diceNotation);
        return matches.map(x => {
            return {
                numOfDice: parseInt(x[2]) || 0,
                numOfSides: parseInt(x[3]) || 0,
                adjustment: parseInt(x[4]) || 0
            }
        });
    }
}

const cleanHtml = (str) => {
    const strWithoutPStart = str.replace('<p class="stat-block-2">', '');
    const cleanStr = strWithoutPStart.replace('</p>', '');
    return cleanStr;
}

const displayFullAttack = (fullAttacks) => {
    const attackSequencesAsText = fullAttacks.map(attackSequences => {
        //console.log(attackSequences);
        const attacksAsText = attackSequences.map(attack => {
            return displayAttack(attack);
        });
        return attacksAsText.join(", ");
    });
    return attackSequencesAsText.join(" or ");
}

const displayAttack = (x) => {
    const attackType = (x.attackType) ? x.attackType + ' ' : '';
    const attackBonus = (x.attackBonus) ? x.attackBonus + " " : '';
    return  `${x.attackText}${attackBonus}${attackType}${x.damage}`;
}

const getEditDistance = function(a, b){
    if(a.length == 0) return b.length; 
    if(b.length == 0) return a.length; 
  
    var matrix = [];
  
    // increment along the first column of each row
    var i;
    for(i = 0; i <= b.length; i++){
      matrix[i] = [i];
    }
  
    // increment each column in the first row
    var j;
    for(j = 0; j <= a.length; j++){
      matrix[0][j] = j;
    }
  
    // Fill in the rest of the matrix
    for(i = 1; i <= b.length; i++){
      for(j = 1; j <= a.length; j++){
        if(b.charAt(i-1) == a.charAt(j-1)){
          matrix[i][j] = matrix[i-1][j-1];
        } else {
          matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                                  Math.min(matrix[i][j-1] + 1, // insertion
                                           matrix[i-1][j] + 1)); // deletion
        }
      }
    }
  
    return matrix[b.length][a.length];
  };