import { Socket } from "socket.io";
const { Server } = require("socket.io")
const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = new Server(server)

io.on('connection', (socket: Socket) => {
    console.log("User connected");
    
})

server.listen(3000, () => {
  console.log('listening on *:3000');
});