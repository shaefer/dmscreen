import DungeonRooms from '../../data/DungeonRooms';

//also known as asymettric difference.
const array_minus = (a1, a2) => {
    var result = [];
    for (var i = 0; i < a1.length; i++) {
      if (a2.indexOf(a1[i]) === -1) {
        result.push(a1[i]);
      }
    }
    return result;
  }

const getRoomConnectionsToLinkGroupedRooms = (roomConnections) => {
    //everything is connected to something but did we form discreet groups? 
    let groupedRooms = [];
    let roomsFullyExplored = [];
    let connectionsToCheck = roomConnections.concat([]);
    let roomsToFollowLater = [connectionsToCheck[0].source]; //leave the first connection in the full list so we can get what it is linked to as part of the core logic loop.
    do {
        const room1 = roomsToFollowLater.pop();

        //find all connections to room1;
        const allConnectionsThatTouchRoom1 = connectionsToCheck.filter(x => x.source === room1 || x.target === room1);
        //all the connections we find can be removed from the list we still need to check...we've already touched them.
        connectionsToCheck = array_minus(connectionsToCheck, allConnectionsThatTouchRoom1);
        const allTouchingRooms = allConnectionsThatTouchRoom1.map(x => {
            return (x.source === room1) ? x.target : x.source;
        });

        roomsToFollowLater = [...new Set(roomsToFollowLater.concat(allTouchingRooms))]; //unique set of rooms not yet followed.

        //remove current room if we have finished finding all its connections. //once we get 
        roomsFullyExplored.push(room1);
        //make sure rooms to explore later doesn't add back in rooms that have already been fully explored. So rooms to follow should not find any rooms that have a match in fully explored rooms.
        roomsToFollowLater = roomsToFollowLater.filter(x => roomsFullyExplored.indexOf(x) === -1);
        if (roomsToFollowLater.length === 0 && connectionsToCheck.length > 0) {
            //we've finished all the links we found so far. But we might not have gone through all the remaining connections.
            //This should happen whenever the connections have founded distinct groups. So at this point we can save off the result in "groups" clear our fullExplored array and use the next node as a new starting point.
            groupedRooms.push(roomsFullyExplored.slice(0)); //array of arrays
            roomsFullyExplored = [];
            roomsToFollowLater.push(connectionsToCheck[0].source);
        }
    } while (roomsToFollowLater.length > 0 || connectionsToCheck.length > 0)
    groupedRooms.push(roomsFullyExplored.slice(0));//last group never gets accounted for.
    //console.debug("GROUP COUNT: This Layout had " + groupedRooms.length + " groups of rooms!", groupedRooms)
    
    //select how to link the groups.
    const firstSetOfRooms = groupedRooms.pop();
    const roomsInFirstGroup = firstSetOfRooms.length;
    const roomToLinkIndex = Math.floor(Math.random() * roomsInFirstGroup);
    const roomToLink = firstSetOfRooms[roomToLinkIndex];
    const newLinks = groupedRooms.map(x => {
        const roomsInSet = x.length;
        const targetIndex = Math.floor(Math.random() * roomsInSet);
        const targetRoom = x[targetIndex];
        return { source: roomToLink, target: targetRoom, key: roomToLink.key + "," + targetRoom.key}
    });
    return newLinks;
}

const maxRooms = DungeonRooms.length;

const buildRooms = (numOfRooms) => {
    numOfRooms = (numOfRooms > maxRooms) ? maxRooms : numOfRooms; //apply max rooms
    const rooms = [];
    let availableRooms = DungeonRooms.slice(0);
    while (rooms.length < numOfRooms) {
        const selectedRoomIndex = Math.floor(Math.random() * availableRooms.length);
        const room = availableRooms[selectedRoomIndex];
        if (!room) {
            console.error("ROOM WAS UNDEFINED", room, availableRooms, selectedRoomIndex)
        }
        if (selectedRoomIndex === 0) {
            availableRooms.shift();
        }
        else if (selectedRoomIndex === availableRooms.length - 1) {
            availableRooms.pop();
        }
        else {
            const newSetOfRooms = availableRooms.slice(0, selectedRoomIndex).concat(availableRooms.slice(selectedRoomIndex + 1, availableRooms.length))
            availableRooms = newSetOfRooms;
        }
        rooms.push(room);
    }

    const roomConnections = [];

    const uniqueId = Math.floor(Math.random() * 1000000);
    const namedRooms = rooms.slice(0).map(r => {return {id:r + uniqueId, name:r, key:r}});
    const unconnectedRooms = namedRooms.slice(0);

    while(unconnectedRooms.length > 0) {
        const room = unconnectedRooms.shift(); //shift returns the first element while mutating the array underneath to an array without that value.
        const selectedRoomIndex = Math.floor(Math.random() * (namedRooms.length - 1));
        const roomsToConnectTo =  namedRooms.filter(r => r.name !== room.name);
        const roomToConnectTo = roomsToConnectTo[selectedRoomIndex];
        roomConnections.push({source:room, target:roomToConnectTo, key:room.key + "," + roomToConnectTo.key});
    }

    const newConnections = getRoomConnectionsToLinkGroupedRooms(roomConnections);

    return {
        nodes: namedRooms,
        links: roomConnections.concat(newConnections)
    }   
};

export default buildRooms;