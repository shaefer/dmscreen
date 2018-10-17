import React, { Component } from 'react';
import { connect } from 'react-redux'
import {dmScreenAddResultAction, addCustomButtonAction, toggleFormAction, reorderButtonListAction} from '../../action-creators/DmScreenActionCreators'
import DiceBag from '../../utils/DiceBag'
import CreateAButtonForm from './CreateAButtonForm'
import CRButton from './CRButton'
import CRRangeButton from './CRRangeButton'
import DiceButton from './DiceButton'
import StatsButton from './StatsButton'
import ButtonMenu from './ButtonMenu'
import ChartButton from './ChartButton'
import Reorder from 'react-reorder';

import './DmScreen.css'

import '../Polyfills/StartsWith'
import '../Polyfills/PadStart'

import {DungeonEntrances, Backgrounds, DungeonLocations, DungeonTypes, DungeonRooms, NpcCharacteristicsPhysical, NpcCharacteristics,
        Plots, PlotTwists, NpcGoals, Rewards, Secrets, MacguffinOrQuestItem, MundaneRoomCharacteristics, ExoticRoomCharacteristics} from './RandomCharts'

import ReactGA from 'react-ga';

class DMScreen extends Component {
    constructor() {
        super();
        this.handleResult = this.handleResult.bind(this);
        this.diceBag = DiceBag(null); //seed is null so that we always get unseeded random results
        this.createAButton = this.createAButton.bind(this);
        this.toggleForm = this.toggleForm.bind(this);
        this.reorderButtonList = this.reorderButtonList.bind(this);
    }

    componentDidMount() {
        const title = "DM Screen - Pathfinder - by Clever Orc Games";
        document.title= title;
        ReactGA.pageview(window.location.pathname + window.location.search, undefined, title);
    }

    handleResult(result) {
        this.props.dmScreenAddResultAction(result);
    }

    createAButton(values) {
        let button;
        if (values.type === 'diceButton') {
            if (values.diceButtonNumOfDice > 1000) {
                this.handleResult(<span style={{color:'red'}}>Cannot roll more than 1000 dice at once.</span>);
            }
            button = <DiceButton numOfDice={values.diceButtonNumOfDice} numOfSides={values.diceButtonNumOfSides}/>
        }
        if (values.type === 'crButton') {
            if (values.numOfMonsters > 1000) {
                this.handleResult(<span style={{color:'red'}}>Cannot roll more than 1000 monsters at once.</span>);
            }
            if (values.cr > 30) {  
                this.handleResult(<span style={{color:'red'}}>Cannot create monster button with CR > 30.</span>);
            }
            button = <CRButton cr={values.cr} numOfMonsters={values.numOfMonsters}/>;
        }
        if (values.type === 'crRangeButton') {
            if (values.numOfMonstersRange > 1000) {
                this.handleResult(<span style={{color:'red'}}>Cannot roll more than 1000 monsters at once.</span>);
            }
            if (values.crEnd > 30) {  
                this.handleResult(<span style={{color:'red'}}>Cannot create monster button with CR > 30.</span>);
            }
            if (values.crStart > values.crEnd) {  
                this.handleResult(<span style={{color:'red'}}>CR Range must be from smallest CR to largest CR.</span>);
            }
            button = <CRRangeButton crStart={values.crStart} crEnd={values.crEnd} numOfMonsters={values.numOfMonstersRange}/>
        }
        this.props.addCustomButtonAction(button);
    }

    toggleForm(showForm) {
        this.props.toggleFormAction(showForm);
    }

    reorderButtonList(previousIndex, nextIndex, listKey) {
        this.props.reorderButtonListAction(listKey, previousIndex, nextIndex);
    }

