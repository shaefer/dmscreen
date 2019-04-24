import {calculateCR} from '../ChallengeRatingCalculator'
import Behir from '../../../../models/Behir_v9'

it('calculateCR works for monster', () => {
    expect(Behir.crAsNum).toBe(8)
    const crs = calculateCR(Behir);
    expect(crs.total).toBe(5.33);
});