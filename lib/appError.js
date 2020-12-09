const Error_Costants = require('./constants/errorConstants');
class AppError extends Error {
    constructor(type,message,createStack, ...params){
        super(params);
        console.log("create stack check",Error.captureStackTrace, createStack)
        
        if (createStack === true) {
            
            Error.captureStackTrace(this, AppError)
        }
        if(!Object.prototype.hasOwnProperty.call(Error_Costants, type))
            throw new Error("Invalid pace error object type");

        this.type = type;
        this.name = type;
        this.date = new Date(); 
        this.message = message 
    }
}

module.exports = AppError;