    render() {
        const { dmScreen } = this.props;
        console.log("DMSCREEN");

        return (
            <main className="dmScreen">
                <section className="noselect">
                    <ButtonMenu label="Roll Dice/Stats">
                        <Reorder reorderId="diceAndStatsButtonList" 
                                onReorder={(event, previousIndex, nextIndex) => this.reorderButtonList(previousIndex, nextIndex, "diceAndStatsButtons")} 
                                holdTime={250}
                                component="ul" 
                                className="buttonOrderContainer">
                            {dmScreen.diceAndStatsButtons.map(x => <li>{x}</li>)}
                        </Reorder>
                    </ButtonMenu>
                    <ButtonMenu label="Roll Monster(s) by CR">
                        <Reorder reorderId="monsterButtonList" 
                                onReorder={(event, previousIndex, nextIndex) => this.reorderButtonList(previousIndex, nextIndex, "monsterButtons")} 
                                holdTime={250}
                                component="ul" 
                                className="buttonOrderContainer">
                            {dmScreen.monsterButtons.map(x => <li>{x}</li>)}
                        </Reorder>
                    </ButtonMenu>
                    <ButtonMenu label="Random Charts">
                        <Reorder reorderId="chartButtonList" 
                                onReorder={(event, previousIndex, nextIndex) => this.reorderButtonList(previousIndex, nextIndex, "chartButtons")} 
                                holdTime={250}
                                component="ul" 
                                className="buttonOrderContainer">
                            {dmScreen.chartButtons.map(x => <li>{x}</li>)}
                        </Reorder>
                    </ButtonMenu>
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

export default connect(state => state, {dmScreenAddResultAction, addCustomButtonAction, toggleFormAction, reorderButtonListAction})(DMScreen)

export const DMScreenDefaultState = {
    results:[], buttons:[], showForm: false,
    diceAndStatsButtons : [
        <DiceButton numOfDice={1} numOfSides={4}/>,
        <DiceButton numOfDice={1} numOfSides={6}/>,
        <DiceButton numOfDice={1} numOfSides={8}/>,
        <DiceButton numOfDice={1} numOfSides={10}/>,
        <DiceButton numOfDice={1} numOfSides={12}/>,
        <DiceButton numOfDice={1} numOfSides={20}/>,
        <DiceButton numOfDice={1} numOfSides={100}/>,
        <StatsButton numOfDice={3} numOfSides={6}/>,
        <StatsButton numOfDice={4} numOfSides={6} drop={1}/>,
    ],
    monsterButtons : [
        <CRButton cr={7}/>,
        <CRButton cr={5} numOfMonsters={5}/>,
        <CRButton cr={20} numOfMonsters={2}/>,
        <CRRangeButton crStart={5} crEnd={8} numOfMonsters={10}/>,
    ],
    chartButtons : [
        <ChartButton chart={DungeonEntrances} chartName={"Dungeon Entrance"}/>,
        <ChartButton chart={DungeonLocations} chartName={"Dungeon Locations"}/>,
        <ChartButton chart={Backgrounds} chartName={"Backgrounds"}/>,
        <ChartButton chart={DungeonTypes} chartName={"Dungeon Types"}/>,
        <ChartButton chart={DungeonRooms} chartName={"Dungeon Rooms"}/>,
        <ChartButton chart={NpcCharacteristicsPhysical} chartName={"NPC Physical Traits"}/>,
        <ChartButton chart={NpcCharacteristics} chartName={"NPC Traits"}/>,
        <ChartButton chart={Plots} chartName={"Plots"}/>,
        <ChartButton chart={PlotTwists} chartName={"Plot Twists"}/>,
        <ChartButton chart={NpcGoals} chartName={"NPC Goals"}/>,
        <ChartButton chart={Rewards} chartName={"Rewards"}/>,
        <ChartButton chart={Secrets} chartName={"Secrets"}/>,
        <ChartButton chart={MacguffinOrQuestItem} chartName={"Macguffins And Quest Items"}/>,
        <ChartButton chart={MundaneRoomCharacteristics} chartName={"Mundane Room Characteristics"}/>,
        <ChartButton chart={ExoticRoomCharacteristics} chartName={"Exotic Room Characteristics"}/>,
    ]
}
