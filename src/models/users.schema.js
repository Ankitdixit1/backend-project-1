import mongoose from "mongoose";
import AuthRoles from "../utills/authrole.js";
import bcrypt from "bcryptjs"; 
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
// encripting the password before saving
userschema.pre("save", async function(next){
    if (!this.isModified("passwrod")) return next()
    this.password = await bcrypt.hash(this.password,10) 
    next()
})
userschema.methods={
    //compare passwords 
    comparePassword:async function(comparePassword){
        return await bcrypt.compare(comparePassword,this.passward)
    }
}


export default mongoose.model("User",userschema)