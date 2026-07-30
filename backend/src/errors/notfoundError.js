const CustomError = require("./customError")
const {StatusCodes} = require("http-status-codes")


class NotFoundError extends CustomError{
    constructor(message){
        super(message)
        this.StatusCode = StatusCodes.NOT_FOUND
    }
}
module.exports = NotFoundError