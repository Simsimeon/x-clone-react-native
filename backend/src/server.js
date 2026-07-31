 require("dotenv").config()
const ENV=require("./config/env")
const express = require("express");
const app = express();
const cors = require("cors")
const connectDB = require("./config/db")
const {clerkMiddleware} = require("@clerk/express")
const notFound = require("./middleware/notFound")
const errorMiddleware = require("./middleware/errors-handler")
// ROUTES
const userRoutes = require("./routes/users");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment")
const notificationRoutes = require("./routes/notification");
const arcjetMiddleware = require("./middleware/arcjet");
// MIDDLEWARE
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: '10kb' }))

app.use(clerkMiddleware())
app.use(arcjetMiddleware)

app.get("/", (req,res)=>res.send("Hello from the server")
)
 

app.use("/api/users", userRoutes)
app.use("/api/post", postRoutes)
app.use("/api/comments", commentRoutes)
app.use("/api/notification", notificationRoutes)





app.use(notFound);
app.use(errorMiddleware)



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