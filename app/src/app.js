import express from 'express'
import logger from 'morgan'
import session from 'express-session'
import http from 'http'
import { dirname, join } from 'path'
import {fileURLToPath} from 'url' 
import helmet from 'helmet'
import Server from './server.js'
import { dbConnect } from './config/mongoose.js'
import IndexRouter from './routes/indexRouter.js'
import morgan from 'morgan'
import dotenv from 'dotenv'
import ThingsRouter from './routes/thingsRouter.js'

dotenv.config()

const main = async () => {
    await dbConnect()

    const server = new Server({
        routers: [
            new IndexRouter('/'),
            new ThingsRouter('/things')
        ],
        middleWares: [
            helmet(),
            helmet.contentSecurityPolicy({
                directives: {
                    defaultSrc: ["'self'", 'fonts.gstatic.com'],
                    styleSrc: ["'self'", 'cdnjs.cloudflare.com', 'https://fonts.googleapis.com'],
                    scriptSrc: ["'self'", 'cdn.jsdelivr.net'],
                    fontSrc: ["'self'", "https://fonts.gstatic.com"]
                }
            }),
            morgan('dev'),
            express.json(),
            express.urlencoded({ extended: false }),
        ]
    })

    server.run()
    
}

main().catch(console.error)

