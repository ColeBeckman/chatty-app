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
  try {
    const decoded = jwt.verify(socket.handshake.query.token, publicKey);
    const user = await clerkClient.users.getUser(decoded.sub);
    socket.user = user;
    console.log('full user obj', user);
  } catch (err) {
    console.log(`${err}, Unauthorized user`);
  }

  if (socket.userId) {
    socket.on('message', (newMessage) => {
      io.emit('newMessage', newMessage);
      console.log(newMessage);
      db('messages').insert({
        user_name: user.firstName,
        user_image: user.imageUrl,
        userId: socket.userId,
        message: newMessage,
      });
    });
  }

  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected`);
  });
});

httpServer.listen(process.env.PORT);
