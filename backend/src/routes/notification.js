const express = require("express");
const getNotification = require("../controller/notificationController");
const authenticatedUserMiddleWare = require("../middleware/auth");
const router = express.Router();


router.get("/",authenticatedUserMiddleWare,getNotification)
router.delete("/:notificationId",authenticatedUserMiddleWare,deleteNotification)


module.exports=router