import mongoose from  "mongoose";
import { unique } from "next/dist/build/utils";

const userSchema = new mongoose.Schema({
   username: {
      type:String,
      required:[true,"please provide a username"],
   },
   email:{
      type:String,
      required:[true,"please provide a email"],
      unique:true,
   },
   password:{
      type:String,
      required:[true,"please provide password"]
   },
   isVerified :{
      type:Boolean,
      deafult:false,
   },
   isAdmin:{
      type:Boolean,
      default:false,
   },
   forgotPasswordToken:String,
   forgotPasswordTokenExpiry:Date,
   verifyToken:String,
   verifyTokenExpiry: Date,

})

const User = mongoose.models.users || mongoose.model
("users",userSchema);

export default User;