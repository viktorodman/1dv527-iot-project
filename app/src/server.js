import http from 'http'
import express from 'express'
import {Server as SocketServer} from 'socket.io'
import createError from 'http-errors'
import { dirname, join } from 'path'
import {fileURLToPath} from 'url' 
import hbs from 'express-hbs'
import { mqttRouter, socketRouter } from './routes/socketRouter.js'
import session from 'express-session'

export default class Server {
    constructor(appInit) {
        this.appInit = appInit
        this.app = undefined
        this.server = undefined
        this.baseRouter = express.Router()
        this.directoryFullName = dirname(fileURLToPath(import.meta.url))
        this.baseURL = process.env.BASE_URL || '/'
    }

    run () {
        this.setUpSocket()
        this.setUpMiddlewares()
        this.setUpViewEngine()
        this.setUpSession()
        this.setUpRouter()
        this.handleErrors()
        this.listen()
    }

    async setUpSocket() {
        this.app = express()
        this.server = http.createServer(this.app)

        const io = new SocketServer(this.server)

        socketRouter(io)
        await mqttRouter(io)

        this.app.use((req, res, next) => {
            res.io = io

            next()
        })
    }

    setUpViewEngine() {
        this.app.engine('hbs', hbs.express4({
            defaultLayout: join(this.directoryFullName, 'views', 'layouts', 'default'),
            partialsDir: join(this.directoryFullName, 'views', 'partials')
        }))
        this.app.set('view engine', 'hbs')
        this.app.set('views', join(this.directoryFullName, 'views'))
    }

    setUpRouter() {
        this.app.use('/', this.baseRouter)
        this.appInit.routers.forEach(router => this.baseRouter.use(router.baseUrl, router.expressRouter))

        this.baseRouter.use('*', (req, res, next) => {
            next(createError(404))
        })
    }

    setUpMiddlewares() {
        this.appInit.middleWares.forEach(mw => this.app.use(mw))
        this.app.use(express.static(join(dirname(fileURLToPath(import.meta.url)), '..', 'public')))
    }

    setUpSession() {
        const sessionOptions = {
            name: process.env.SESSION_NAME,
            secret: process.env.SESSION_SECRET || "test",
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 1000 * 60 * 60 * 24,
                sameSite: 'lax',
                httpOnly: false
            }
        }

        this.app.use(session(sessionOptions))

        this.app.use((req,res,next) => {
            res.locals.baseURL = this.baseURL

            next()
        })
    }

    handleErrors() {
        this.app.use((err, req, res, next)  =>{
            if(err.status === 404) {
                return res.status(404).sendFile(join(this.directoryFullName, 'views', 'errors', '404.html'))
            }
            res.status(err.status || 500).render('errors/error.hbs', {error: err})
        })
       
    }

    listen() {
        this.server.listen(process.env.PORT, () => {
            console.log(`Server runnig at http://localhost:${process.env.PORT}`)
        })
    }
}