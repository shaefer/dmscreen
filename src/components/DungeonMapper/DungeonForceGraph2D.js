import React from 'react'
import ForceGraph2D from 'react-force-graph-2d';
import buildRooms from './DungeonBuilder';
import PageViewRecorder from '../../components/PageViewRecorder';

class DungeonForceGraph2D extends React.Component {
    componentDidMount() {
        const title = "Dungeon Graph - by Clever Orc Games";
        document.title = title;
        PageViewRecorder.recordPageView(window.location.pathname + window.location.search, undefined, title);
    }



    render() {
        const numOfRooms = (this.props.match.params.rooms) ? this.props.match.params.rooms : 10;
        const rooms = buildRooms(numOfRooms);

        const groupRoomsIntoRandomGroups = ((room, numOfGroups = 4) => {
            const groupId = Math.floor(Math.random() * numOfGroups);
            return groupId;
        });

        const nodes = rooms.nodes.map(n => {
            const nodeData = {id: n.key, group: groupRoomsIntoRandomGroups(n)};
            return nodeData;
        });

        const links = rooms.links.map(c => {
            const linkData = {source: c.source.key, target: c.target.key}
            return linkData;
        });

        const data = {
            nodes,
            links
        }

        // const renderHoveredNodeLabel = (node) => {
        //     const label = node.id;
        //     return label;
        // }

        const Colors = {
            blue: 'rgba(31, 120, 180, 0.92)'
        };

        const renderCircleWithLabel = (node, ctx, globalScale) => {
            // Draw wider nodes by 1px on shadow canvas for more precise hovering (due to boundary anti-aliasing)
          const padAmount = 1;
          const nodRelSize = 4;
          const r = Math.sqrt(Math.max(0, node.val || 1)) * nodRelSize + padAmount;

          ctx.beginPath();
          ctx.arc(node.x, node.y, r, 0, 2 * Math.PI, false);
          ctx.fillStyle = node.color || Colors.blue;
          ctx.fill();

          drawLabelBasedOnNode(node, ctx, globalScale, node.id, r);
        }

        const drawLabelBasedOnNode = (node, ctx, globalScale, text, offset, textProperties = {textColor: 'black'}) => {
            ctx.textBaseline = 'middle';
            ctx.fillStyle = textProperties.textColor;
            const fontSize = 12/globalScale;
            ctx.font = `${fontSize}px Sans-Serif`;
            ctx.fillText(text, node.x + offset, node.y);
        }

        return (
            <section>
                <ForceGraph2D
                    graphData={data} nodeCanvasObject={renderCircleWithLabel} nodeAutoColorBy="group" nodeLabel={''}
                />
            </section>
        )
    }

}

export default DungeonForceGraph2D