import DungeonRooms from '../../data/DungeonRooms';

const buildRooms = (numOfRooms) => {
    const rooms = [];
    const totalRoomsAvailable = DungeonRooms.length;
    while (rooms.length < numOfRooms) {
        const selectedRoomIndex = Math.floor(Math.random() * totalRoomsAvailable);
        const room = DungeonRooms[selectedRoomIndex];
        console.log(selectedRoomIndex, room)
        rooms.push(room);
    }

    const roomConnections = [];

    const unconnectedRooms = rooms.slice(0);
    while(unconnectedRooms.length > 0) {
        const room = unconnectedRooms.shift(); //shift returns the first element while mutating the array underneath to an array without that value.
        const selectedRoomIndex = Math.floor(Math.random() * (rooms.length - 1));
        const roomsToConnectTo =  rooms.filter(r => r != room);
        console.log(roomsToConnectTo)
        const roomToConnectTo = roomsToConnectTo[selectedRoomIndex];
        roomConnections.push({source:room, target:roomToConnectTo});
    }    

    console.log("ROOMS", rooms)

    return {
        nodes:rooms.map(r => {return {id:r}}),
        links: roomConnections
    }   
};

export default buildRooms;