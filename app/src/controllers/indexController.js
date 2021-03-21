import moment from "moment"
import SensorData from "../models/sensorData.js"

export default class IndexController {

    async index(req, res, next) {
        try {
            const thingData = await SensorData.findOne({id: "pycom-lopy4"})

            let viewData = {}
            if (thingData) {
                console.log(thingData)
                
                const indexof = thingData.sensor.measurements.length -1
                viewData = {
                    temperature: thingData.sensor.measurements[indexof].temperature,
                    humidity: thingData.sensor.measurements[indexof].humidity,
                    date: moment(thingData.sensor.measurements[indexof].createdAt).fromNow()
                }

                console.log(viewData)
            }
            

            res.render('home/index.hbs', {viewData})
        } catch (error) {
            next(error)
        }
    }
}