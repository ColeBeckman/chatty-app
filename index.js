require('dotenv').config();
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const clerkClient = require('@clerk/clerk-sdk-node');

const jwt = require('jsonwebtoken');
const db = require('./db/db');
const { dv } = require('@faker-js/faker');

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

  socket.on('authenticate', async (token) => {
    try {
      const decoded = jwt.verify(token, publicKey);
      const user = await clerkClient.users.getUser(decoded.sub);
      socket.user = user;
    } catch (err) {
      console.log(`${err}, Unauthorized user`);
    }
  });

  socket.on('join', (roomName) => {
    socket.join(roomName);
  });

  socket.on('message', async (newMessage) => {
    console.log('🚀 ~ socket.on ~ newMessage:', newMessage);

    const [message] = await db('messages').returning('*').insert({
      user_name: socket.user.firstName,
      user_image: socket.user.imageUrl,
      user_id: socket.user.id,
      message: newMessage,
    });
    console.log('new message', message);
    io.emit('newMessage', message);
  });

  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected`);
  });
});

httpServer.listen(process.env.PORT);
