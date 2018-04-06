import React, { Component } from 'react';

import './App.css';
import 'react-select/dist/react-select.css';
import './css/ReactSelectCustom.css';

import { connect } from 'react-redux'
import Select from 'react-select'
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
    const { config, select, monster } = this.props;
    console.log(monster.statBlock.name)
    return (
      <div className="flex-container">
        <div className="flex-item">
          <MonsterDisplay monster={monster}/>
        </div>
        <div className="flex-item">
          <Select 
            value={select.selectedMonsterName}
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

{/* <Select
        name="form-field-name"
        value={value}
        onChange={this.handleChange}
        options={[
          { value: 'one', label: 'One' },
          { value: 'two', label: 'Two' },
        ]}
      /> */}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {keyPressHandler, monsterSelectChangeHandler})(App)
