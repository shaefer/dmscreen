import Advancement from './ClericAdvancement'
import AngelSolar from '../../models/AngelSolar'

it('creates channel energy string', () => {
    const channelEnergyDisplayFn = Advancement.channelEnergy({monster: AngelSolar, level: 1});
    expect(channelEnergyDisplayFn()).toEqual('channel energy 10/day (DC 17, 1d6)');
});

it('creates channel energy string with increased damage every 2 levels', () => {
    const channelEnergyDisplayFn = Advancement.channelEnergy({monster: AngelSolar, level: 11});
    expect(channelEnergyDisplayFn()).toEqual('channel energy 10/day (DC 22, 6d6)');
});

it('creates channel energy string with increased damage every 2 levels', () => {
    const channelEnergyDisplayFn = Advancement.channelEnergy({monster: AngelSolar, level: 12});
    expect(channelEnergyDisplayFn()).toEqual('channel energy 10/day (DC 23, 6d6)');
});