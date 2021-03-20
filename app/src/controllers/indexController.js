
export default class IndexController {

    index(req, res, next) {
        try {
            res.render('home/index.hbs')
        } catch (error) {
            next(error)
        }
    }
}