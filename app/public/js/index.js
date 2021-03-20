import '../socket.io/socket.io.js'

const socket = window.io()

socket.on('test', arg => {
    console.log(arg)
})