import { Server, Socket } from "socket.io";
import MQTT from 'async-mqtt'
import SocketController from "../controllers/socketController.js";

/* const options = {
    port: 1883,
    host: 
} */

const topic = 'moist_moist/temp_moist'
const socketController = new SocketController()


export const socketRouter = async (io) => {
    io.on('connect',  (socket) => {

        console.log('User connected')
        socket.on('disconnect', () => {
            console.log('user disconnected')
        })
    })
}

export const mqttRouter = async (io) => {
    const client = await MQTT.connect('mqtt://iot-edu-lab.lnu.se:1883')


    const test = async () => {
        await client.on('message', async (topic, message, packet) => {

            console.log(`message is: ${message}`)
            console.log(`topic is: ${topic}`)
            await socketController.publishData(io, JSON.parse(message))
        })

        await client.subscribe(topic)
    }

    client.on('connect', test)
}




/* client.on('connect', test)

console.log('here')
await client.subscribe(topic)

client.on('message', (topic, message, packet) => {
    
})  */



