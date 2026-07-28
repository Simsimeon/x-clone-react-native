const express = require("express");
const app = express();






const PORT = 5001






const start =async ()=>{
    try{
     app.listen(PORT,()=>{
        console.log(`server is listening at ${PORT}`);
        
     })
    }catch(err){
       console.log(err);
       
    }
} 

start()