import {calculateCR} from '../ChallengeRatingCalculator'
import Behir from '../../../../models/Behir_v9'
import {advanceMonster} from '../../../../components/PathfinderMonsterAdvancer/AdvanceMonster'

it('calculateCR works for monster', () => {
    expect(Behir.crAsNum).toBe(8)
    const crs = calculateCR(Behir);
    expect(crs.ref).toBe(5);
    expect(crs.will).toBe(6);
    expect(crs.fort).toBe(9);
    expect(crs.saves).toBe(6.67);
    expect(crs.hp).toBe(8);
    expect(crs.attack).toBe(8);
    expect(crs.damage).toBe(4);
    expect(crs.ac).toBe(8);
    expect(crs.original).toBe(8);
    //console.log(crs)
    expect(crs.total).toBe(6.93);
});

it('calculateCR works after advancement', () => {
    const advancement = {
        con: 2 //added 2 con for 10 extra hit points (105->115) raises the hpcr from 8->9
    };
    const advancedBehirChanges = advanceMonster(Behir, advancement);
    const advancedBehir = {
        ...Behir,
        ...advancedBehirChanges
    };
    expect(advancedBehir.crCalculation.originalCr.total).toBe(6.93);
    expect(advancedBehir.crCalculation.advancedCr.total).toBe(7);
    expect(advancedBehir.crCalculation.crDiff).toBe(0.07);
    expect(advancedBehir.crCalculation.crAdjusted).toBe(8.07);
})