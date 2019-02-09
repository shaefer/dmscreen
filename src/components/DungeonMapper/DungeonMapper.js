import React, {Component, PureComponent} from 'react';
//import { Graph } from 'react-d3-graph';
import buildRooms from './DungeonBuilder';

const DungeonMapper = ({match}) => {
    console.log(match)
    const rooms = (match && match.params && match.params.rooms) ? match.params.rooms : 5;
    const data = buildRooms(rooms);
    const config = {
        nodeHighlightBehavior: true,
        "node": {
            highlightColor: "red",
            labelProperty: "name"
        },
        "link": {
            highlightColor: "red"
        }
    }
    //https://goodguydaniel.com/react-d3-graph/sandbox/index.html?data=small
    const genId = "Graph" + Math.floor(Math.random() * 100000);
    return <div>Currently not going to work until we resolve the d3 v4 d3 v3 issues</div>
    //return <Graph id={genId} data={data} config={config}/>
}



export default DungeonMapper;