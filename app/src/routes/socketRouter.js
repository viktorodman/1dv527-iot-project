import { Server, Socket } from "socket.io";


export const socketRouter = (io) => {
    io.on('connect', (socket) => {
        console.log('User connected')
        socket.on('disconnect', () => {
            console.log('user disconnected')
        })
        socket.emit('test', {hej: 'test'})
    })
}