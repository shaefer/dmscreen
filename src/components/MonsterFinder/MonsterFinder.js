import React, { Component } from 'react';

import './MonsterFinder.css';
//import 'react-select/dist/react-select.css';
import '../../css/ReactSelectCustom.css';

import { connect } from 'react-redux'
import {keyPressHandler, monsterSelectedHandler, hitDiceAdvancementAction, sizeAdvancementAction, abilityScoreAdvancementAction} from '../../action-creators'
import PathfinderMonsterAdvancer from '../PathfinderMonsterAdvancer/PathfinderMonsterAdvancer'
import MonsterOptions from '../MonsterOptions'
import MonsterSelect from './MonsterSelect'
import Aasimar from '../../models/AasimarV2'

import PageViewRecorder from '../../components/PageViewRecorder';
import HitDiceAdvancementSelectMaterial from './subcomponents/HitDiceAdvancementSelectMaterial';
import SizeAdvancementSelectMaterial from './subcomponents/SizeAdvancementSelectMaterial';
import AbilityScoreAdvancementSelectMaterial from './subcomponents/AbilityScoreAdvancementSelectMaterial';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import MonsterDisplay from '../MonsterDisplay';
import { MonsterSizes } from '../PathfinderMonsterAdvancer/AdvancementTools/MonsterSizes';
import TemplateSelect from './subcomponents/TemplateSelect';
import { template } from '@babel/core';

export class MonsterFinder extends Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleMonsterSelectChange = this.handleMonsterSelectChange.bind(this);
    this.handleHitDiceSelectChange = this.handleHitDiceSelectChange.bind(this);
    this.handleSizeSelectChange = this.handleSizeSelectChange.bind(this);
    this.handleAbilityScoreSelectChange = this.handleAbilityScoreSelectChange.bind(this);
  }

  handleKeyPress(e) {
    this.props.keyPressHandler(e);
  }

  handleMonsterSelectChange(e, {suggestion}) {
    this.props.monsterSelectedHandler(suggestion);
    this.props.hitDiceAdvancementAction('reset');
    this.props.sizeAdvancementAction('reset');
    this.props.abilityScoreAdvancementAction('resetall');
  }

  handleHitDiceSelectChange(e) {
    this.props.hitDiceAdvancementAction(parseInt(e.target.value));
  }

  handleSizeSelectChange(e) {
    this.props.sizeAdvancementAction(e.target.value);
  } 

  handleAbilityScoreSelectChange(e, abilityScore) {
    //where abilityScore is the identifier like 'Str'
    console.log(e.target.value, abilityScore);
    this.props.abilityScoreAdvancementAction(parseInt(e.target.value), abilityScore);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
    const title = "Monster Finder (Statblock) - Pathfinder - by Clever Orc Games";
    document.title = title;

    if (this.props.match && this.props.match.params && this.props.match.params.monsterName) {
      this.props.monsterSelectedHandler(this.props.match.params.monsterName);
    }
    if (this.props.location.search) {
      const searchParams = new URLSearchParams(this.props.location.search);
      this.props.abilityScoreAdvancementAction(parseInt(searchParams.get("str")), 'str');
      this.props.abilityScoreAdvancementAction(parseInt(searchParams.get("dex")), 'dex');
      this.props.abilityScoreAdvancementAction(parseInt(searchParams.get("con")), 'con');
      this.props.abilityScoreAdvancementAction(parseInt(searchParams.get("int")), 'int');
      this.props.abilityScoreAdvancementAction(parseInt(searchParams.get("wis")), 'wis');
      this.props.abilityScoreAdvancementAction(parseInt(searchParams.get("cha")), 'cha');

      const sizeToParse = searchParams.get("size");
      if (sizeToParse) {
        const size = MonsterSizes.find(x => x.abbr === sizeToParse.toUpperCase() || x.size.toLowerCase() === sizeToParse.toLowerCase());
        if (size)
          this.props.sizeAdvancementAction(size.size);
      }
      this.props.hitDiceAdvancementAction(parseInt(searchParams.get("hd")));
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
    const theme = createMuiTheme({
      overrides: {
        MuiOutlinedInput: {
          input: {
            padding: 8,
          }
        }
      },
      typography: {
        useNextVariants: true,
      },
    });
    monster = (monster.success) ? monster : { success: true, statBlock: Aasimar};
    const advancedMonster = PathfinderMonsterAdvancer(monster, advancement)
    const templatesOption = false;
    const templateSelect = (templatesOption) ? <TemplateSelect /> : '';
    return (
      <MuiThemeProvider theme={theme}>
      <div className="flex-container">
        <div className="flex-item">
          <MonsterDisplay monster={advancedMonster}/>
        </div>
        <div className="flex-item">
          <div className="flexSelect" style={{backgroundColor: 'white'}}>
            <MonsterSelect listItems={MonsterOptions.map(op => op.props.children)} onSelect={this.handleMonsterSelectChange}/>
            <HitDiceAdvancementSelectMaterial originalHitDice={monster.statBlock.hitDice} selectedHitDice={advancement.hd} onSelect={this.handleHitDiceSelectChange}/>
            <SizeAdvancementSelectMaterial originalSize={monster.statBlock.size} selectedSize={advancement.size} onSelect={this.handleSizeSelectChange} />
            <AbilityScoreAdvancementSelectMaterial selectedValue={advancement.str} abilityScore={"Str"} onSelect={this.handleAbilityScoreSelectChange}/>
            <AbilityScoreAdvancementSelectMaterial selectedValue={advancement.dex} abilityScore={"Dex"} onSelect={this.handleAbilityScoreSelectChange}/>
            <AbilityScoreAdvancementSelectMaterial selectedValue={advancement.con} abilityScore={"Con"} onSelect={this.handleAbilityScoreSelectChange}/>
            <AbilityScoreAdvancementSelectMaterial selectedValue={advancement.int} abilityScore={"Int"} onSelect={this.handleAbilityScoreSelectChange}/>
            <AbilityScoreAdvancementSelectMaterial selectedValue={advancement.wis} abilityScore={"Wis"} onSelect={this.handleAbilityScoreSelectChange}/>
            <AbilityScoreAdvancementSelectMaterial selectedValue={advancement.cha} abilityScore={"Cha"} onSelect={this.handleAbilityScoreSelectChange}/>
            {templateSelect}
          </div>
        </div>
    </div>
    </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => state;


export default connect(mapStateToProps, {keyPressHandler, monsterSelectedHandler, hitDiceAdvancementAction, sizeAdvancementAction, abilityScoreAdvancementAction})(MonsterFinder)
