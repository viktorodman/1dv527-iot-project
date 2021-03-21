import moment from "moment"
import ThingData from "../models/sensorData.js"


export default class SocketController {

    async publishData(io, data) {
        try {
            console.log(data)
            const thingData = await ThingData.findOne({device: data.device.name})

            let viewData = {}

            if(thingData) {
                thingData.sensor.measurements.push({
                    temperature: data.device.sensor.values.temperature,
                    humidity: data.device.sensor.values.humidity
                })

                await thingData.save()

            } else {
                ThingData.create({
                    id: data.device.id,
                    name: data.device.name,
                    sensor: {
                        id: data.device.sensor.id,
                        name: data.device.sensor.name,
                        description: data.device.sensor.description,
                        measurements: [{
                            temperature: data.device.sensor.values.temperature,
                            humidity: data.device.sensor.values.humidity
                        }]
                    }
                })
            }
            

            io.emit('sensor-data', {
                temperature: data.device.sensor.values.temperature, 
                humidity: data.device.sensor.values.humidity,
                date: 'Just Now'
            })
        } catch (error) {
            console.log(error)
        }
    }
}