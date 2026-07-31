const {getAuth}=require("@clerk/express");
const Notification= require("../model/notification");
const User = require("../model/user");
const { StatusCodes } = require("http-status-codes");



const getNotification = async(req,res)=>{
const {userId} = getAuth(req);

const user = await User.findOne({
    clerkId:userId
});
if(!user){
    return res.status(StatusCodes.NOT_FOUND).json({error:"User not found"})
}
const notification=await Notification.find({to: user._id})
.sort({createdAt:-1})
.populate("from","username firstName lastName profilePicture")
.populate("post", "content image"
.populate("comment","content"),
)


res.status(StatusCodes.OK).json({notification});


   
}

const deleteNotification = async(req, res)=>{
    const {userId} =getAuth(req);
    const {notificationId}=req.params;

const user = await User.findOne({clerkId:userId});
 if(!user){
    return res.status(StatusCodes.NOT_FOUND).json({error:"User not found"})
 }
 const notification =await Notification.findOneAndDelete({
    _id:notificationId,
    to:user._id,
 })
   if(!notification){
    res.status(StatusCodes.NOT_FOUND).json({error:"Notification not found"})
   }
   res.status(StatusCodes.OK).json({message:"Notification deleted successfully"})
}


module.exports = {getNotification,deleteNotification}