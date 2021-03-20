import express from 'express'
import IndexController from '../controllers/indexController.js'


export default class IndexRouter {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
        this.controller = new IndexController()
        this.expressRouter = express.Router()
        this.initializeRoutes()
    }

    initializeRoutes() {
        this.expressRouter.get('/', (req, res, next) => this.controller.index(req, res, next))
    }
}