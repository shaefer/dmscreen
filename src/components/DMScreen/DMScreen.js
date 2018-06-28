import React, { Component } from 'react';
import { connect } from 'react-redux'
import {dmScreenAddResultAction, addCustomButtonAction, toggleFormAction} from '../../action-creators'
import DiceBag from '../../utils/DiceBag'
import CreateAButtonForm from '../../components/DMScreen/CreateAButtonForm'
import './DmScreen.css'

class DMScreen extends Component {
    constructor() {
        super();
        this.handleResult = this.handleResult.bind(this);
        this.diceBag = DiceBag();
        this.makeDiceButton = this.makeDiceButton.bind(this);
        this.createAButton = this.createAButton.bind(this);
        this.toggleForm = this.toggleForm.bind(this);
    }

    handleResult(result) {
        this.props.dmScreenAddResultAction(result);
    }

    makeDiceButton(numOfDice, numOfSides) {
        const clickFunc = () => {
            this.handleResult(this.diceBag.rollDice(numOfDice, numOfSides));
        }
        clickFunc.bind(this);
        return <button onClick={clickFunc}>Roll {numOfDice}d{numOfSides}</button>;
    }

    createAButton(values) {
        const button = this.makeDiceButton(values.diceButtonNumOfDice, values.diceButtonNumOfSides);
        this.props.addCustomButtonAction(button);
    }

    toggleForm = (showForm) => {
        this.props.toggleFormAction(showForm);
    }

    render() {
        const { dmScreen } = this.props;
        console.log(dmScreen);
        //TODO: Stats, random charts, random monsters
        //const pathfinderPointBuyScores = {7:-4, 8:-2, 9:-1, 10:0, 11:1, 12:2, 13:3, 14:5, 15:7, 16:10, 17:13, 18:17};

        return (
            <main className="dmScreen">
                <section>
                    {this.makeDiceButton(1, 4)}
                    {this.makeDiceButton(1, 6)}
                    {this.makeDiceButton(1, 8)}
                    {this.makeDiceButton(1, 10)}
                    {this.makeDiceButton(1, 12)}
                    {this.makeDiceButton(1, 20)}
                    {this.makeDiceButton(1, 100)}
                    {dmScreen.buttons.map(x => x)}
                    <CreateAButtonForm onSubmit={this.createAButton} showForm={dmScreen.showForm} toggleFormFunc={this.toggleForm}/>
                </section>
                <section>
                    <div>Results</div>
                    {dmScreen.results.slice().reverse().map(x => <div>{x.toString()}</div>)}
                </section>
            </main>

        );
    }
}

export default connect(state => state, {dmScreenAddResultAction, addCustomButtonAction, toggleFormAction})(DMScreen)