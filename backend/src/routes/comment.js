const express = require("express");

const router = express.Router();

const {  
    getComment,
    createComment,
    deleteComment
}=require("../controller/commentController");
const authenticatedUserMiddleWare = require("../middleware/auth");

router.get("/",getComment)
router.post("/post/:postId",authenticatedUserMiddleWare,createComment)
router.delete("/:commentId",authenticatedUserMiddleWare,deleteComment)


module.exports=router