import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import {Container, Row, Col} from 'react-grid-system'
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
    console.log(config.initialState);
    console.log(monster.statBlock);
    return (
      <Container fluid={true}>
        <Row>
          <Col sm={2}>
            <select onChange={this.handleMonsterSelectChange}>
              <MonsterOptions/>
            </select>
          </Col>
          <Col sm={8}>
            <div>
              <MonsterDisplay monster={monster}/>
            </div>
          </Col>
          <Col sm={2}>
            Right Col
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {keyPressHandler, monsterSelectChangeHandler})(App)
