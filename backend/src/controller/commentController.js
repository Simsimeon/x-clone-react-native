const {getAuth}=require("@clerk/express");
const Comment = require("../model/comment");
const Post = require("../model/post");
const User = require("../model/user");
const Notification = require("../model/notification");
const { StatusCodes } = require("http-status-codes");


const getComment = async (req,res)=>{
    const {postId}=req.params

    const comments = await Comment.find({post:postId})
    .sort({createdAt:-1})
    .populate("user, username firstName lastName profileProfile")
   res.status(StatusCodes.Ok).json({comments})
}


const createComment = async (req,res)=>{
const {userId}=getAuth(req)
const {postId}=req.params;
const {content}=req.body;

if(!content || content.trim()===""){
    return res.status(StatusCodes.BAD_REQUEST).json({error:"Comment content is required"})
}
const user = await User.findOne({clerkId: userId})
const post = await Post.findById(postId)
if(!user || !post){
    return res.status(StatusCodes.NOT_FOUND).json({error:"User or post not found"})
}
 const comment = await Comment.create({
    user:user._id,
    post:postId,
    content,
 });


//  Link the comment to the post
await Post.findByIdAndUpdate(postId,{
    $push:{comments:comment._id}
})
// create notification if not commenting on own post
if(post.user.toString() !== user._id.toString()){
    await Notification.create({
        from: user._id,
        to:post.user,
        type:"comment",
        post:postId,
        comment:comment._id,
    })
}
    res.status(StatusCodes.CREATED).json({comment})
}

const deleteComment = async (req,res)=>{
  const {userId}= getAuth(req);
  const {commentId}= req.params;

    const user = await User.findOne({clerkId:userId});
    const comment= await comment.findById(commentId);


    if(!user || !comment){
        return res.status(StatusCodes.NOT_FOUND).json({error:"User or comment not found"})
    }
    if(comment.user.toString()!==user._id.toString()){
      return res.status(StatusCodes.NOT_FOUND).json({error:"You can only delete your own comments"})        

    }
    // remove comment from post
    await Post.findByIdAndUpdate(comment.post,{
        $pull:{comments:commentId},
    })
    //remove comment from post
    await Comment.findByIdAndDelete(commentId);

    res.status(StatusCodes.OK).json({message:"Comment deleted successfully"});
}
module.exports = {
    getComment,
    createComment,
    deleteComment

}