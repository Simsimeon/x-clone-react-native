const User = require("../model/user");
const Notification  = require("../model/notification");
const Errors = require("../errors");
const {getAuth, clerkClient}= require("@clerk/express")
const {StatusCodes}=require("http-status-codes")

const createUser = async (req,res)=>{

    res.send("User created")
}
const  getUserProfile = async(req,res)=>{
 const {username} =req.params;
 const user = await User.findOne({username})
if(!user){
    throw new Errors.NotFoundError("Invalid credentials")
}

 res.status(StatusCodes.OK).json({user})
}
const updateProfile= async (req,res)=>{
    const {userId}= getAuth(req)
 const user = await User.findOneAndUpdate({clerkId:userId},req.body,{new:true}) 
  if(!user){
    throw new Errors.NotFoundError("Invalid credentials")
}
 
 res.status(StatusCodes.OK).json({updatedUser})
}
const synClerkUserToDb = async (req,res)=>{
    const {userId} = getAuth(req);
    const existingUser= await User.findOne({clerkId:userId})
if(!existingUser){
    throw new Errors.BadRequest("User already exists")
}

const clerkUser = await clerkClient.users.getUser(userId);

const userData ={
    clerkId:userId,
    email:clerkClient.emailAddresses[0].emailAddress,
    firstName:clerkClient.firstName ||"",
    lastName:clerkClient.lastName || "",
    username: clerkClient.emailAddresses[0].emailAddress.split("@")[0],
    profilePicture: clerkClient.imageUrl || "",
}
   const user = await User.create(userData);

   res.status(StatusCodes.CREATED).json({user})
}
const showCurrentUser = async (req,res)=>{
    const {userId} = getAuth(req);

    const currentUser = await User.findOne({clerkId:userId})
    if(!currentUser){
        throw new Errors.NotFoundError("User not found")
    }
    res.status(StatusCodes.OK).json({currentUser})
}


const followUser=async(req,res)=>{
 const {userId}=getAuth(req);
 const {targetUserId}= req.params
 if(userId === targetUserId){
    throw new Errors.BadRequest(`You can't follow yourself`)
 }
 const currentUser = await User.findOne({clerkId:userId});
 const targetUser = await User.findOne({clerkId:targetUserId});

 const isAlreadyFollowingTargetUser = currentUser.following.includes(targetUserId);
 if(isAlreadyFollowingTargetUser){
    await User.findByIdAndUpdate(currentUser._id,{
        $pull:{following: targetUserId},
    })
    await User.findByIdAndUpdate(targetUser._id,{
        $pull:{followers: targetUserId},
    },  { new: true } )
 }else {
    await User.findByIdAndUpdate(targetUser._id,{
        $addToSet:{followers: targetUserId},}, { new: true } )
 }


 await Notification.create({
    from:currentUser._id,
    to:targetUserId,
    type:"follow",
 })
    res.status(StatusCodes.OK).json({message: isAlreadyFollowingTargetUser ? "user unfollowed successfully":"User followed successfully"})
}
module.exports = {createUser,getUserProfile,updateProfile,synClerkUserToDb,showCurrentUser,followUser}