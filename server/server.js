const express = require('express')();
const http = require('http');

const server = http.Server(express);
const io = require('socket.io')(server);
const payloadTypes = require('./constants/payloadTypes');
const socketConfig = require('./constants/socketConfig');
const errorMessages = require('./constants/errorMessages');
const logger = require('./utils/logger');

let users = [];

io.on('connection', socket => {
  socket.on('disconnect', () => {
    const user = users.find(u => u.id === socket.id);
    if (!user) return;
    logger.info(`${user.name} - disconnected `);

    users = users.filter(u => u.id !== socket.id);

    socket.broadcast.emit('message', {
      type: payloadTypes.USER_DISCONNECTED,
      user
    });
  });

  socket.on('message', data => {
    logger.info(`${data.name} sent message -> ${data.message}`);
    console.log('data', data);
    socket.broadcast.emit('message', {
      type: payloadTypes.RECEIVE_MESSAGE,
      user: data.user,
      message: data.message
    });
  });

  socket.on('join', payload => {
    logger.info(`${payload.name} is trying to join`);
    const user = users.find(u => u.name === payload.name);

    if (!user) {
      const newUser = {
        id: socket.id,
        name: payload.name
      };
      users.push(newUser);

      io.sockets.to(socket.id).emit('message', {
        type: payloadTypes.LOGIN_SUCCESS,
        user: newUser,
        users
      });

      socket.broadcast.emit('message', {
        type: payloadTypes.USER_CONNECTED,
        user: newUser
      });
      logger.info(`${payload.name} joined`);
    } else {
      io.sockets.to(socket.id).emit('message', {
        type: payloadTypes.LOGIN_FAILURE,
        message: errorMessages.NAME_TAKEN
      });
      socket.disconnect();
      logger.info(`${payload.name} disconnected`);
    }
  });
});

server.listen(socketConfig.PORT, () => {
  logger.info(`Listening on ${socketConfig.PORT}`);
});

const shutdown = () => {
  logger.error('Shutting down');
  server.close();
  io.close();
  process.exit();
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
