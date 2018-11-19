import React, { Component } from 'react';
import TavernGenerator from '../../components/TavernNameGenerator';
import rollTimeString from '../../utils/ResultTimestamp'

class TavernNameButton extends Component {
    constructor() {
        super();
        this.makeTavernNameButton = this.makeTavernNameButton.bind(this);
        this.generateTavernNames = this.generateTavernNames.bind(this);
        this.handleResult = this.handleResult.bind(this);
    }

    handleResult(result) {
        this.props.dmScreenAddResultAction(result);
    }

    generateTavernNames(count) {
        const generateTavernNames = TavernGenerator();
        return generateTavernNames(count);
    }

    makeTavernNameButton(count) {
        if (count > 10000) return "";
        const clickFunc = () => {
            const tavernNames = this.generateTavernNames(count);
            const mappedTavernNames = tavernNames.map(x => <div>{x}</div>);
            const timeOfRoll = rollTimeString();
            const timeOfRollStr = `(${timeOfRoll})`;
            const timeOfRollComponent = [<div>{timeOfRollStr}</div>];
            this.handleResult([...timeOfRollComponent, ...mappedTavernNames]);
        }
        clickFunc.bind(this);
        const s = (count > 1) ? "s" : "";
        const buttonName = `Roll ${count} Tavern Name${s}`
        return <button onClick={clickFunc} className="tealAwesome">{buttonName}</button>;
    }
    render() {
        return this.makeTavernNameButton(this.props.count);
    }
}

export default TavernNameButton;
