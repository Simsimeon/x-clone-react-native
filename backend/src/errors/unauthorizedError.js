const CustomError = require("./customError")
const {StatusCodes} = require("http-status-codes")


class UnauthorizedError extends CustomError {
    constructor(message){
        super(message)
        this.StatusCode = StatusCodes.UNAUTHORIZED
    }
}

module.exports = UnauthorizedError;