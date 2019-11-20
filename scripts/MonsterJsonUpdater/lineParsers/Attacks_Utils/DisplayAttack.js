
const withPlus = (stat) => {
    return (stat >= 0) ? `+${stat}` : stat;
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
    //console.log(x)
    const attackType = (x.attackType) ? x.attackType + ' ' : '';
    const attackBonus = (x.attackBonus) ? withPlus(x.toHit) + " " : '';
    const originalAttackDisplay = `${x.attackText}${attackBonus}${attackType}${x.damage}`;
    const damage = displayDamage(x.damage_details);
    const newAttackDisplay = `${x.attackText}${attackBonus}${attackType}(${damage})`;
    return newAttackDisplay;
}

const damageDice = (adjustment => {
    if (adjustment === 0) return "";
    return withPlus(adjustment);
});



const displayDamage = (damageDetails => {
    return damageDetails.map(detail => {
        const newDice = detail.dice.map(dice => {
            return (dice.numOfDice === 0) ? dice.adjustment : `${dice.numOfDice}d${dice.numOfSides}${damageDice(dice.adjustment)}`
        });
        //3 options
        //no dice just damageType
        //someDice no damageType
        //someDice and damageType
        const hasNoDiceNotation = !newDice[0]; //rewrite as filter of detail.dice?
        const damageType = (hasNoDiceNotation) ? detail.damageType : (detail.damageType) ? " " + detail.damageType : "";

        //build critRange and critMultiplier
        const critRange = (detail.critRange) ? "/" + detail.critRange : "";
        const critMult = (detail.critMultiplier) ? "/" + detail.critMultiplier : "";
        const diceAndCrit = (critRange || critMult) ? newDice + critRange + critMult : newDice;
        return diceAndCrit + damageType;

    }).join(" plus ");
});

export default displayFullAttack;