export default class Server {
    constructor(appInit) {
        this.appInit = appInit
    }

    run () {
        this.setUpSocket()
        this.setUpViewEngine()
        this.setUpRouter()
        this.handleErrors()
        this.listen()
    }
}