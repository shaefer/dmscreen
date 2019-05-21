import React from 'react';
import ReactDOM from 'react-dom';
import Aasimar from '../../models/AasimarV2'
import Monsters from '../../models/Monsters'
import PathfinderMonsterAdvancer from '../PathfinderMonsterAdvancer/PathfinderMonsterAdvancer';

//TODO: Make a robust test that checks every monster in the full set.
it('renders without crashing', () => {
  const div = document.createElement('div');
  const monster = {statBlock:Aasimar}
  ReactDOM.render(<PathfinderMonsterAdvancer monster={monster} advancement={{}}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('all monsters render', () => {
  const div = document.createElement('div');

  Monsters.forEach(monsterStats => {
    console.log("TEST RENDER", monsterStats.name);
    const monster = {statBlock:monsterStats}
    ReactDOM.render(<PathfinderMonsterAdvancer monster={monster} advancement={{}}/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

});