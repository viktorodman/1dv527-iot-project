import express from express
import logger from 'morgan'
import session from 'express-session'
import http from 'http'
import helmet from 'helmet'
import {Server } from 'socket.io'
import { dbConnect } from './config/mongoose.js'
import IndexRouter from './routes/indexRouter.js'
import morgan from 'morgan'
import dotenv from 'dotenv'

dotenv.config()

const main = async () => {
    await dbConnect()

    const server = new Server({
        routers: [
            new IndexRouter('/')
        ],
        middleWares: [
            helmet(),
            morgan('dev'),
            express.json(),
            express.urlencoded({ extended: true })
        ]
    })

    server.run()
    
}

main().catch(console.error)

