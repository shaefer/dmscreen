import seedrandom from 'seedrandom'
const sum = (someArray) => {
    return someArray.reduce((arr, n) => arr + n);
}

export const rollDice = (numOfDice, numOfSides, generator = Math.random) => {
    if (numOfDice > 10000) throw new Error("Too many dice...more than 10000");
    if (numOfSides > 10000) throw new Error("Too many sides...more than 10000");
    let individualResults = [];
    for(let i = 1;i<=numOfDice;i++) {
        const result = Math.floor(generator() * numOfSides) + 1;
        individualResults.push(result);
    }
    const total = sum(individualResults);
    const individualResultsString = (numOfDice > 1) ? `[${individualResults}]` : "";
    const rollTime = new Date();
    const rollTimeMillis = ('00' + rollTime.getMilliseconds()).slice(-3);
    const rollTimeStr = `${rollTime.toLocaleTimeString('en-US', { hour12: false })}.${rollTimeMillis}`
    return {
        total: total,
        individualResults: individualResults,
        numOfDice: numOfDice,
        numOfSides: numOfSides,
        timeOfRoll: rollTime,
        toString: () => `(${rollTimeStr}) ${total}, ${numOfDice}d${numOfSides} ${individualResultsString}`
    };
}

export const DiceBag = (seed = "someDefaultSeed!") => {
    const generator = new seedrandom(seed);
    return {
        rollDice: (numOfDice, numOfSides) => {
            return rollDice(numOfDice, numOfSides, generator);
        },
        rollDiceSets: (diceSets) => {
            let setResults = [];
            for(let i = 0;i<diceSets.length;i++) {
                const diceSet = diceSets[i];
                setResults.push(rollDice(diceSet.numOfDice, diceSet.numOfSides, generator));
            }
            return {
                total: sum(setResults.map(x => x.total)),
                setResults: setResults
            }
        }
    }
}

export default DiceBag