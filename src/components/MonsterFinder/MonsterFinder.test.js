import React from 'react';
import ReactDOM from 'react-dom';
import { MonsterFinder } from './MonsterFinder';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const monster = {statBlock:{name:"Random Monster"}}
  ReactDOM.render(<MonsterFinder monster={monster}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
