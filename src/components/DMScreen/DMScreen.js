import React, { Component } from 'react';
import { connect } from 'react-redux'
import {dmScreenAddResultAction, addCustomButtonAction, toggleFormAction} from '../../action-creators/DmScreenActionCreators'
import DiceBag from '../../utils/DiceBag'
import CreateAButtonForm from './CreateAButtonForm'
import CRButton from './CRButton'
import DiceButton from './DiceButton'
import StatsButton from './StatsButton'
import rollTimeString from '../../utils/ResultTimestamp'
import './DmScreen.css'

import '../Polyfills/StartsWith'
import '../Polyfills/PadStart'

import {DungeonEntrances, Backgrounds, DungeonLocations, DungeonTypes, DungeonRooms, NpcCharacteristicsPhysical, NpcCharacteristics,
        Plots, PlotTwists, NpcGoals, Rewards, Secrets, MacguffinOrQuestItem, MundaneRoomCharacteristics, ExoticRoomCharacteristics} from './RandomCharts'

import ReactGA from 'react-ga';

const rollRandomChart = (diceBag, chart, chartName) => {
    const timeOfRoll = rollTimeString();
    const result = chart[diceBag.rollDice(1, chart.length).total - 1];
    return {
        result: result,
        timeOfRoll: timeOfRoll,
        toString: () => `(${timeOfRoll}) ${chartName}: ${result}`
    }
}

class DMScreen extends Component {
    constructor() {
        super();
        this.handleResult = this.handleResult.bind(this);
        this.diceBag = DiceBag(null); //seed is null so that we always get unseeded random results
        this.createAButton = this.createAButton.bind(this);
        this.toggleForm = this.toggleForm.bind(this);
    }

    componentDidMount() {
        const title = "DM Screen - Pathfinder - by Clever Orc Games";
        document.title= title;
        ReactGA.pageview(window.location.pathname + window.location.search, undefined, title);
    }

    handleResult(result) {
        this.props.dmScreenAddResultAction(result);
    }

    makeRandomChartButton(chart, chartName) {
        return <button type="button" className="blueAwesome" onClick={() => this.handleResult(rollRandomChart(this.diceBag, chart, chartName).toString())}>{chartName}</button>
    }

    createAButton(values) {
        const button = (values.type === 'diceButton') 
            ? <DiceButton numOfDice={values.diceButtonNumOfDice} numOfSides={values.diceButtonNumOfSides}/>
            : <CRButton cr={values.cr} numOfMonsters={values.numOfMonsters}/>;
        if (values.type === 'monsterButton' && values.cr > 30) {  
            this.handleResult(<span style={{color:'red'}}>Cannot create monster button with CR > 30.</span>);
        } else {
            this.props.addCustomButtonAction(button);
        }
    }

    toggleForm = (showForm) => {
        this.props.toggleFormAction(showForm);
    }

    render() {
        const { dmScreen } = this.props;
        console.log("DMSCREEN");
        //TODO: more random charts, random monsters
        return (
            <main className="dmScreen">
                
                <section>
                    <DiceButton numOfDice={1} numOfSides={4}/>
                    <DiceButton numOfDice={1} numOfSides={6}/>
                    <DiceButton numOfDice={1} numOfSides={8}/>
                    <DiceButton numOfDice={1} numOfSides={10}/>
                    <DiceButton numOfDice={1} numOfSides={12}/>
                    <DiceButton numOfDice={1} numOfSides={20}/>
                    <DiceButton numOfDice={1} numOfSides={100}/>
                    <StatsButton numOfDice={3} numOfSides={6}/>
                    <StatsButton numOfDice={4} numOfSides={6} drop={1}/>
                    <CRButton cr={7}/>
                    <CRButton cr={5} numOfMonsters={5}/>
                    <CRButton cr={20} numOfMonsters={2}/>
                    {this.makeRandomChartButton(DungeonEntrances, "Dungeon Entrance")}
                    {this.makeRandomChartButton(Backgrounds, "Background")}
                    {this.makeRandomChartButton(DungeonLocations, "Dungeon Location")}
                    {this.makeRandomChartButton(DungeonTypes, "Dungeon Types")}
                    {this.makeRandomChartButton(DungeonRooms, "Dungeon Rooms")}
                    {this.makeRandomChartButton(NpcCharacteristicsPhysical, "NPC Physical Traits")}
                    {this.makeRandomChartButton(NpcCharacteristics, "NPC Traits")}
                    {this.makeRandomChartButton(Plots, "Plots")}
                    {this.makeRandomChartButton(PlotTwists, "Plot Twists")}
                    {this.makeRandomChartButton(NpcGoals, "NPC Goals")}
                    {this.makeRandomChartButton(Rewards, "Rewards")}
                    {this.makeRandomChartButton(Secrets, "Secrets")}
                    {this.makeRandomChartButton(MacguffinOrQuestItem, "Macguffins And Quest Items")}
                    {this.makeRandomChartButton(MundaneRoomCharacteristics, "Mundane Room Characteristics")}
                    {this.makeRandomChartButton(ExoticRoomCharacteristics, "Exotic Room Characteristics")}
                    {dmScreen.buttons.map(x => x)}
                    <CreateAButtonForm onSubmit={(e) => this.createAButton(e)} showForm={dmScreen.showForm} toggleFormFunc={this.toggleForm}/>
                </section>
                <section>
                    <div>Results</div>
                    {dmScreen.results.slice().reverse().map(x => <div className="result">{x}</div>)}
                </section>
            </main>

        );
    }
}

export default connect(state => state, {dmScreenAddResultAction, addCustomButtonAction, toggleFormAction })(DMScreen)