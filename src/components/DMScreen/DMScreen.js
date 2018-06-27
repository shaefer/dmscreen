import React, { Component } from 'react';
import { connect } from 'react-redux'
import {dmScreenAddResultAction} from '../../action-creators'
import DiceBag from '../../utils/DiceBag'
import './DmScreen.css'

class DMScreen extends Component {
    constructor() {
        super();
        this.handleResult = this.handleResult.bind(this);
        this.diceBag = DiceBag();
    }

    handleResult(result) {
        this.props.dmScreenAddResultAction(result);
    }

    render() {
        const { dmScreen } = this.props;
        console.log(dmScreen)
        return (
            <main className="dmScreen">
                <section>
                    <button onClick={() => {this.handleResult(this.diceBag.rollDice(1, 4))}}>Roll 1d4</button>
                    <button onClick={() => {this.handleResult(this.diceBag.rollDice(2, 4))}}>Roll 2d4</button>
                    <button onClick={() => {this.handleResult(this.diceBag.rollDice(1, 6))}}>Roll 1d6</button>
                    <button onClick={() => {this.handleResult(this.diceBag.rollDice(1, 8))}}>Roll 1d8</button>
                    <button onClick={() => {this.handleResult(this.diceBag.rollDice(1, 10))}}>Roll 1d10</button>
                    <button onClick={() => {this.handleResult(this.diceBag.rollDice(1, 12))}}>Roll 1d12</button>
                    <button onClick={() => {this.handleResult(this.diceBag.rollDice(1, 20))}}>Roll 1d20</button>
                    <button onClick={() => {this.handleResult(this.diceBag.rollDice(1, 100))}}>Roll 1d100</button>
                </section>
                <section>
                    <div>Results</div>
                    {dmScreen.results.slice().reverse().map(x => <div>{x.toString()}</div>)}
                </section>
            </main>

        );
    }
}

export default connect(state => state, {dmScreenAddResultAction})(DMScreen)