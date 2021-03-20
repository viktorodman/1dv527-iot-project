import moment from "moment"
import SensorData from "../models/sensorData.js"

export default class IndexController {

    async index(req, res, next) {
        try {
            const latestSensorData = await SensorData.findOne({device: "pycom lopy4"})

            let viewData = {}
            if (latestSensorData) {
                console.log(latestSensorData)
                
                const indexof = latestSensorData.measurements.length -1
                viewData = {
                    temperature: latestSensorData.measurements[indexof].temperature,
                    humidity: latestSensorData.measurements[indexof].humidity,
                    date: moment(latestSensorData.measurements[indexof].createdAt).fromNow()
                }

                console.log(viewData)
            }
            

            res.render('home/index.hbs', {viewData})
        } catch (error) {
            next(error)
        }
    }
}