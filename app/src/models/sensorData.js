import mongoose from "mongoose";

const measurements = new mongoose.Schema({
    temperature: { type: Number, required: true },
    humidity: { type: Number, required: true }
}, {
    timestamps: true
})

const sensorDataSchema = new mongoose.Schema({
    device: {type: String, required: true},
    sensor: { type: String, required: true },
    measurements: [measurements]
},{
    timestamps: true
})


const SensorData = mongoose.model('SensorData', sensorDataSchema)

export default SensorData