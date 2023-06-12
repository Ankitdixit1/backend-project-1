import mongoose from "mongoose";
import AuthRoles from "../utills/authrole.js";
import bcrypt from "bcryptjs"; 
import Jwt  from "jsonwebtoken";
import config from "../config/index.js"
import crypto from "crypto"
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
    comparePassword:async function(enteredPassword){
        return await bcrypt.compare(enteredPassword,this.passward)
    },
    // generate web token 
    getJWTtoken:function(){
        Jwt.sign({_id:this._id},config.JWT_SECRET,{
            expiresin:config.JWT_EXPIRY
        })
    },
    //gerrate forgot token password
    generateForgotPasswordToken:function(){
        const forgotToken=crypto.randomBytes(20).toString("hex")
        this.forgotpasswrodToken = crypto
        .createHash("sha256")
        .update(forgotToken)
        .digest("hex")

        //time for token to expire 
        this.forgotpasswrodExpiry = Data.now()+20*60*1000
        return forgotToken
    }
}


export default mongoose.model("User",userschema)