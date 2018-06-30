import React, { Component } from 'react';
import { connect } from 'react-redux'
import {dmScreenAddResultAction, addCustomButtonAction, toggleFormAction, fetchSelectAction} from '../../action-creators'
import DiceBag from '../../utils/DiceBag'
import CreateAButtonForm from '../../components/DMScreen/CreateAButtonForm'
import MonsterDisplay from '../../components/MonsterDisplay'
import './DmScreen.css'

import {DungeonEntrances, Backgrounds, DungeonLocations, DungeonTypes, DungeonRooms, NpcCharacteristicsPhysical, NpcCharacteristics} from './RandomCharts'

const rollTimeString = () => {
    const rollTime = new Date();
    const rollTimeMillis = ('00' + rollTime.getMilliseconds()).slice(-3);
    const rollTimeStr = `${rollTime.toLocaleTimeString('en-US', { hour12: false })}.${rollTimeMillis}`;
    return rollTimeStr;
}

const rollRandomChart = (diceBag, chart, chartName) => {
    const timeOfRoll = rollTimeString();
    const result = chart[diceBag.rollDice(1, chart.length).total - 1];
    return {
        result: result,
        timeOfRoll: timeOfRoll,
        toString: () => `(${timeOfRoll}) ${chartName}: ${result}`
    }
}

const remove = (array, element) => {
    const index = array.indexOf(element);
    
    if (index !== -1) {
        array.splice(index, 1);
    }
}

