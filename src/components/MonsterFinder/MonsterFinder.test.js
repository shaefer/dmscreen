import React from 'react';
import ReactDOM from 'react-dom';
import Aasimar from '../../models/AasimarV2'
import Monsters from '../../models/Monsters'
import PathfinderMonsterAdvancer from '../PathfinderMonsterAdvancer/PathfinderMonsterAdvancer';
import { calculateCR } from '../PathfinderMonsterAdvancer/AdvancementTools/ChallengeRatingCalculator';

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

const checkCrCalculationVsPrintedCr = () => {
  const crDiffs = [];
  Monsters.forEach(monsterStats => {
    const cr = calculateCR(monsterStats);
    const diff = Math.abs(cr.original - cr.total);
    if (diff || diff  === 0)
    crDiffs.push({name: monsterStats.name, diff: diff, cr: cr});
  });
  const exactMatch = crDiffs.filter(x => x.diff === 0);
  const overhalf = crDiffs.filter(x => x.diff > 0.5);
  const over1 = crDiffs.filter(x => x.diff > 1);
  const over2 = crDiffs.filter(x => x.diff > 2);
  const over3 = crDiffs.filter(x => x.diff > 3);
  const over4 = crDiffs.filter(x => x.diff > 4);
  const over5 = crDiffs.filter(x => x.diff > 5);
  const over6 = crDiffs.filter(x => x.diff > 6);
  const over7 = crDiffs.filter(x => x.diff > 7);
  const over8 = crDiffs.filter(x => x.diff > 8);
  const maxOver = Math.max(...crDiffs.map(x => x.diff));

  console.log("Over: ", overhalf.length, over1.length, over2.length, over3.length, over4.length, over5.length, over6.length, over7.length, over8.length);
  console.log("%: ", overhalf.length/crDiffs.length, over1.length/crDiffs.length, over2.length/crDiffs.length, over3.length/crDiffs.length, over4.length/crDiffs.length, over5.length/crDiffs.length, over6.length/crDiffs.length, over7.length/crDiffs.length, over8.length/crDiffs.length);
  console.log("Exact matches: " + exactMatch.map(x =>  x.name  + " " + JSON.stringify(x.cr)))
  console.log("Max over: " + maxOver);
}