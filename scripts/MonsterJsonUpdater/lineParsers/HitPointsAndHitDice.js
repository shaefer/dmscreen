const parseHpAndHd = (line) => {
    const json = JSON.parse(line);

    if (json.hp) {
        let powerMatch;
        const powerRegex = /(regeneration|fast healing) (\d+) ?(\([\w, ]*\))?/g;
        while((powerMatch = powerRegex.exec(json.hp)) !== null) {
            if (powerMatch.index === powerRegex.lastIndex) {
                powerRegex.lastIndex++;
            }
            console.log(powerMatch[1], powerMatch[2], powerMatch[3])
            //TODO: Decide how we want regeneration and fast healing entries to look (maybe this indicates other special abilities and qualities as well)
        }


        let m;
        const regex = /(\d+)\s\((\d+)d(\d+)[\+]?(-?\d*)\)/g;
        while ((m = regex.exec(json.hp)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            
            // The result can be accessed through the `m`-variable.
            // m.forEach((match, groupIndex) => {
            //     console.log(`Found match, group ${groupIndex}: ${match}`);
            // });
            const hitPoints =  parseInt(m[1]);
            json.hitPoints = hitPoints;
            const hitDice = parseInt(m[2]);
            json.hitDice = hitDice;
            const hdType = parseInt(m[3]);
            json.hdType = hdType;
            const hitPointAdjustment = (parseInt(m[4]) || 0);
            json.hitPointAdjustment = hitPointAdjustment;

            // console.log(m[0])
            // console.log('hp: ' + hitPoints);
            // console.log('hd: ' + hitDice);
            // console.log('hdType: ' + hdType);
            // console.log('hpBonus: ' + hitPointAdjustment);
        }
    }
    else {
        console.log(json.name + " had no hp field")
    }
    const result = JSON.stringify(json) + "\n";
    return {result: result, success: true, id: json.name};
}

export default parseHpAndHd;