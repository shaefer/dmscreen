
import getCaptureGroups from '../utils/RegexHelper';
//(^[\+\d+]*[ a-zA-Z]*)([\/?\+?\-?\d+]+) ?(\([^\)]+\))
//(^[\+\d+]*[ a-zA-Z\*]*)([\/?\+?\-?\d*]*) ?(touch|melee|melee touch)* ?(\([^\)]+\)) added handling of a "type" after to hit.
//,? ?([\+\d+]*[ a-zA-Z\*\,\d]*)([\/?\+?\-?\d*]*) ?(touch|melee|melee touch)* ?(\([^\)]+\))*
//,? ?([\+\d+]*[ a-zA-Z\*\,\d]*)([\/?\+?\-?\d*]*) ?(melee touch|touch|melee)* ?(\([^\)]+\))*
//,? ?([\dd\+\d ]*[\+\d]*[ a-zA-Z\*\,\d]*)([\/?\+?\-?\d*]*) ?(melee touch|touch|melee)* ?(\([^\)]+\))*
const parseMeleeAttacks = (line) => {
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

const parseRangedAttacks = (line) => {
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

export default parseRangedAttacks;