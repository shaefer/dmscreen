import React, { Component } from 'react';

import './MonsterFinder.css';
import 'react-select/dist/react-select.css';
import '../../css/ReactSelectCustom.css';

import { connect } from 'react-redux'
import Select from 'react-select'
import {keyPressHandler, monsterSelectChangeHandler} from '../../action-creators'
import MonsterDisplay from '../MonsterDisplay'
import MonsterOptions from '../MonsterOptions'

import ReactGA from 'react-ga';

class MonsterFinder extends Component {
  constructor() {
    super();
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleMonsterSelectChange = this.handleMonsterSelectChange.bind(this);
  }

  handleKeyPress(e) {
    this.props.keyPressHandler(e);
  }

  handleMonsterSelectChange(e) {
    this.props.monsterSelectChangeHandler(e);
  }

  handleOptionRender(opt, index, input) {
    const oLabel = opt.label;
    if (!input) return oLabel;
    //matchProps and Pos are important if we wanted to keep functionality matching the filter functionality.
    //for now we will just handle the defaults.

    const match = oLabel.toLowerCase().indexOf(input.toLowerCase());
    if (match < 0) return oLabel;

    const firstPart = oLabel.substr(0, match);
    const secondPart = oLabel.substr(match, input.length);
    const lastPart = oLabel.substr((match + input.length));

    return <div>{firstPart}<span className='highlightMatch'>{secondPart}</span>{lastPart}</div>
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
    const title = "Monster Finder (Statblock) - Pathfinder - by Clever Orc Games";
    document.title = title;

    ReactGA.pageview(window.location.pathname + window.location.search, undefined, title);
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
          <Select 
            optionRenderer={this.handleOptionRender}
            onChange={this.handleMonsterSelectChange} 
            options={MonsterOptions.map(op => {
              return (op.props.value) ? {value: op.props.value, label: op.props.children} : {value: op.props.children, label: op.props.children}
            })}
          />
        </div>
    </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {keyPressHandler, monsterSelectChangeHandler})(MonsterFinder)
