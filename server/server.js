const express = require('express')();
const http = require('http');
const server = http.Server(express);
const io = require('socket.io')(server);
const payloadTypes = require('./constants/payloadTypes');
const socketConfig = require('./constants/socketConfig');
const errorMessages = require('./constants/errorMessages');
const logger = require('./utils/logger')

let users = [];

io.on('connection', socket => {
    socket.on('disconnect', () => {
        const user = users.find(user => user.id == socket.id)
        if(!user) return;
        logger.info(`${user.name} - disconnected `);
        
        users = users.filter(u => u.id != socket.id)

        const payload = {
            type: payloadTypes.USER_DISCONNECTED,
            name: user.name
        }
        socket.broadcast.emit('message', payload);
    })

    socket.on('message', data => {
        logger.info(`${data.name} sent message -> ${data.message}`);

        const payload = {
            type: payloadTypes.RECEIVE_MESSAGE,
            name: data.name,
            message: data.message
        }
        socket.broadcast.emit('message', payload)
    })

    socket.on('join', payload => {
        logger.info(`${payload.name} is trying to join`);

        const user = users.find(user => user.name == payload.name)

        if(!user){
            users.push({
                id: socket.id,
                name: payload.name
            })

            const privatePayload = {
                type: payloadTypes.LOGIN_SUCCESS,
                name: payload.name,
                users: users.map(user => user.name)
            }
            io.sockets.to(socket.id).emit('message', privatePayload);

            const publicPayload = {
                type: payloadTypes.USER_CONNECTED,
                name: payload.name
            }
            socket.broadcast.emit('message',publicPayload)
            logger.info(`${payload.name} joined`);
        }else{
            const payload = {
                type: payloadTypes.LOGIN_FAILURE,
                message: errorMessages.NAME_TAKEN
            }
            io.sockets.to(socket.id).emit('message', payload);
            socket.disconnect();
            logger.info(`${payload.name} disconnected`);
        }
    })
});

server.listen(socketConfig.PORT, () => {
    logger.info(`Listening on ${socketConfig.PORT}`);
});

const shutdown = () => {
    logger.error("Shutting down");
    server.close()
    io.close()
    process.exit()
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);