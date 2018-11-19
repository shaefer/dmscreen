import React from 'react'
import * as DmScreenActions from '../actions/DmScreenActions'
import {reorder} from 'react-reorder'

import ChartButton from '../components/DMScreen/ChartButton'
import {DungeonEntrances, Backgrounds, DungeonLocations, DungeonTypes, DungeonRooms, NpcCharacteristicsPhysical, NpcCharacteristics,
  Plots, PlotTwists, NpcGoals, Rewards, Secrets, MacguffinOrQuestItem, MundaneRoomCharacteristics, ExoticRoomCharacteristics} from '../components/DMScreen/RandomCharts'

const dmScreen = (state = DMScreenDefaultState, action) => {
    switch (action.type) {
      case DmScreenActions.ADD_RESULT:
        return {
          ...state,
          results: [...state.results, action.result]
        };
      case DmScreenActions.ADD_CUSTOM_BUTTON:
        console.log("ADD CUSTOM BUTTON REDUCER ACTION", action)
        if (action.button.type === 'diceButton') {
          return {
            ...state,
            diceButtons: [...state.diceButtons, action.button]
          };
        }
        if (action.button.type === 'crButton') {
          return {
            ...state,
            crButtons: [...state.crButtons, action.button]
          };
        }
        if (action.button.type === 'crRangeButton') {
          return {
            ...state,
            crRangeButtons: [...state.crRangeButtons, action.button]
          };
        }
        console.error(`Received an unexpected button type: ${action.button.type}. State will remain unchanged.`)
        break;
      case DmScreenActions.TOGGLE_FORM:
        return {
          ...state,
          showForm: action.showForm
        };
      case DmScreenActions.S3_SELECT_DMSCREEN_SHOW:
        return {
          ...state,
          results: [...state.results, action.monsterList]
        }
      case DmScreenActions.REORDER_BUTTON_LIST:
        const reorderedList = reorder(state[action.listKey], action.previousIndex, action.nextIndex);
        const newState = {
          ...state,
        }
        newState[action.listKey] = reorderedList;
        return newState;
      default:
        return state;
    }
  }

  export default dmScreen;

  //TODO: STore the raw data instead of the full JSX COmponents.

  //TODO: fix magic strings by replacing with some storaged consts. 
const diceButtons = [
  {numOfDice: 1, numOfSides: 4, id:1, type: 'dice'},
  {numOfDice: 1, numOfSides: 6, id:2, type: 'dice'},
  {numOfDice: 1, numOfSides: 8, id:3, type: 'dice'},
  {numOfDice: 1, numOfSides: 10, id:4, type: 'dice'},
  {numOfDice: 1, numOfSides: 12, id:5, type: 'dice'},
  {numOfDice: 1, numOfSides: 20, id:6, type: 'dice'},
  {numOfDice: 1, numOfSides: 100, id:7, type: 'dice'},
];

const statsButtons = [
  {numOfDice: 3, numOfSides: 6, id:8, type: 'stats'},
  {numOfDice: 4, numOfSides: 6, drop: 1, id:9, type: 'stats'},
  {numOfDice: 5, numOfSides: 6, drop: 2, id:10, type: 'stats'},
];

const crButtons = [
  {cr:7, id:11, type: 'cr'},
  {cr:5, numOfMonsters:5, id:12, type: 'cr'},
  {cr:20, numOfMonsters:2, id:13, type: 'cr'},
];

const crRangeButtons = [
  {crStart:5, crEnd:8, numOfMonsters:10, id:14, type: 'crRange'}
];



const DMScreenDefaultStateCreator = (diceButtons, statsButtons, crButtons, crRangeButtons) => {
  return {
    results:[], buttons:[], showForm: false,
    diceAndStatsButtonOrder: [...diceButtons.map(x => x.id), ...statsButtons.map(x => x.id)],
    monsterButtonOrder: [...crButtons.map(x => x.id), ...crRangeButtons.map(x => x.id)],
    diceButtons : diceButtons,
    statsButtons: statsButtons,
    crButtons : crButtons,
    crRangeButtons : crRangeButtons,
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
}

const DMScreenDefaultState = DMScreenDefaultStateCreator(diceButtons, statsButtons, crButtons, crRangeButtons);