
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

    if (json.melee_attacks) {
        const flatAttacks = json.melee_attacks.reduce((acc, val) => acc.concat(val), []);
        const attackBonusAsInt = flatAttacks.map(x => { return {val: parseInt(x.attackBonus), orig: x.attackBonus}});
        //+14/+14/+9/+9/+4, '', -2

        for (let i = 0; i < json.melee_attacks.length; i++) {
            const attackSeq = json.melee_attacks[i];
            for (let j = 0; j < attackSeq.length; j++) {
                const attack = attackSeq[j];
                if (attack.attackBonus !== '') {
                    attack.toHit = parseInt(attack.attackBonus);
                    const slashesInAttackBonus = attack.attackBonus.match(/\//g)||[];
                    const startsWithNumber = attack.attackText.match(/^\d+/);
                    if (startsWithNumber && slashesInAttackBonus.length === 0) {
                        //Asura, Adhukait +15/+10 2 mwk kukris is an example of a creature that lists 2 weapons but that is already accounted for in the attackBonus.
                        attack.attackCount = startsWithNumber[0];
                    } else {
                        attack.attackCount = (slashesInAttackBonus).length + 1;
                    }
                    console.log(json.name, attack.toHit, attack.attackCount, attack.attackBonus, attack.attackText);
                }
            }
        }
    }

    const result = JSON.stringify(json) + "\n";
    return {result: result, success: true, id: json.name};
}

const calculateDamageFromAttackSequence = (attackSequence) => {
    let sumOfDmg = 0;
    for (let i = 0; i<attackSequence.length; i++) {
        const dmg = attackSequence[i].damage;
        const damageAmountsRegex = /(\d+d\d+[\+\-]*\d*|(?<!DC )(?<!DC \d)\d+)\/?(\d*-\d*\/[×x][234]|\d*-\d*|[x×][234])* ?(cold|bleed|acid|electricity|fire|negative energy|energy|sonic|Strength|Dexterity|Constitution|Wisdom|Intelligence|Charisma|Str|Dex|Con|Int|Wis|Cha)* ?(damage|drain)*/gm;
        const matches = getCaptureGroups(damageAmountsRegex, dmg)
        for(let i = 0;i<matches.length;i++) {
            const match = matches[i];
            const dice = match[1];
            //const critRangeAndMultiplier = match[2];
            const dmgType = match[3];
            //const statDmgOrDrain = match[4];
            
            const avgDmg = diceAverage(dice);
            console.log("match", i, dice, avgDmg)
            sumOfDmg += avgDmg;
        }
        //first just dice part of damage string: \d+d\d+[\+\-]*\d*
        //https://regex101.com/r/X8yCC3/1/
    }
    return sumOfDmg;
}

const diceAverage = (diceNotation) => {
    if (diceNotation.indexOf("d") === -1) {
        //just a straight number...no dice to roll.
        return diceNotation;
    } else {
        //https://regex101.com/r/FD7Z9L/1
        const diceRegex = /((\d*)d(\d*))([\+\-]?\d*)/gm;
        const matches = getCaptureGroups(diceRegex, diceNotation);
        let sumOfDmg = 0;
        for(let i = 0;i<matches.length;i++) {
            const match = matches[i];
            const numOfDice = match[2];
            const numOfSides = match[3];
            const adjustment = parseInt(match[4]) || 0;
            const avgDmg = (numOfDice * (numOfSides / 2 + 0.5)) + adjustment;
            sumOfDmg += avgDmg;
        }
        return sumOfDmg;
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