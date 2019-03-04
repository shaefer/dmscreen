import React from 'react';
import ReactDOM from 'react-dom';
import Aasimar from '../../models/AasimarV2'
import PathfinderMonsterAdvancer from '../PathfinderMonsterAdvancer/PathfinderMonsterAdvancer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const monster = {statBlock:Aasimar}
  ReactDOM.render(<PathfinderMonsterAdvancer monster={monster} advancement={{}}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
