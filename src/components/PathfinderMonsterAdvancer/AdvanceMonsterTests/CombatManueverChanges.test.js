import { combatManeuverChanges } from '../AdvanceMonster'
import Aasimar from '../../../models/AasimarV2'

it('cmb adjusted for changes', () => {
    const result = combatManeuverChanges(Aasimar, 5);
    expect(result.cmb).toBe(4)
    expect(result.cmb_details).toBe("+4")
});