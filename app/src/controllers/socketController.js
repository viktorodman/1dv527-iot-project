import moment from "moment"
import SensorData from "../models/sensorData.js"

export default class SocketController {

    async publishData(io, data) {
        try {
            console.log(data)
            const sensorData = await SensorData.findOne({device: data.device.name})

            let viewData = {}

            if(sensorData) {
                sensorData.measurements.push({
                    temperature: data.device.sensors[0].values.temperature,
                    humidity: data.device.sensors[0].values.humidity
                })

                await sensorData.save()

            } else {
                SensorData.create({
                    device: data.device.name,
                    sensor: data.device.sensors[0].name,
                    measurements: [{
                        temperature: data.device.sensors[0].values.temperature,
                        humidity: data.device.sensors[0].values.humidity
                    }]
                })
            }
            

            io.emit('sensor-data', {
                temperature: data.device.sensors[0].values.temperature, 
                humidity: data.device.sensors[0].values.humidity,
                date: 'Just Now'
            })
        } catch (error) {
            console.log(error)
        }
    }
}