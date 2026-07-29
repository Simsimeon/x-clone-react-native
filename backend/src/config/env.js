  require("dotenv").config()


 const ENV={
  PORT:process.env.PORT, 
  MON_URI:process.env.MON_URI,
  NODE_ENV:process.env.NODE_ENV,
  CLERK_PUBLISHABLE_KEY:process.env.CLERK_PUBLISHABLE_KEY,
  CLERK_SECRET_KEY:process.env.CLERK_SECRET_KEY,
  ARCJET_ENV:process.env.ARCJET_ENV,
  ARCJET_KEY:process.env.ARCJET_KEY,
  CLOUDINARY_CLOUD_NAME:process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY:process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET:process.env.CLOUDINARY_API_SECRET
}

module.exports = ENV