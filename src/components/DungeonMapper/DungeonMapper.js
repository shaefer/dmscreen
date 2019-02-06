import React, {Component} from 'react';
import { Graph } from 'react-d3-graph'

class DungeonMapper extends Component {

    render() {
        const nodes = [
            {id:"Armory"},
            {id:"Kitchen"},
            {id:"Throne Room"},
            {id:"Dungeon"},
        ];

        const links = [
            {source:"Throne Room", target:"Armory"},
            {source:"Throne Room", target:"Kitchen"},
            {source:"Kitchen", target:"Armory"},
            {source:"Armory", target:"Dungeon"},
        ];

        const data = {
            nodes,
            links
        }
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