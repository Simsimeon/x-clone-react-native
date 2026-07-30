const Post = require("../model/post");
const User = require("../model/user");
const {StatusCodes}=require("http-status-codes");
const Errors = require("../errors");
const cloudinary =require("../config/cloundinary");
const {getAuth} =require("@clerk/express");
const Notification = require("../model/notification");
const Comment = require("../model/comment")
const getAllPost = async (req,res)=>{
const allPost = await Post.find({})
.sort("-createdAt")
.populate("user","firstName lastName profilePicture")
.populate({
    path:"comments",
    populate:{
     path:"user",
      select:"username firstName lastName profilePicture" 
    }
});

res.status(StatusCodes.OK).json({count:allPost.length,allPost});
}


const createPost = async (req, res)=>{
  const {userId}=getAuth(req);

  const {content}= req.body;
  const imageFile= req.file;
  if(!content && !imageFile){
    throw new Errors.NotFoundError("Post must content text or image")
  }
  const user = await User.findOne({clerkId:userId})
  if(!user){
    throw new Errors.NotFoundError("User not found")
  }
   
  let imageUrl = "";
  if(imageFile){
    try{
        // convert buffer to base64 for cloudinary
        const base64Image = `data:${imageFile.mimetype};base64,${imageFile.buffer.toString(
            "base64"
        )}`;
        const uploadResponse= await cloudinary.uploader.upload(
            base64Image,{
                folder:"social_media_posts",
                resource_type:"image",
                transformation:[
                    {width:800, height:600, crop:"limit"},
                    {quality:"auto"},
                    {format:"auto"},
                ],
            }

        );
        imageUrl = uploadResponse.secure_url;


    }catch(err){
        console.error("Cloudinary upload",err);
       return res.status(400).json({error: "failed to upload image"})
        
    }
  }


  const post = await Post.create({
    user:user._id,
    content: content|| "",
    image: imageUrl,
  }) 
    res.status(StatusCodes.CREATED).json({post})
} 

const likePost = async (req,res)=>{
 const {userId} = getAuth(req);
 const {postId} = req.params;

 const user = await User.findOne({clerkId:userId});
 const post = await Post.findById(postId);
if(!user || !post){
    throw new Errors.NotFoundError("user not found")
}

 const isLiked = post.likes.includes(user._id)
 if(isLiked){
    await Post.findByIdAndUpdate(postId,{
        $pull:{likes: user._id},
    });
 }else{
    //likes
    await Post.findByIdAndUpdate(postId,{
        $addToSet:{like:user._id},
    });
    // create notification if not liking own post
    if(post.user.toString() !== user._id.toString()){
        await Notification.create({
            from:user._id,
            to:post.user,
            type:"like",
            post:postId,
        })
    }
 }
 res.status(StatusCodes.OK).json({
    message: isLiked ? "Post unliked successfully":"Post liked successfully",
 })
}
const deletePost = async (req, res)=>{
    const {postId}=req.params;
    const {userId}=getAuth(req);
     const post = await Post.findById(postId)
     const user = await User.findOne({clerkId:userId})
    if(!post || !user){
        return res.status(StatusCodes.OK).json({error:"User or post not found"})
    }
  if(post.user.toString() !== user._id.toString()){
    return res.status(StatusCodes.FORBIDDEN).json({error:"You can only delete your own post"})
  }
// delete all comments on this post
await Comment.deleteMany({post:postId});


// delete all comments on this post
await Post.findByIdAndDelete(postId);

res.status(StatusCodes.OK).json({message:"Post deleted successfully"}) 
}
const getUserPost = async(req,res)=>{
    const {username}=req.params;
    const user = await User.findOne({userName});
  if(!user){
    throw new Errors.NotFoundError("User not founded")
  }
    const userPost = await Post.find({user:user._id})
    .sort("-createdAt")
    .populate("user","username firstName lastName profilePicture")
    .populate({
        path:"comments",
        populate:{
            path:"user",
            select:"username firstName lastName profilePicture"
        },
    })
    res.send("All single post")
}
const getPost = async (req,res)=>{
    const {postId}=req.params
      
    const userPost = await Post.findById(postId)
    .sort("-createdAt")
    .populate("user", "username firstName lastName profilePicture")
    .populate({
        path:"Comments",
        populate:{
            path:"user",
            select:"username firstName lastName profilePicture",
        }
    }) 
    if(!userPost){
        throw new Errors.NotFoundError("Post not found")
    }
    res.status(StatusCodes.OK).json({userPost});
}

module.exports = {deletePost, createPost,getAllPost,getUserPost,getPost,likePost}