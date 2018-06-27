function drawNodeGraph(rooms, canvasId)
{
	var unconnectedRooms = [].concat(rooms);
	var connectedRooms = [];
	var g = new Graph();
	while(unconnectedRooms.length > 0)
	{
		var room = unconnectedRooms[0];
		//Connect to unconnected rooms.
		var numToJoin = DiceUtils.roll("1d3").total;
			connectedRooms.push(room);
		console.warn('handling UNCONNECTED rooms.')
		for (var i = 0;i<numToJoin;i++)
		{
			var unconnectedRoomsMinusCurrentRoom = ArrayUtils.subtract(unconnectedRooms, [room]);
			var roomToJoinIndex = DiceUtils.roll(0, unconnectedRoomsMinusCurrentRoom.length - 1).total;
			var roomToJoin = unconnectedRoomsMinusCurrentRoom[roomToJoinIndex];
			console.debug("Joining: " + room + " to " + roomToJoin);
			if (roomToJoin)
			{
				g.addEdge(room, roomToJoin);
				connectedRooms.push(roomToJoin);
			}
			unconnectedRooms = ArrayUtils.subtract(unconnectedRooms, connectedRooms);
			if (unconnectedRooms.length == 0)
				break;
		}
		
		//Connect to connected rooms.
		console.warn('handling CONNECTED rooms');
		var numToJoinConnected = DiceUtils.roll("1d3").total;
		console.warn(connectedRooms);
		for (var i = 0;i<numToJoinConnected;i++)
		{
			console.warn('rolling 0 to ' + (connectedRooms.length - 1));
			var roomToJoinIndex = DiceUtils.roll(0, connectedRooms.length - 1).total;
			console.warn('rolled: ' + roomToJoinIndex);
			var roomToJoin = connectedRooms[roomToJoinIndex];
			console.debug("Joining: " + room + " to " + roomToJoin);
			if (room != roomToJoin && roomToJoin)
				g.addEdge(room, roomToJoin);
		}
	}
	
//	g.addEdge("1", "cherry");
//	g.addEdge("strawberry", "cherry");
//	g.addEdge("strawberry", "apple");
//	g.addEdge("strawberry", "tomato");
//	 
//	g.addEdge("tomato", "apple");
//	g.addEdge("tomato", "kiwi");
//	 
//	g.addEdge("cherry", "apple");
//	g.addEdge("cherry", "kiwi");
	 
	 //http://getspringy.com/ new version???
	 //https://bitbucket.org/danielshaefer/monsteradvancer/src/master/monsteradvancer/WebContent/scripts/nodeGraph/
	var layouter = new Graph.Layout.Spring(g);
	layouter.layout();
	
	var renderer = new Graph.Renderer.Raphael(canvasId, g, 600, 400);
	Raphael.getColor.reset();
	renderer.draw();
}