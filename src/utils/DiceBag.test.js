import {DiceBag} from './DiceBag'

// it('should roll a die and show the results', () => {
//     //This seems weird that I have to do this...or write a million tests.
//     for (let i = 0;i<=100;i++) {
//         const result = DiceBag.d6();
//         expect(result.total).toBeGreaterThanOrEqual(1);
//         expect(result.total).toBeLessThanOrEqual(6);
//     }
// });

it('should roll a number of dice with a number of sides', () => {
    const numOfDice = 2;
    const numOfSides = 8;
    const result = DiceBag().rollDice(numOfDice, numOfSides);
    expect(result.total).toBeGreaterThanOrEqual(2);
    expect(result.total).toBeLessThanOrEqual(16);
});

it('should return individualResults from all dice rolled', () => {
    const numOfDice = 2;
    const numOfSides = 8;
    const result = DiceBag().rollDice(numOfDice, numOfSides);
    expect(result.individualResults.length).toEqual(2);
})

it('should not allow more than 10000 dice rolled', () => {
    expect(() => {
        DiceBag.rollDice(12000, 8); 
    }).toThrow()
});

it('should produce repeatable results when a seed is provided', () => {
    const seed = "someRandomSeed!";
    const diceBag = DiceBag(seed);
    const result = diceBag.rollDice(2, 6);
    expect(result.total).toEqual(12);
});

it('should take a set of dice and produce a final total', () => {
    const seed = "someRandomSeed!";
    const diceBag = DiceBag(seed);
    const diceSet1 = {numOfDice: 2, numOfSides: 6};
    const diceSet2 = {numOfDice: 3, numOfSides: 8};
    const diceSet3 = {numOfDice: 1, numOfSides: 100};
    const result = diceBag.rollDiceSets([diceSet1, diceSet2, diceSet3]);
    expect(result.total).toEqual(42);
});

it('should take a set of dice and produce a set of results', () => {
    const seed = "someRandomSeed!";
    const diceBag = DiceBag(seed);
    const diceSet1 = {numOfDice: 2, numOfSides: 6};
    const diceSet2 = {numOfDice: 3, numOfSides: 8};
    const diceSet3 = {numOfDice: 1, numOfSides: 100};
    const result = diceBag.rollDiceSets([diceSet1, diceSet2, diceSet3]);
    expect(result.setResults.length).toEqual(3);
});

