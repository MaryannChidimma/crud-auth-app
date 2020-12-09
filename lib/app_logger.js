const config = require('../../bin/config/logger')[process.env.NODE_ENV|| 'development'];
const AppError = require('./appError');
const {ARGUMENT_MISMATCH} = require('./constants/errorConstants');

class AppLogger {
    constructor() {
        this.logger = config.log();
    }

    error (method, service,message, error) {
        if((!typeof(method) === 'string' && method.length <= 0) || (!typeof(service) === 'string' && service.length <= 0)){
            return new AppError(ARGUMENT_MISMATCH, 
                `the argument passed to the function expects a type of string got 
                ${typeof (method)} for method and ${typeof (service)}`)
        }
        var errorObj = {
            method : method,
            service : service,
            message : message,
            date : new Date()
        }
        if(error ) 
        {
            if(error instanceof Error || error instanceof AppError)
                errorObj = {...errorObj, err : error};
            else return this.logger.info({ err: new AppError(ARGUMENT_MISMATCH, 'wrong error type passed'), ...errorObj }, 
                        "wrong error instance passed to logger")
        }

        this.logger.error(errorObj, message);
        return
    }

    info() {

    }

    warn(){

    }

    debug(){

    }
}

module.exports = new AppLogger();