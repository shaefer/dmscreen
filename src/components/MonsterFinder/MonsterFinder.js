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

import Modal from 'react-awesome-modal';

export class MonsterFinder extends Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleMonsterSelectChange = this.handleMonsterSelectChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.advancementOptionsRef = React.createRef();
    this.advancementOptionsModalRef = React.createRef();
    this.state = {
      visible : false
    }
  }

  openModal() {
    this.setState({
        visible : true
    });
  }

  closeModal() {
    this.setState({
        visible : false
    });
  }

  toggleModal(visible) {
    (this.state.visible) ? this.closeModal() : this.openModal();
  }

  handleKeyPress(e) {
    this.props.keyPressHandler(e);
  }

  handleMonsterSelectChange(e, {suggestion}) {
    this.props.monsterSelectedHandler(suggestion);
    console.log(this.advancementOptionsRef.current)
    this.advancementOptionsRef.current.getWrappedInstance().reset();
    this.advancementOptionsModalRef.current.getWrappedInstance().reset();
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
    //TemplateSelect drop down not working on modal. (Not positioning correctly.)
    return (
      <React.Fragment>
        <div className="flex-container">
          <div className="flex-item">
            <MonsterDisplay monster={advancedMonster}/>
          </div>
          <div className="flex-item">
            <div className="flexSelect" style={{backgroundColor: 'white'}}>
              <MonsterSelect listItems={MonsterOptions.map(op => op.props.children)} onSelect={this.handleMonsterSelectChange}/>
              <div className="mobile_hidden"><AdvancementOptions {...this.props} ref={this.advancementOptionsRef}/></div>
            </div>
          </div>
        </div>
        <div>
          <FloatingButton onClick={this.toggleModal} visible={this.state.visible}/>
        </div>
        
        <Modal visible={this.state.visible} width="100%" height="97%" effect="fadeInRight">
          <div style={{overflowY: 'auto', height: '100%', margin: '2em 1em 1em 1em'}}>
            <AdvancementOptions {...this.props} ref={this.advancementOptionsModalRef}/>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps, {keyPressHandler, monsterSelectedHandler})(MonsterFinder)
