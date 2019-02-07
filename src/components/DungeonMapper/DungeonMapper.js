import React, {Component} from 'react';
import { Graph } from 'react-d3-graph';
import buildRooms from './DungeonBuilder';

class DungeonMapper extends Component {

    render() {
        const data = buildRooms(15);
        console.log("DATA", data);
        const config = {
            nodeHighlightBehavior: true,
            "node": {
                highlightColor: "red"
            },
            "link": {
                highlightColor: "red"
            }
        }
        //https://goodguydaniel.com/react-d3-graph/sandbox/index.html?data=small
        return <Graph id="graph-id" data={data} config={config}/>
    }
}

export default DungeonMapper;