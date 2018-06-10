import React from 'react';
import ReactDOM from 'react-dom';
import MonsterFinder from './MonsterFinder';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MonsterFinder />, div);
  ReactDOM.unmountComponentAtNode(div);
});
