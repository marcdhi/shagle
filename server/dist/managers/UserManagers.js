"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManager = void 0;
const RoomManagers_1 = require("./RoomManagers");
class UserManager {
    constructor() {
        this.users = [];
        this.queue = [];
        this.roomManager = new RoomManagers_1.RoomManager();
    }
    addUser(name, socket) {
        this.users.push({ name, socket });
        this.queue.push(socket.id); // queue with all socket id's
        socket.send("lobby");
        this.clearQueue();
        this.initHandlers(socket);
    }
    removeUser(socketId) {
        this.users = this.users.filter(x => x.socket.id !== socketId); // remove from users array, by creating a new users array not having the current user socket id
        this.queue = this.queue.filter(x => x === socketId);
    }
    clearQueue() {
        if (this.queue.length < 2) {
            return;
        }
        const user1 = this.users.find(x => x.socket.id === this.queue.pop());
        const user2 = this.users.find(x => x.socket.id === this.queue.pop());
        if (!user1 || !user2) {
            return;
        }
        const room = this.roomManager.createRoom(user1, user2);
        this.clearQueue();
    }
    initHandlers(socket) {
        socket.on("offer", ({ sdp, roomId }) => {
            this.roomManager.onOffer(roomId, sdp);
        });
        socket.on("answer", ({ sdp, roomId }) => {
            this.roomManager.onAnswer(roomId, sdp);
        });
    }
}
exports.UserManager = UserManager;
