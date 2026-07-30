const express = require("express");
const router = express.Router();
const {followUser,createUser,getUserProfile,updateProfile,synClerkUserToDb,showCurrentUser} = require("../controller/userController");
const authenticatedUserMiddleWare = require("../middleware/auth");


router.post("/", createUser);
router.post("/sync",synClerkUserToDb)
router.post("/follow/:targetUserId",authenticatedUserMiddleWare,followUser)
router.get("/profile/:username", getUserProfile);
router.get("/showme",authenticatedUserMiddleWare,showCurrentUser);
router.patch("/profile",authenticatedUserMiddleWare, getUserProfile);


module.exports = router