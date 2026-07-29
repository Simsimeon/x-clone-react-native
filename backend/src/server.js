 require("dotenv").config()
const ENV=require("./config/env")
const express = require("express");
const app = express();
const connectDB = require("./config/db")



app.get("/", (req,res)=>res.send("Hello from the server")
)
 







const start =async function (){
    try{
       await connectDB(ENV.MON_URI)
     app.listen(ENV.PORT,()=>{
        console.log(`server is listening at ${ENV.PORT}`);
        
     })
    }catch(err){
       console.log(err);
       
    }
} 

start()