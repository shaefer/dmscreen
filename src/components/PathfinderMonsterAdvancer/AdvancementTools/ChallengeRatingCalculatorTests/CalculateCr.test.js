import {calculateCR} from '../ChallengeRatingCalculator'
import Behir from '../../../../models/Behir_v9'

it('calculateCR works for monster', () => {
    expect(calculateCR(Behir)).toBe(4.89);
});