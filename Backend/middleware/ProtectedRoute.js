import User from "../models/users.models.js";
import jwt from 'jsonwebtoken';

export const ProtectRoute = async(req,res,next) =>{
    try {
        const token = req.cookies.jwt;
       if(!token){
        return res.status(401).json({message:"Not authorized, token is missing"});
       }
       const decode = jwt.verify(token,process.env.JWT_SECRET);
       if(!decode){
        return res.status(401).json({message:"Not authorized, token is invalid"});
       }
       const user = await User.findById(decode.userId).select('-password');
       if(!user){
        return res.status(401).json({message:"Not authorized, user not found"});
       }
       req.user = user;
       next();
    } catch (error) {
 console.log("Error in protected route middleware",error.message);
 return res.status(500).json({message:"Internal server error"});       
    }
}
