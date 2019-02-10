import React from 'react'
import { InteractiveForceGraph, ForceGraphNode, ForceGraphLink } from 'react-vis-force';
import buildRooms from './DungeonBuilder';

class DungeonForceGraph extends React.Component {

    render() {
        const {numOfRooms} = this.props;
        const rooms = buildRooms(numOfRooms || 5);

        const nodes = rooms.nodes.map(n => {
            const nodeData = {id: n.key, name: n.name};
            return <ForceGraphNode node={nodeData} fill="blue" showLabel />
        });

        const links = rooms.links.map(c => {
            const linkData = {source: c.source.key, target: c.target.key, distance: 250, strength: -0.2}
            return <ForceGraphLink link={linkData}/>
        });

        return (
        <InteractiveForceGraph
            simulationOptions={{ height: 400, width: 600 }}
            //labelAttr="name"
            onSelectNode={(node) => console.log(node)}
            highlightDependencies
            simulationOptions={{}}
            animated
        >
        {nodes}
        {links}
        </InteractiveForceGraph>
        );
    }

}

export default DungeonForceGraph;