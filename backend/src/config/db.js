const mongoose = require("mongoose");


const connectDB =(ur)=>{
    return mongoose.connect(ur)
}


module.exports = connectDB