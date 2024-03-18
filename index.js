require('dotenv').config();
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const clerkClient = require('@clerk/clerk-sdk-node');

const jwt = require('jsonwebtoken');
const db = require('./db/db');

const app = express();
const httpServer = createServer(app);
const publicKey = process.env.CLERK_PEM;

const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

io.on('connection', async (socket) => {
  console.log(`${socket.id} connected`);

  socket.on('authenticate', async (token, callback) => {
    try {
      const decoded = jwt.verify(token, publicKey);
      const user = await clerkClient.users.getUser(decoded.sub);
      socket.user = user;
      callback();
    } catch (err) {}
  });

  socket.on('join', (roomName, callBack) => {
    socket.join(roomName);
    socket.currentRoomName = roomName;
    const clientsInRoom = io.sockets.adapter.rooms.get(roomName);
    if (clientsInRoom) {
      const socketUsers = [...clientsInRoom].map((socketId) => {
        return io.sockets.sockets.get(socketId)?.user;
      });
      callBack(socketUsers);
    }
  });

  socket.on('leave', (roomName) => {
    socket.leave(roomName);
    socket.currentRoomName = null;
  });

  socket.on('message', async (newMessage) => {
    if (!socket.currentRoomName) {
      return;
    }

    const chatRoom = await db('chat_rooms')
      .where({
        room_name: socket.currentRoomName,
      })
      .first();
    if (!chatRoom) {
      return;
    }
    const [message] = await db('messages').returning('*').insert({
      user_name: socket.user.firstName,
      user_image: socket.user.imageUrl,
      user_id: socket.user.id,
      message: newMessage,
      chat_room_id: chatRoom.id,
    });
    io.in(socket.currentRoomName).emit('newMessage', message);
  });

  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected`);
  });
});

httpServer.listen(process.env.PORT);
