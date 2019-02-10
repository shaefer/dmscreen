import React from 'react'
import ForceGraph2D from 'react-force-graph-2d';
import buildRooms from './DungeonBuilder';

class DungeonForceGraph2D extends React.Component {

    render() {
        const {numOfRooms} = this.props;
        const rooms = buildRooms(numOfRooms || 10);

        const nodes = rooms.nodes.map(n => {
            const nodeData = {id: n.key, name: n.name};
            return nodeData;
        });

        const links = rooms.links.map(c => {
            const linkData = {source: c.source.key, target: c.target.key, distance: 250, strength: -0.2}
            return linkData;
        });

        const data = {
            nodes,
            links
        }

        return (
            <section>
                <ForceGraph2D
                    graphData={data}
                />
            </section>
        )
    }

}

export default DungeonForceGraph2D