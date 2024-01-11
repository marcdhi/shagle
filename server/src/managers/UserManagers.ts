import { Socket } from "socket.io";
import { RoomManager } from "./RoomManagers";


export interface User {
    socket: Socket,
    name: string
}

export class UserManager {
    private users: User[];
    private queue: string[];
    private roomManager: RoomManager

    constructor() {
        this.users = []
        this.queue = []
        this.roomManager = new RoomManager()
    }
    
    addUser(name: string, socket: Socket) {
        this.users.push(
            {name, socket}
            )
            this.queue.push(socket.id) // queue with all socket id's
            socket.send("lobby")
            console.log("after lobby code");
            
            this.clearQueue()
            this.initHandlers(socket)
    }

    removeUser(socketId: string) {
        const user = this.users.find(x => x.socket.id === socketId)
        
        this.users = this.users.filter(x => x.socket.id !== socketId) // remove from users array, by creating a new users array not having the current user socket id
        this.queue = this.queue.filter(x => x === socketId) 
    }

    clearQueue() {
        console.log(this.users);
        console.log(this.queue);
        
        
        if(this.queue.length < 2) {
            return
        }
        const id1 = this.queue.pop()
        const id2 = this.queue.pop()
        const user1 = this.users.find(x => x.socket.id === id1)
        const user2 = this.users.find(x => x.socket.id === id2)

        console.log(user1);
        console.log(user2);
        console.log(id1);
        console.log(id2);
        
        
        
         if(!user1 || !user2) {
            return
         }
        const room = this.roomManager.createRoom(user1, user2)
        this.clearQueue()
    }

    initHandlers(socket: Socket) {
        socket.on("offer", ({sdp, roomId}: {sdp: string, roomId: string}) => {
            this.roomManager.onOffer(roomId, sdp)
        })

        socket.on("answer", ({sdp, roomId}: {sdp: string, roomId: string}) => {
            this.roomManager.onAnswer(roomId, sdp)
        })
    }
}