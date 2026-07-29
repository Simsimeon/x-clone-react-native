const mongoose = require("mongoose");


const PostSchema = new mongoose.Schema({
    user:{
        types:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    content:{
        type:String,
        maxLength:200,
    },
    image:{
        type:String,
        default:"",
    },
    likes:[
        {type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ],
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ]
},{timestamps:true})



module.exports = mongoose.model("Post",PostSchema)