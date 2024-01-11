import { User } from "./UserManagers"
let GLOBAL_ROOM_ID = 1
interface Rooms {
    user1: User,
    user2: User
}

export class RoomManager {
    private rooms: Map<string, Rooms>
    constructor() {
        this.rooms = new Map<string, Rooms>()
    }

    createRoom(user1: User, user2: User ) {
        const roomId = this.generate().toString()
        console.log("this is rooom id:", roomId);
        
        this.rooms.set(roomId.toString(), {
            user1,
            user2
        })
        console.log("created room");
        
        console.log("here are the room", this.rooms);
        
        user1?.socket.emit("send-offer", {
            roomId
        })
    }

   

    onOffer(roomId: string, sdp: string) {
        const user2 = this.rooms.get(roomId)?.user2
        console.log("this is user2 ", user2);
        
        user2?.socket.emit("offer", {
            sdp //session description protocol
            ,roomId
        })
    }

    onAnswer(roomId: string, sdp: string) {

        const user1 = this.rooms.get(roomId)?.user1
        console.log("this is user1 ", user1);
        
        user1?.socket.emit("answer", {
            sdp,
            roomId
        })
    }

    generate() {
        return GLOBAL_ROOM_ID++
    }
}