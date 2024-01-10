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
        const roomId = this.generate()
        this.rooms.set(roomId.toString(), {
            user1,
            user2
        })
    }

    generate() {
        return GLOBAL_ROOM_ID++
    }
}