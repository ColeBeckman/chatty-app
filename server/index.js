require('dotenv').config();
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log(`${socket.id} connected`);

  socket.on('message', (newMessage) => {
    io.emit('newMessage', newMessage);
  });

  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected`);
  });
});

httpServer.listen(process.env.PORT);
