import React, { Component } from 'react';

import './MonsterFinder.css';
//import 'react-select/dist/react-select.css';
import '../../css/ReactSelectCustom.css';

import { connect } from 'react-redux'
import Select from 'react-select'
import {keyPressHandler, monsterSelectChangeHandler, monsterSelectedHandler} from '../../action-creators'
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


  //Used to highlight the matched portion of a filter/search "react-select": "^1.2.1",
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

    PageViewRecorder.recordPageView(window.location.pathname + window.location.search, undefined, title);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  render() {
    const { monster } = this.props; //These props can be destructured to pull out any of the reducers (config, select, monster, s3Select, etc.)
    console.log(monster.statBlock.name)

    //https://react-select.com/styles
    //https://github.com/cssinjs/jss/blob/master/docs/json-api.md#regular-rule-without-plugins
    const customStyles = {
      menu: (base, state) => ({
        ...base,
        marginTop: 0,
      }),
      menuList: (base) => ({
        ...base,
        '@media screen and (min-height:740px)': {maxHeight: 600},
        '@media screen and (max-height:640px)': {maxHeight: 500},
        '@media screen and (max-height:600px)': {maxHeight: 400},
        '@media screen and (max-height:480px)': {maxHeight: 300},
        '@media screen and (max-height:320px)': {maxHeight: 180},
      }),
      option: (base) => ({
        ...base,
        padding: 3 //adjust for desktop vs how small on mobile makes it hard to select...
      }),
      control: (base) => ({
        ...base,
        height: 40,
        lineHeight: 40
      })
    }
  //   <Select 
  //   styles={customStyles}
  //   optionRenderer={this.handleOptionRender}
  //   onChange={this.handleMonsterSelectChange} 
  //   options={MonsterOptions.map(op => {
  //     return (op.props.value) ? {value: op.props.value, label: op.props.children} : {value: op.props.children, label: op.props.children}
  //   })}
  // />

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


export default connect(mapStateToProps, {keyPressHandler, monsterSelectChangeHandler, monsterSelectedHandler})(MonsterFinder)
