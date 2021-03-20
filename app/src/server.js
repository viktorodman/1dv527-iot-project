import http from 'http'
import {Server as SocketServer} from 'socket.io'
import createError from 'http-errors'
import { dirname, join } from 'path'
import {fileURLToPath} from 'url' 
import hbs from 'express-hbs'
import { socketRouter } from './routes/socketRouter'
import session from 'express-session'

export default class Server {
    constructor(appInit) {
        this.appInit = appInit
        this.app = undefined
        this.server = undefined
        this.baseRouter = express.Router()
    }

    run () {
        this.setUpSocket()
        this.setUpViewEngine()
        this.setUpSession()
        this.setUpRouter()
        this.setUpMiddlewares()
        this.handleErrors()
        this.listen()
    }

    setUpSocket() {
        this.app = express()
        this.server = http.createServer(this.app)

        const io = new SocketServer(this.server)

        socketRouter(io)

        this.app.use((req, res, next) => {
            res.io = io

            next()
        })
    }

    setUpViewEngine() {
        const directoryFullName = dirname(fileURLToPath(import.meta.url))

        const baseURL = process.env.BASE_URL || '/'

        this.app.engine('hbs', hbs.express4({
            defaultLayout: join(directoryFullName, 'views', 'layouts', 'default'),
            partialsDir: join(directoryFullName, 'view', 'partials')
        }))
        this.app.set('view engine', 'hbs')
        this.app.set('views', join(directoryFullName), 'views')
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
    }

    handleErrors() {
        if(err.status === 404) {
            return res.status(404).sendFile(join(directoryFullName, 'views', 'errors', '404.html'))
        }
    }

    listen() {
        this.server.listen(process.env.PORT, () => {
            console.log(`Server runnig at http://locahost:${process.env.PORT}`)
        })
    }
}