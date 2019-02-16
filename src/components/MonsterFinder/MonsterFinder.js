import React, { Component } from 'react';

import './MonsterFinder.css';
//import 'react-select/dist/react-select.css';
import '../../css/ReactSelectCustom.css';

import { connect } from 'react-redux'
import {keyPressHandler, monsterSelectedHandler} from '../../action-creators'
import MonsterDisplay from '../MonsterDisplay'
import MonsterOptions from '../MonsterOptions'
import MonsterSelect from './MonsterSelect'

import PageViewRecorder from '../../components/PageViewRecorder';

export class MonsterFinder extends Component {
  constructor() {
    super();
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleMonsterSelectChange = this.handleMonsterSelectChange.bind(this);
  }

  handleKeyPress(e) {
    this.props.keyPressHandler(e);
  }

  handleMonsterSelectChange(e, {suggestion}) {
    this.props.monsterSelectedHandler(suggestion);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
    const title = "Monster Finder (Statblock) - Pathfinder - by Clever Orc Games";
    document.title = title;

    PageViewRecorder.recordPageView(window.location.pathname + window.location.search, undefined, title);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  render() {
    const { monster } = this.props; //These props can be destructured to pull out any of the reducers (config, select, monster, s3Select, etc.)
    console.log(monster.statBlock.name)

    return (
      <div className="flex-container">
        <div className="flex-item">
          <MonsterDisplay monster={monster}/>
        </div>
        <div className="flex-item">
          <div className="flexSelect">
            <MonsterSelect listItems={MonsterOptions.map(op => op.props.children)} onSelect={this.handleMonsterSelectChange}/>
          </div>
        </div>
    </div>
    );
  }
}

const mapStateToProps = state => state;


export default connect(mapStateToProps, {keyPressHandler, monsterSelectedHandler})(MonsterFinder)
