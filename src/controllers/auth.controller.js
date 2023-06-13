//signup new user
import asynchandler from "../services/asynchandler";
import Customerror from "../utills/customerror";
import User from "../models/users.schema"

export const cookieOptions = {
    expires : new Date (Data.now()+3*24*60*60*1000),
    httpOnly: true
}
export const signup = asynchandler(async(req,res) => {
    //get data from user 
    const {name,email,password} = req.body

    //vladiation
    if(!name || !email || !password){
        throw new Customerror("fill the form",400)
    }
    // checking if the user is alredy a user or not 
    const existinguser = await User.findOne({email})

    if (existinguser){
        throw new Customerror("User already exist ",400)
    }

    const user = await User.create({
        name,
        email,
        password
    })

    const token = user.getJWTtoken()
    safty
     user.passward = undefined
    //store this token in user's cookie 
    res.cookie("token",token,cookieOptions)
     //send back a responce to user
     res.status(200).json({
        success:true,
        token,
        user,    
     })
})