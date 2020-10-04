const codeRoutes = require('./routes/code.routes')
const Promise = require('bluebird')
require('dotenv').config()

const mongoose = require('mongoose')

const mongoose_config = {
    url: process.env.MONGO,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
}

class Router {
    // Constructor
    constructor(app) {
        this.app = app;
        this.server = null;
        this.port = process.env.PORT || 5000
        this.terminator = null;
    }

    expose = () => {
        return new Promise((resolve, reject) => {
            codeRoutes.set(this.app)            
            resolve(null)
        })
    }

    connect = () => {
        mongoose
        .connect(mongoose_config.url, mongoose_config.options, () => {
            console.log("Connected to DB")
        })
    }

    // Conducts the Server to listen on specified port
    listen = () => {
        return new Promise((resolve, reject) => {
            this.server = this.app.listen(this.port, () => {
                console.log('Listening on', this.port)
            })
            resolve(null)
        })
    }

    start = () => {
        return new Promise(resolve => {
            let routines = [
                this.connect,
                this.expose,
                this.listen,
            ]
            Promise.mapSeries(routines, routine => {
                return routine()
            }).then(() => {
                resolve()
            })
        })
    };


}

module.exports = Router;