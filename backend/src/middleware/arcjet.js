const { StatusCodes } = require("http-status-codes");
const {initArcjet} = require("../config/arcjet");
  

const arcjetMiddleware = async(req,res,next)=>{
    try{
     const  decision = await initArcjet.protect(req,{
        requested:1,
})
  if(decision.isDenied()){
     if(decision.reason.isRateLimit()){
        return res.status(StatusCodes.TOO_MANY_REQUESTS).json({
            error:"Too Many Requests",
            message:"Rate limit exceeded. Please try again later."
        })

     } else if(decision.reason.isBot()){
        return res.status(StatusCodes.FORBIDDEN).json({
            error:"Bot access denied",
            message: "Automated request are not allowed"
        })

     }else{
        return res.status(StatusCodes.FORBIDDEN).json({
            error:"Forbidden",
            message:"Access denied by security policy",
        })
     }
  }
//   check for spoofed bots
 if(decision.results.
    some(
        (result)=> result.reason.isBot() && result.reason.isSpoofed())
    ){
        return res.status(StatusCodes.FORBIDDEN).json({
            error:"Spoofed bot detected",
            message:"Malicious bot activity detected",
        })
    }
    next()
    }catch(err){
      console.error("Arcjet middleware error",err);
    // alow  request to continue if arcjet fails
      next()
      
    }
}

module.exports= arcjetMiddleware