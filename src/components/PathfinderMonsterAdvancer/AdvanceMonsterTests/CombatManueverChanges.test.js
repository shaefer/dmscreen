import { combatManeuverChanges } from '../AdvanceMonster'
import MonstersV2 from '../../../models/MonstersV2'

it('cmb adjusted for changes', () => {
    const result = combatManeuverChanges(MonstersV2.find(x => x.name === 'Adlet'), 5);
    expect(result.cmb).toBe(20)
    expect(result.cmb_details).toBe("+20")
});