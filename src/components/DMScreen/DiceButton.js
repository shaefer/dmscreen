import React, { Component } from 'react';
import DiceBag from '../../utils/DiceBag'

class DiceButton extends Component {
    constructor() {
        super();
        this.diceBag = DiceBag(null);
        this.makeDiceButton = this.makeDiceButton.bind(this);
        this.handleResult = this.handleResult.bind(this);
    }

    handleResult(result) {
        this.props.dmScreenAddResultAction(result);
    }

    makeDiceButton(numOfDice, numOfSides) {
        if (numOfDice < 1 || numOfSides < 1 || numOfDice > 1000 || numOfSides > 1000) return "";
        const clickFunc = () => {
            this.handleResult(this.diceBag.rollDice(numOfDice, numOfSides).toString());
        }
        clickFunc.bind(this);
        return <button onClick={clickFunc} className="tealAwesome">{numOfDice}d{numOfSides}</button>;
    }
    render() {
        return this.makeDiceButton(this.props.numOfDice, this.props.numOfSides);
    }
}

export default DiceButton;
