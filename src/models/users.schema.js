import mongoose from "mongoose";
import AuthRoles from "../utills/authrole.js";
const userschema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:["true","Name is required"],
            maxLength:["50 words is required"]
        },
        email:{
            type:String,
            required:["true","Email is required"]
        },
        passward:{
            type:String,
            required:[true,"passward is required"],
            minLength:[8,"passward must be less than 8chars"],
            select:false
        },
        role:{
            type:String,
            enum:Object.values(AuthRoles),
            default:AuthRoles.USER
        },
        forgotpasswrodToken:String,
        forgotpasswrodToken:Date
    },{timestamps:true}
)
export default mongoose.model("User",userschema)