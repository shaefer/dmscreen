import React, { Component } from 'react';
import { connect } from 'react-redux'
import {dmScreenAddResultAction} from '../../action-creators/DmScreenActionCreators'
import DiceBag from '../../utils/DiceBag'
import rollTimeString from '../../utils/ResultTimestamp'

class StatsButton extends Component {
    constructor() {
        super();
        this.diceBag = DiceBag(null);
        this.makeStatsButton = this.makeStatsButton.bind(this);
        this.handleResult = this.handleResult.bind(this);
    }

    handleResult(result) {
        this.props.dmScreenAddResultAction(result);
    }

    makeStatsButton(numOfDice, numOfSides, drop=0) {
        const dropStr = (drop > 0) ? `drop ${drop}` : "";
        return <button type="button" className="tealAwesome" onClick={() => this.handleResult(rollStatsFunc(this.diceBag, numOfDice, numOfSides, drop))}>Roll Stats ({numOfDice}d{numOfSides} {dropStr})</button>
    }
    
    render() {
        return this.makeStatsButton(this.props.numOfDice, this.props.numOfSides, this.props.drop);
    }
}
export default connect(state => state, {dmScreenAddResultAction})(StatsButton)

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