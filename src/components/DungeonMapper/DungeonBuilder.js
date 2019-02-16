import DungeonRooms from '../../data/DungeonRooms';

const buildRooms = (numOfRooms) => {
    if (numOfRooms > DungeonRooms.length) {
        throw "Max rooms is " + DungeonRooms.length;
    }
    const rooms = [];
    let availableRooms = DungeonRooms.slice(0);
    while (rooms.length < numOfRooms) {
        const selectedRoomIndex = Math.floor(Math.random() * availableRooms.length);
        const room = availableRooms[selectedRoomIndex];
        if (!room) {
            console.error("ROOM WAS UNDEFINED", room, availableRooms, selectedRoomIndex)
        }
        if (selectedRoomIndex == 0) {
            availableRooms.shift();
        }
        else if (selectedRoomIndex == availableRooms.length - 1) {
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
        const roomsToConnectTo =  namedRooms.filter(r => r.name != room.name);
        const roomToConnectTo = roomsToConnectTo[selectedRoomIndex];
        roomConnections.push({source:room, target:roomToConnectTo, key:room.key + "," + roomToConnectTo.key});
    }    

    console.log("DATA", namedRooms, roomConnections)

    return {
        nodes: namedRooms,
        links: roomConnections
    }   
};

export default buildRooms;