import React, { Component } from 'react';

import './MonsterFinder.css';
import '../../css/ReactSelectCustom.css';
import './subcomponents/advancementOptions_mobile.css';

import { connect } from 'react-redux'
import {keyPressHandler, monsterSelectedHandler} from '../../action-creators'
import PathfinderMonsterAdvancer from '../PathfinderMonsterAdvancer/PathfinderMonsterAdvancer'
import MonsterOptions from '../MonsterOptions'
import MonsterSelect from './MonsterSelect'
import Aasimar from '../../models/AasimarV2'

import PageViewRecorder from '../../components/PageViewRecorder';

import MonsterDisplay from '../MonsterDisplay';
import FloatingButton from '../FloatingButton/FloatingButton';
import AdvancementOptions from './subcomponents/AdvancementOptions';

export class MonsterFinder extends Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleMonsterSelectChange = this.handleMonsterSelectChange.bind(this);
    this.advancementOptionsRef = React.createRef();
  }

  handleKeyPress(e) {
    this.props.keyPressHandler(e);
  }

  handleMonsterSelectChange(e, {suggestion}) {
    this.props.monsterSelectedHandler(suggestion);
    console.log(this.advancementOptionsRef.current)
    this.advancementOptionsRef.current.getWrappedInstance().reset();
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
    const title = "Monster Finder (Statblock) - Pathfinder - by Clever Orc Games";
    document.title = title;

    if (this.props.match && this.props.match.params && this.props.match.params.monsterName) {
      this.props.monsterSelectedHandler(this.props.match.params.monsterName);
    }

    PageViewRecorder.recordPageView(window.location.pathname + window.location.search, undefined, title);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  //TODO: Handle missing cmb and cmd on a bunch of monsters.
  //TODO: Adlet has &times; in attack string rather than an x
  //TODO: Skills and knowledges getting updated by stats lose extras (knowledge loses subtype, any specific bonuses are also lost)
  render() {
    let { monster, advancement } = this.props; //These props can be destructured to pull out any of the reducers (config, select, monster, s3Select, etc.)
    
    monster = (monster.success) ? monster : { success: true, statBlock: Aasimar};
    const advancedMonster = PathfinderMonsterAdvancer(monster, advancement)
    
    return (
      <React.Fragment>
        <div className="flex-container">
          <div className="flex-item">
            <MonsterDisplay monster={advancedMonster}/>
          </div>
          <div className="flex-item">
            <div className="flexSelect" style={{backgroundColor: 'white'}}>
              <MonsterSelect listItems={MonsterOptions.map(op => op.props.children)} onSelect={this.handleMonsterSelectChange}/>
              <AdvancementOptions {...this.props} ref={this.advancementOptionsRef}/>
            </div>
          </div>
        </div>
        <div>
          <FloatingButton/>
        </div>
        <div className="advancement_overlay">
          <AdvancementOptions {...this.props}/>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps, {keyPressHandler, monsterSelectedHandler})(MonsterFinder)
