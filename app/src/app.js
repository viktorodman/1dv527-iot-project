import express from express
import logger from 'morgan'
import session from 'express-session'
import hbs from 'express-hbs'
import { dirname, join } from 'path'
import {fileURLToPath} from 'url' 
import http from 'http'
import {Server } from 'socket.io'
import { dbConnect } from './config/mongoose.js'


const main = async () => {
    await dbConnect()

    
}

