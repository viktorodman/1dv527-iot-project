import express from express
import logger from 'morgan'
import session from 'express-session'
import http from 'http'
import {Server } from 'socket.io'
import { dbConnect } from './config/mongoose.js'


const main = async () => {
    await dbConnect()

    
}

