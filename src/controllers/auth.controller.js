//signup new user
import asynchandler from "../services/asynchandler";
import Customerror from "../utills/customerror";
import User from "../models/users.schema"

export const cookieOptions = {
    expires : new Date (Data.now()+3*24*60*60*1000),
    httpOnly: true
}
/*******************************
*@SIGNUP
*@route http://localhost:5000/api/auth/signup
*@description User signup controller for creating new user
*@returns user object
*****************************/
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

export const login = asynchandler(async(req,res)=>{
    const {email,passward} = req.body

    //validation
    if(!email || !passward){
        throw new Customerror("please fill all the details",400)
    }
    const user = User.findOne({email}).select("+passward")
    if(!user){
        throw new Customerror("invalidation",400)
    }

    const ispasswordmatched = await user.comparePassword(passward)
    if(ispasswordmatched){
        const token = user.getJWTtoken()
        user.passward = undefined
        res.cookie("token",token,cookieOptions)
        return res.status(200).json({
            success:true,
            token,
            user
        })
    }

    throw new Customerror("password is correct",400)
})

export const logout = asynchandler(async(req,res) => {
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json(
        {
            success:true,
            message:'logged out'
        }
    )
})