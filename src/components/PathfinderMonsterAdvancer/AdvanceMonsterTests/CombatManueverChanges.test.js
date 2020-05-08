import { combatManeuverChanges } from '../AdvancementUtils'
import Aasimar from '../../../models/AasimarV2'
import Behir from '../../../models/Behir_v9'

it('cmb adjusted for changes', () => {
    const result = combatManeuverChanges(Aasimar, 5);
    expect(result.cmb).toBe(4)
    expect(result.cmb_details).toBe("+4")
});

it('cmb adjusted for changes', () => {
    const result = combatManeuverChanges(Behir, 5);
    //+18 (+22 grapple)
    expect(result.cmb).toBe(23)
    expect(result.cmb_details).toBe("+23 (+27 grapple)")
});