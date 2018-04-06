import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import {keyPressHandler, monsterSelectChangeHandler} from './action-creators'
import MonsterDisplay from './components/MonsterDisplay'
import MonsterOptions from './components/MonsterOptions'

class App extends Component {
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

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  render() {
    const { config, monster } = this.props;
    return (
      <div className="flex-container">
        <div className="flex-item">
          <MonsterDisplay monster={monster}/>
        </div>
        <div className="flex-item">
          <select className="flex-item" onChange={this.handleMonsterSelectChange}>
            {MonsterOptions.map(op => op)}
          </select>
        </div>
    </div>

    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {keyPressHandler, monsterSelectChangeHandler})(App)
