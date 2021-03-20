import http from 'http'
import {Server as SocketServer} from 'socket.io'
import { dirname, join } from 'path'
import {fileURLToPath} from 'url' 
import hbs from 'express-hbs'
import { socketRouter } from './routes/socketRouter'

export default class Server {
    constructor(appInit) {
        this.appInit = appInit
        this.app = undefined
        this.server = undefined
    }

    run () {
        this.setUpSocket()
        this.setUpViewEngine()
        this.setUpSession()
        this.setUpRouter()
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

    }

    setUpSession() {

    }

    handleErrors() {

    }

    listen() {

    }
}