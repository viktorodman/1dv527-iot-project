import express from 'express'


export default class IndexRouter {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
        this.expressRouter = express.Router()
        this.initializeRoutes()
    }

    initializeRoutes() {
        this.expressRouter.get('/', (req, res, next) => res.status.json('From index'))
    }
}