import moment from "moment"
import ThingData from "../models/sensorData.js"

export default class ThingsController {

    index(req, res, next) {
        try {
            res.status(200).json([
                {
                    id: "pycom-lopy4",
                    name: "My WOT lopy",
                    links: {
                        thing: {link: `${req.protocol}://${req.get('host')}${req.originalUrl}/pycom-lopy4`}
                    }
                }
            ])
        } catch (error) {
            next(error)
        }
    }

    async getOne(req, res, next) {
        try {
            const thing = await ThingData.findOne({id:"pycom-lopy4" })
            
            const data = {
                id: thing.id,
                name: thing.name,
                description: thing.description,
                createdAt: thing.createdAt,
                tags: ["Pycom Lopy4"],
                links: {
                    product: {
                        link: "https://pycom.io/product/lopy4/",
                        title: "Product this web thing is based on"
                    },
                    properties: {
                        link: `${req.protocol}://${req.get('host')}${req.originalUrl}/properties`,
                        title: 'List of properties'
                    },
                    ui: {
                        link: `${req.protocol}://${req.get('host')}/`,
                        title: "User Interface"
                    }
                }
            }

            res.status(200).json(data)

        } catch (error) {
            next(error)
        }
    }
    async getProperties(req, res, next) {
        try {
            const thing = await ThingData.findOne({id:"pycom-lopy4" })

            const indexOfLatestMeasurement = thing.sensor.measurements.length -1

            const latestMeasurement = thing.sensor.measurements[indexOfLatestMeasurement]
            
            const data = [
                { 
                    id: "temperature", 
                    name: "Home temperature", 
                    description: "dht11 temperature sensor and humidity sensor",
                    values: { 
                        temperature: latestMeasurement.temperature, 
                        description: "Temperature in celsius",
                        unit: "celsius" 
                    },
                    tags: ["sensor", "home"] ,
                    links: {
                        temperature: {
                            title: "The latest measured temperature",
                            link: `${req.protocol}://${req.get('host')}${req.originalUrl}/temperature`
                        }
                    }
                },
                { 
                    id: "humidity", 
                    name: "Home humidity", 
                    description: "dht11 temperature sensor and humidity sensor",
                    values: { 
                        humidity: latestMeasurement.humidity, 
                        description: "Humidity in percentage",
                        unit: "percentage" 
                    },
                    tags: ["sensor", "home"],
                    links: {
                        humidity: {
                            title: "The latest measured humidity",
                            link: `${req.protocol}://${req.get('host')}${req.originalUrl}/humidity`
                        }
                    } 
                }
            ]
            

            res.status(200).json(data)

        } catch (error) {
            next(error)
        }
    }
}