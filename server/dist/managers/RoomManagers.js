"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomManager = void 0;
let GLOBAL_ROOM_ID = 1;
class RoomManager {
    constructor() {
        this.rooms = new Map();
    }
    createRoom(user1, user2) {
        const roomId = this.generate().toString();
        console.log("this is rooom id:", roomId);
        this.rooms.set(roomId.toString(), {
            user1,
            user2
        });
        console.log("created room");
        console.log("here are the room", this.rooms);
        user1.socket.emit("send-offer", {
            roomId
        });
    }
    onOffer(roomId, sdp) {
        var _a;
        console.log(this.rooms);
        console.log(typeof (roomId));
        console.log("id thta tis aieoif aeaaiofa af ", roomId["roomId"]);
        const user2 = (_a = this.rooms.get(roomId["roomId"])) === null || _a === void 0 ? void 0 : _a.user2;
        console.log("this is user2 ", user2);
        user2 === null || user2 === void 0 ? void 0 : user2.socket.emit("offer", {
            sdp //session description protocol
            ,
            roomId
        });
    }
    onAnswer(roomId, sdp) {
        var _a;
        const user1 = (_a = this.rooms.get(roomId["roomId"])) === null || _a === void 0 ? void 0 : _a.user1;
        console.log("this is user1 ", user1);
        user1 === null || user1 === void 0 ? void 0 : user1.socket.emit("answer", {
            sdp,
            roomId
        });
    }
    generate() {
        return GLOBAL_ROOM_ID++;
    }
}
exports.RoomManager = RoomManager;
