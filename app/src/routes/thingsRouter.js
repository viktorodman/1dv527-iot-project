import express from 'express'
import IndexController from '../controllers/indexController.js'
import ThingsController from '../controllers/thingsController.js'


export default class ThingsRouter {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
        this.controller = new ThingsController()
        this.expressRouter = express.Router()
        this.initializeRoutes()
    }

    initializeRoutes() {
        this.expressRouter.get('/', (req, res, next) => this.controller.index(req, res, next)),
        this.expressRouter.get('/:name', (req, res, next) => this.controller.getOne(req, res, next))
        this.expressRouter.get('/:name/properties', (req, res, next) => this.controller.getProperties(req, res, next))
        this.expressRouter.get('/:name/properties/:property', (req, res, next) => this.controller.getProperty(req, res, next))
    }
}