
const { Server } = require("socket.io");  // Destructure 'Server' from 'socket.io'
const http = require("http");
const { disconnect } = require("process");
const express = require("express");
const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true, // Optional: only needed if you're using cookies
  }
});

const getreciverSoketId=(receiverId)=>{
  return socketmap[receiverId];
}
const socketmap = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId) {
    socketmap[userId] = socket.id;
  }

  console.log("✅ User connected:", socket.id, "with userId:", userId);

  // Emit list of online users to all clients
  io.emit("getonlineuser", Object.keys(socketmap));

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", userId);

    if (userId && socketmap[userId]) {
      delete socketmap[userId];
    }

    io.emit("getonlineuser", Object.keys(socketmap));
  });
});

module.exports ={server,app ,getreciverSoketId ,io}