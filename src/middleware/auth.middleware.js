import User from "../models/user.schema.js";
import JWT from "jsonwebtoken"
import asyncHandler from "../service/asyncHandler.js";
import config from "../config.js";
import CustomError from "../utils/CustomError.js";


// user is logged or not
export const isLoggedIn = asyncHandler(async (req, res, next) => {
    let token;

//grab token from cookies or you can grab from headers as well

    if (req.cookies.token || (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) ) {
        token = req.cookies.token || req.headers.authorization.split(" ")[1]
        
        // token = "Bearer gbhnjm235r5hbnj"
    }
// if the user not have the token throw the error
    if (!token) {
        throw new CustomError("Not authorized to access this resource", 401)
    }
//verifying the token that its real token or not then finding user by its id taking some value as well
    try {
        const decodedJwtPayload = JWT.verify(token, config.JWT_SECRET);

         req.user = await User.findById(decodedJwtPayload._id, "name email role")
         next()
    } catch (error) {
        throw new CustomError("Not authorized to access this resource", 401)
    }
    
})

// whatever user want to access from database first checking autorized user or not by which you can access or not .
export const authorize = (...requiredRoles) => asyncHandler( async (req, res, next) => {
    if (!requiredRoles.includes(req.user.role)) {
        throw new CustomError("You are not authorized to access this resource")
    }
    next()
})