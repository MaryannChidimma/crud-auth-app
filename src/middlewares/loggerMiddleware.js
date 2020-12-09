const bunyan = require('bunyan');

//Load package.json
const pjs = require('../../package.json');

//Get meta data info from package.json
const {name, version} = pjs;


class loggerMiddleWare {
    constructor(app, logger) {
        this.app = app;
        this.logger = logger;
    }
    addMiddleWare() {
        if (this.app.get('env') === 'development') {
            this.app.use((req, res, next) => {
                var timestamp = new Date(); // getting current timestamp
                this.logger.info(`${req.method}: ${req.url} @ ${timestamp}`);
                return next();
            });
        }

        // eslint-disable-next-line no-unused-vars
        this.app.use((error, req, res, next) => {
            res.status(error.status || 500);
            // Log out the error to the console
            this.logger.error(error);
            return res.json({
                success : false,
                error: {
                    message: error.message,
                },
                message: 'something went wrong'
            });
        });
    }
}

module.exports = loggerMiddleWare;