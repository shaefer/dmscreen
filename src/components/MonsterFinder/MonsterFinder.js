import React, { Component } from 'react';

import './MonsterFinder.css';
//import 'react-select/dist/react-select.css';
import '../../css/ReactSelectCustom.css';

import { connect } from 'react-redux'
import {keyPressHandler, monsterSelectedHandler, hitDiceAdvancementAction, sizeAdvancementAction} from '../../action-creators'
import PathfinderMonsterAdvancer from '../PathfinderMonsterAdvancer/PathfinderMonsterAdvancer'
import MonsterOptions from '../MonsterOptions'
import MonsterSelect from './MonsterSelect'

import PageViewRecorder from '../../components/PageViewRecorder';
import HitDiceAdvancementSelectMaterial from './HitDiceAdvancementSelectMaterial';
import SizeAdvancementSelectMaterial from './SizeAdvancementSelectMaterial';

export class MonsterFinder extends Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleMonsterSelectChange = this.handleMonsterSelectChange.bind(this);
    this.handleHitDiceSelectChange = this.handleHitDiceSelectChange.bind(this);
    this.handleSizeSelectChange = this.handleSizeSelectChange.bind(this);
  }

  handleKeyPress(e) {
    this.props.keyPressHandler(e);
  }

  handleMonsterSelectChange(e, {suggestion}) {
    this.props.monsterSelectedHandler(suggestion);
    this.props.hitDiceAdvancementAction('reset');
    this.props.sizeAdvancementAction('reset');
  }

  handleHitDiceSelectChange(e) {
    this.props.hitDiceAdvancementAction(parseInt(e.target.value));
  }

  handleSizeSelectChange(e) {
    this.props.sizeAdvancementAction(e.target.value);
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
    return (
      <div className="flex-container">
        <div className="flex-item">
          <PathfinderMonsterAdvancer monster={monster} advancement={advancement}/>
        </div>
        <div className="flex-item">
          <div className="flexSelect" style={{backgroundColor: 'white'}}>
            <MonsterSelect listItems={MonsterOptions.map(op => op.props.children)} onSelect={this.handleMonsterSelectChange}/>
            <HitDiceAdvancementSelectMaterial originalHitDice={monster.statBlock.hitDice} selectedHitDice={advancement.hd} onSelect={this.handleHitDiceSelectChange}/>
            <SizeAdvancementSelectMaterial originalSize={monster.statBlock.size} selectedSize={advancement.size} onSelect={this.handleSizeSelectChange} />
          </div>
        </div>
    </div>
    );
  }
}

const mapStateToProps = state => state;


export default connect(mapStateToProps, {keyPressHandler, monsterSelectedHandler, hitDiceAdvancementAction, sizeAdvancementAction})(MonsterFinder)
