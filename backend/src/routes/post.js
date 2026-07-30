const express = require("express");
const {likePost,deletePost, createPost,getAllPost,getUserPost,getPost}= require("../controller/postController")
const Router = express.Router();
const authenticatedUserMiddleWare = require("../middleware/auth");
const upload = require("../middleware/upload");
Router.get("/",getAllPost);
Router.get("/:postId",getPost);
Router.get("/user/:username",getUserPost);

Router.post("/create", authenticatedUserMiddleWare,upload.single("image"),createPost);
Router.post("/:postId/like", authenticatedUserMiddleWare,likePost);
Router.delete("/delete/:postId",authenticatedUserMiddleWare, deletePost);

  

module.exports = Router  