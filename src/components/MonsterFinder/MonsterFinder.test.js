import React from 'react';
import ReactDOM from 'react-dom';
import Aasimar from '../../models/AasimarV2'
import Monsters from '../../models/Monsters'
import PathfinderMonsterAdvancer from '../PathfinderMonsterAdvancer/PathfinderMonsterAdvancer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const monster = {statBlock:Aasimar}
  ReactDOM.render(<PathfinderMonsterAdvancer monster={monster} advancement={{}}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

Monsters.forEach(monsterStats => {
  it(`Render ${monsterStats.name}`, () => {
    const div = document.createElement('div');
    const monster = {statBlock:monsterStats, success: true}
    ReactDOM.render(<PathfinderMonsterAdvancer monster={monster} advancement={{hd: monsterStats.hitDice + 1}}/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});