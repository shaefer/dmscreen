import React, { Component } from 'react';
import { connect } from 'react-redux'
import {dmScreenAddResultAction} from '../../action-creators/DmScreenActionCreators'
import DiceBag from '../../utils/DiceBag'
import rollTimeString from '../../utils/ResultTimestamp'

const rollRandomChart = (diceBag, chart, chartName) => {
    const timeOfRoll = rollTimeString();
    const result = chart[diceBag.rollDice(1, chart.length).total - 1];
    return {
        result: result,
        timeOfRoll: timeOfRoll,
        toString: () => `(${timeOfRoll}) ${chartName}: ${result}`
    }
}

class ChartButton extends Component {
    constructor() {
        super();
        this.diceBag = DiceBag(null);
        this.makeRandomChartButton = this.makeRandomChartButton.bind(this);
        this.handleResult = this.handleResult.bind(this);
    }

    handleResult(result) {
        this.props.dmScreenAddResultAction(result);
    }

    makeRandomChartButton(chart, chartName) {
        return <button type="button" className="blueAwesome" onClick={() => this.handleResult(rollRandomChart(this.diceBag, chart, chartName).toString())}>{chartName}</button>
    }

    render() {
        return this.makeRandomChartButton(this.props.chart, this.props.chartName);
    }
}

export default connect(state => state, {dmScreenAddResultAction})(ChartButton)