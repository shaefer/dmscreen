import React, { Component } from 'react';
import { connect } from 'react-redux'
import {dmScreenAddResultAction, addCustomButtonAction, toggleFormAction, reorderButtonListAction} from '../../action-creators/DmScreenActionCreators'
import DiceBag from '../../utils/DiceBag'
import CreateAButtonForm from './CreateAButtonForm'
import CRButton from './CRButton'
import CRRangeButton from './CRRangeButton'
import DiceButton from './connectedComponents/DiceButtonContainer'
import ButtonMenu from './ButtonMenu'
import Reorder from 'react-reorder';
import TavernNameButton from './connectedComponents/TavernNameButtonContainer'

import './DmScreen.css'

import '../Polyfills/StartsWith'
import '../Polyfills/PadStart'

import PageViewRecorder from '../../components/PageViewRecorder';
import StatsButton from './StatsButton';

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
        PageViewRecorder.recordPageView(window.location.pathname + window.location.search, undefined, title);
    }

    handleResult(result) {
        this.props.dmScreenAddResultAction(result);
    }

    createAButton(values) {
        let buttonData;
        if (values.type === 'diceButton') {
            if (values.diceButtonNumOfDice > 1000) {
                this.handleResult(<span style={{color:'red'}}>Cannot roll more than 1000 dice at once.</span>);
            }
            buttonData = {numOfDice: values.diceButtonNumOfDice, numOfSides: values.diceButtonNumOfSides, type: 'diceButton'}
        }
        if (values.type === 'crButton') {
            if (values.numOfMonsters > 1000) {
                this.handleResult(<span style={{color:'red'}}>Cannot roll more than 1000 monsters at once.</span>);
            }
            if (values.cr > 30) {  
                this.handleResult(<span style={{color:'red'}}>Cannot create monster button with CR > 30.</span>);
            }
            buttonData = { cr:values.cr, numOfMonsters:values.numOfMonsters, type: 'crButton'}
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
            buttonData = {crStart:values.crStart, crEnd:values.crEnd, numOfMonsters:values.numOfMonstersRange, type: 'crRangeButton'}
        }
        this.props.addCustomButtonAction(buttonData);
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

        const diceAndStatsButtons = [...dmScreen.diceButtons, ...dmScreen.statsButtons];
        const orderedDiceAndStatsButtons = dmScreen.diceAndStatsButtonOrder.map(x => diceAndStatsButtons.find(y => y.id === x));
        const diceButtonsAsListItems = orderedDiceAndStatsButtons.map(x => {
            if (x.type === 'dice') {
                return <li><DiceButton numOfDice={x.numOfDice} numOfSides={x.numOfSides}/></li>;
            } else if (x.type === 'stats') {
                return <li><StatsButton numOfDice={x.numOfDice} numOfSides={x.numOfSides} drop={x.drop || 1}/></li>;
            }
        });
        //monsterButtonOrder
        const monsterButtons = [...dmScreen.crButtons, ...dmScreen.crRangeButtons];
        const orderedMonsterButtons = dmScreen.monsterButtonOrder.map(x => monsterButtons.find(y => y.id === x));
        const monsterButtonsAsListItems = orderedMonsterButtons.map(x => {
            if (x.type === 'cr') {
                return <li><CRButton cr={x.cr} numOfMonsters={(x.numOfMonsters || 1)}/></li>;
            } else if (x.type === 'crRange') {
                return <li><CRRangeButton crStart={x.crStart} crEnd={x.crEnd} numOfMonsters={x.numOfMonsters || 1}/></li>;
            }
        });

        return (
            <main className="dmScreen">
                <section className="noselect">
                    <ButtonMenu label="Roll Dice/Stats">
                        <Reorder reorderId="diceAndStatsButtonList" 
                                onReorder={(event, previousIndex, nextIndex) => this.reorderButtonList(previousIndex, nextIndex, "diceAndStatsButtonOrder")} 
                                holdTime={250}
                                component="ul" 
                                className="buttonOrderContainer">
                            {diceButtonsAsListItems}
                        </Reorder>
                    </ButtonMenu>
                    <ButtonMenu label="Roll Monster(s) by CR">
                        <Reorder reorderId="monsterButtonList" 
                                onReorder={(event, previousIndex, nextIndex) => this.reorderButtonList(previousIndex, nextIndex, "monsterButtonOrder")} 
                                holdTime={250}
                                component="ul" 
                                className="buttonOrderContainer">
                            {monsterButtonsAsListItems}
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
                    <TavernNameButton count={10}/>
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