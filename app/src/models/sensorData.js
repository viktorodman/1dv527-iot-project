import mongoose from "mongoose";


const measurementSchema = new mongoose.Schema({
    temperature: { type: Number, required: true },
    humidity: { type: Number, required: true }
},{
    timestamps: true
})

const ThingDataSchema = new mongoose.Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    sensor: {
        id: { type: String, required: true},
        name: { type: String, required: true},
        description: { type: String, required: true },
        measurements: [measurementSchema]
    }
},{
    timestamps: true
})


const ThingData = mongoose.model('ThingData', ThingDataSchema)

export default ThingData