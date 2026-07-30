const Errors = require("../errors")


const authenticatedUserMiddleWare = async (req,res,next)=>{
 if (!req.auth().isAuthenticated){
  throw new Errors.UnauthenticatedError("Unauthenticated user please login")
    }
    next();
}

module.exports =  authenticatedUserMiddleWare;