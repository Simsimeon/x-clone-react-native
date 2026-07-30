const multer = require("multer");
const Errors =require("../errors")
const storage = multer.memoryStorage();


const filterFilter = (req,file,cb)=>{
 if(file.mimetype.startsWith("image/")){
    cb(null,true)
 }else{
    cb(  new Errors.BadRequest("only image files are allowed"),false);
 }
}


const upload = multer({
    storage:storage,
    fileFilter:filterFilter,
    limits:{fileSize:5 * 1024 * 1024},
})

module.exports = upload;