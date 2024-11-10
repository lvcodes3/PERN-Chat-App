import express from "express";
import http from "http";
import { Server } from "socket.io";

// main: create express web server //
const app = express();

// wrap the express web server in an http web server //
const server = http.createServer(app);

// initialize the socket.io web server //
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
  },
});

// keep track of which user (userId) is connected through which socket (socketId) //
const userSocketMap = {}; // { userId: socketId }

// handle socket connection events //
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  console.log(`User ${userId} connected through Socket ${socket.id}`);

  // broadcast the current list of online users to all connected clients //
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // listener for when a client disconnects //
  socket.on("disconnect", () => {
    // remove user from userSocketMap //
    delete userSocketMap[userId];

    console.log(`User ${userId} disconnected through Socket ${socket.id}`);

    // update all connected clients with the latest list of online users //
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// util fxn to retrieve the socketId for a given user (receiverId) //
export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

export { app, server, io };