const rollStatsFunc = (diceBag, numOfDice, numOfSides, drop=0) => {

    const rollAndDrop = (diceBag, numOfDice, numOfSides, drop) => {
        const statResults = diceBag.rollDice(numOfDice, numOfSides).individualResults;
        let adjustedResults = [...statResults];
        let removedResults = [];
        for (let i = 1;i<=drop;i++) {
            const valToRemove = Math.min(...adjustedResults)
            remove(adjustedResults, valToRemove);
            removedResults.push(valToRemove);
        }
        const newTotal = adjustedResults.reduce((arr, v) => arr + v)

        let rollWithDropStr = statResults.join(",");
        for(let i = 0;i<removedResults.length;i++) {
            const item = removedResults[i];
            if (rollWithDropStr.startsWith(item)) {
                rollWithDropStr = rollWithDropStr.replace(item, "<span class='strikeThrough'>" + item + "</span>");
            } else {
                rollWithDropStr = rollWithDropStr.replace("," + item, ",<span class='strikeThrough'>" + item + "</span>");
            }
        }
        rollWithDropStr = "<span>"+rollWithDropStr+"</span>";

        const result = {
            rolled: statResults,
            adjustedRoll: adjustedResults,
            dropped: removedResults,
            rollWithDropStr: rollWithDropStr,
            total: newTotal
        }
        console.log(result);
        return result;
    }


    const stats = {
        str: rollAndDrop(diceBag, numOfDice, numOfSides, drop),
        dex: rollAndDrop(diceBag, numOfDice, numOfSides, drop),
        con: rollAndDrop(diceBag, numOfDice, numOfSides, drop),
        int: rollAndDrop(diceBag, numOfDice, numOfSides, drop),
        wis: rollAndDrop(diceBag, numOfDice, numOfSides, drop),
        cha: rollAndDrop(diceBag, numOfDice, numOfSides, drop),
        rollTime: rollTimeString()
    }

    console.log(stats.str.adjustedRoll, stats.str.newTotal)
    const pathfinderPointBuyScores = {3: -6, 4: -5, 5: -5, 6: -4, 7:-4, 8:-2, 9:-1, 10:0, 11:1, 12:2, 13:3, 14:5, 15:7, 16:10, 17:13, 18:17};
    const rollTotals = [stats.str.total, stats.dex.total, stats.con.total, stats.int.total, stats.wis.total, stats.cha.total];
    const pointBuyTotals = rollTotals.map(x => pathfinderPointBuyScores[x]);
    const pointBuyScore = pointBuyTotals.reduce((arr, v) => arr + v);
    const result = (
        <div>
        ({stats.rollTime}) 
        <section className="stats">
            <div>Str: {stats.str.total.toString().padStart(2, "\u00a0")} [<span dangerouslySetInnerHTML={{__html: stats.str.rollWithDropStr}}/>]</div>
            <div>Dex: {stats.dex.total.toString().padStart(2, "\u00a0")} [<span dangerouslySetInnerHTML={{__html: stats.dex.rollWithDropStr}}/>]</div>
            <div>Con: {stats.con.total.toString().padStart(2, "\u00a0")} [<span dangerouslySetInnerHTML={{__html: stats.con.rollWithDropStr}}/>]</div>
            <div>Int: {stats.int.total.toString().padStart(2, "\u00a0")} [<span dangerouslySetInnerHTML={{__html: stats.int.rollWithDropStr}}/>]</div>
            <div>Wis: {stats.wis.total.toString().padStart(2, "\u00a0")} [<span dangerouslySetInnerHTML={{__html: stats.wis.rollWithDropStr}}/>]</div>
            <div>Cha: {stats.cha.total.toString().padStart(2, "\u00a0")} [<span dangerouslySetInnerHTML={{__html: stats.cha.rollWithDropStr}}/>]</div>
            <div>Point Buy Total: {pointBuyScore} [{pointBuyTotals.join(",")}]</div>
        </section>
        </div>
    );
    return result;
}

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
            this.handleResult(this.diceBag.rollDice(numOfDice, numOfSides).toString());
        }
        clickFunc.bind(this);
        return <button onClick={clickFunc}>{numOfDice}d{numOfSides}</button>;
    }

    makeRandomChartButton(chart, chartName) {
        return <button type="button" onClick={() => this.handleResult(rollRandomChart(this.diceBag, chart, chartName).toString())}>{chartName}</button>
    }

    makeStatsButton(numOfDice, numOfSides, drop=0) {
        const dropStr = (drop > 0) ? `drop ${drop} lowest` : "";
        return <button type="button" onClick={() => this.handleResult(rollStatsFunc(this.diceBag, numOfDice, numOfSides, drop))}>Roll Stats ({numOfDice}d{numOfSides} {dropStr})</button>
    }

    makeCRButton(cr, numOfMonsters = 1) {
        const searchParams = {cr: cr, crOperator: "=", num:numOfMonsters}
        const fetchCall = () => this.props.fetchSelectAction(searchParams);
        const countStr = (numOfMonsters > 1) ? numOfMonsters + " " : "";
        const s = (numOfMonsters > 1) ? "s" : "";
        return <button type="button" onClick={() => fetchCall()}>{countStr}CR {cr} Monster{s}</button>
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
        //TODO: more random charts, random monsters
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
                    {this.makeStatsButton(3, 6)}
                    {this.makeStatsButton(4, 6, 1)}
                    {this.makeStatsButton(5, 6, 2)}
                    {this.makeCRButton(7)}
                    {this.makeCRButton(20, 2)}
                    {this.makeRandomChartButton(DungeonEntrances, "Dungeon Entrance")}
                    {this.makeRandomChartButton(DungeonEntrances, "Dungeon Entrance")}
                    {this.makeRandomChartButton(DungeonEntrances, "Dungeon Entrance")}
                    {this.makeRandomChartButton(Backgrounds, "Background")}
                    {this.makeRandomChartButton(DungeonLocations, "Dungeon Location")}
                    {this.makeRandomChartButton(DungeonTypes, "Dungeon Types")}
                    {this.makeRandomChartButton(DungeonRooms, "Dungeon Rooms")}
                    {this.makeRandomChartButton(NpcCharacteristicsPhysical, "NPC Physical Traits")}
                    {this.makeRandomChartButton(NpcCharacteristics, "NPC Traits")}
                    {dmScreen.buttons.map(x => x)}
                    <CreateAButtonForm onSubmit={this.createAButton} showForm={dmScreen.showForm} toggleFormFunc={this.toggleForm}/>
                </section>
                <section>
                    <div>Results</div>
                    {dmScreen.results.slice().reverse().map(x => <div className="result">{x}</div>)}
                </section>
            </main>

        );
    }
}

export default connect(state => state, {dmScreenAddResultAction, addCustomButtonAction, toggleFormAction, fetchSelectAction})(DMScreen)