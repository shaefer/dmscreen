import Advancement from './SorcererAdvancement'
import Behir from '../../models/Behir_v9'
import seedrandom from 'seedrandom'
import Monsters from '../../models/Monsters'

it('sneak attack should add to special attacks', () => {
    const opts = {
        monster: Behir,
        level: 19,
    }
    const acquiredSpecialAttackFn = Advancement.sneakAttack(opts);
    expect(acquiredSpecialAttackFn()).toEqual("sneak attack +10d6");
});