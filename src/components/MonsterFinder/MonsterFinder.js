import React, { Component } from 'react';

import './MonsterFinder.css';
//import 'react-select/dist/react-select.css';
import '../../css/ReactSelectCustom.css';

import { connect } from 'react-redux'
import {keyPressHandler, monsterSelectedHandler, hitDiceAdvancementAction} from '../../action-creators'
import MonsterDisplay from '../MonsterDisplay'
import PathfinderMonsterAdvancer from '../PathfinderMonsterAdvancer/PathfinderMonsterAdvancer'
import HitDiceAdvancementSelect from './HitDiceAdvancementSelect'
import MonsterOptions from '../MonsterOptions'
import MonsterSelect from './MonsterSelect'

import PageViewRecorder from '../../components/PageViewRecorder';
import HitDiceAdvancementSelectMaterial from './HitDiceAdvancementSelectMaterial';

export class MonsterFinder extends Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleMonsterSelectChange = this.handleMonsterSelectChange.bind(this);
    this.handleHitDiceSelectChange = this.handleHitDiceSelectChange.bind(this);
  }

  handleKeyPress(e) {
    this.props.keyPressHandler(e);
  }

  handleMonsterSelectChange(e, {suggestion}) {
    this.props.monsterSelectedHandler(suggestion);
    this.props.hitDiceAdvancementAction('reset');
  }

  handleHitDiceSelectChange(e) {
    this.props.hitDiceAdvancementAction(parseInt(e.target.value));
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
    const title = "Monster Finder (Statblock) - Pathfinder - by Clever Orc Games";
    document.title = title;

    if (this.props.match && this.props.match.params && this.props.match.params.monsterName)
      this.props.monsterSelectedHandler(this.props.match.params.monsterName);

    PageViewRecorder.recordPageView(window.location.pathname + window.location.search, undefined, title);

  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  render() {
    const { monster, advancement } = this.props; //These props can be destructured to pull out any of the reducers (config, select, monster, s3Select, etc.)
    console.log(monster.statBlock.name, monster.statBlock);
    console.log("Hd change: ", advancement.hd, monster.statBlock.hitDice)
    const diff = advancement.hd - monster.statBlock.hitDice;
    const hdChange = (diff !== NaN) ? ({hd: diff}) : ({}); 
    console.log("CHANGE HIT DICE BY ", hdChange)
    const currentHitDice = (monster.statBlock && monster.statBlock.hitDice) ? monster.statBlock.hitDice : 0;
    //<HitDiceAdvancementSelect currentHitDice={currentHitDice} selectedHitDice={advancement.hd} onSelect={this.handleHitDiceSelectChange} monsterKey={monster.statBlock.name}/>
    return (
      <div className="flex-container">
        <div className="flex-item">
          <PathfinderMonsterAdvancer monster={monster} advancement={hdChange}/>
        </div>
        <div className="flex-item">
          <div className="flexSelect" style={{backgroundColor: 'white'}}>
            <MonsterSelect listItems={MonsterOptions.map(op => op.props.children)} onSelect={this.handleMonsterSelectChange}/>
            <HitDiceAdvancementSelectMaterial currentHitDice={currentHitDice} selectedHitDice={advancement.hd} onSelect={this.handleHitDiceSelectChange}/>
          </div>
        </div>
    </div>
    );
  }
}

const mapStateToProps = state => state;


export default connect(mapStateToProps, {keyPressHandler, monsterSelectedHandler, hitDiceAdvancementAction})(MonsterFinder)
