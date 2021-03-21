import createHttpError from "http-errors"
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
            const thing = await ThingData.findOne({id:req.params.name })
            let data = {}
            if (thing) {
                data = {
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
            } else {
                throw createHttpError(404)
            }

            res.status(200).json(data)

        } catch (error) {
            next(error)
        }
    }
    async getProperties(req, res, next) {
        try {
            const thing = await ThingData.findOne({id:req.params.name })

            let data = []

            if (thing) {
                const indexOfLatestMeasurement = thing.sensor.measurements.length -1
                const latestMeasurement = thing.sensor.measurements[indexOfLatestMeasurement]
            
                data = [
                { 
                    id: "temperature", 
                    name: "Home temperature", 
                    description: "dht11 temperature sensor and humidity sensor",
                    values: { 
                        temperature: latestMeasurement.temperature, 
                        description: "Temperature in celsius",
                        unit: "celsius",
                        timestamp: latestMeasurement.createdAt
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
                        unit: "percentage",
                        timestamp: latestMeasurement.createdAt 
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

            } else {
                throw createHttpError(404)
            }

            
            

            res.status(200).json(data)

        } catch (error) {
            next(error)
        }
    }
    async getProperty(req, res, next) {
        try {
            const thing = await ThingData.findOne({id: req.params.name })
            let data = {}
            if (thing && (req.params.property === 'temperature' || req.params.property === 'humidity') ) {
                const indexOfLatestMeasurement = thing.sensor.measurements.length -1

                const latestMeasurement = thing.sensor.measurements[indexOfLatestMeasurement]

                data = {
                    value: latestMeasurement[req.params.property],
                    timestamp: latestMeasurement.createdAt
                }
            } else {
                throw createHttpError(404)
            }
           
            
           

            res.status(200).json(data)

        } catch (error) {
            next(error)
        }
    }


}