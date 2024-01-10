import { Socket } from "socket.io";



export interface User {
    socket: Socket,
    name: string
}

export class UserManager {
    private users: User[];
    private queue: string[];

    constructor() {
        this.users = []
        this.queue = []
    }

    addUser(name: string, socket: Socket) {
            this.users.push(
                {name, socket}
            )
            this.queue.push(socket.id) // queue with all socket id's
            this.clearQueue()
    }

    removeUser(socketId: string) {
        this.users = this.users.filter(x => x.socket.id === socketId) // remove from users array
        this.queue = this.queue.filter(x => x === socketId) // remove from the queue
    }

    clearQueue() {
        if(this.queue.length < 2) {
            return
        }
        const user1 = this.users.find(x => x.socket.id === this.queue.pop())
        const user2 = this.users.find(x => x.socket.id === this.queue.pop())
        
        user1?.socket.emit("new-room", {
            type: "send-offer",
           

        })
    }

    
}