import React from 'react';
import ReactDOM from 'react-dom';
import { MonsterFinder } from './MonsterFinder';
import { PathfinderMonsterAdvancer } from '../PathfinderMonsterAdvancer/PathfinderMonsterAdvancer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const monster = {statBlock:{name: "Behir", hitDice: 10}}
  ReactDOM.render(<PathfinderMonsterAdvancer monster={monster}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
