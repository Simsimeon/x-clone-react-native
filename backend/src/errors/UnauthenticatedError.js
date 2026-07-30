const CustomError = require("./customError")
const {StatusCodes} = require("http-status-codes")


class UnauthenticatedError extends CustomError{
    constructor(message){
        super(message)
        this.StatusCode = StatusCodes.FORBIDDEN
    }
}

module.exports = UnauthenticatedError;