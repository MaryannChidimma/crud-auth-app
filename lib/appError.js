
class AppError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.message = message;
        this.name = "AppError";
        this.statusCode = statusCode;
        this.isOperational = true;
        this.date = new Date();

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
class BadRequestError extends AppError {
    constructor(message = "Bad Request", statusCode = 400) {
        super(message, statusCode);
    }
}
module.exports = {
    BadRequestError
};