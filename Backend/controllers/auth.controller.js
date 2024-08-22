import { generateTokenAndSecret } from "../lib/utils/generateToken.js";
import User from "../models/users.models.js";
import bcrypt from 'bcryptjs'
export const signup =async (req, res) => {
try {
   const {fullName,username,email,password} = req.body;
   const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
   if(!emailRegex.test(email)){
      return res.status(400).json({error: 'Invalid email format'});
   }

   const existingUser = await User.findOne({email});
   if(existingUser){
      return res.status(400).json({error: 'Email already exists'});
   }
    const existingEmail = await User.findOne({email});
    if(existingEmail){
       return res.status(400).json({error: 'Email already exists'});
    }

    //hashpassword
    if(password.length < 6){
       return res.status(400).json({error: 'Password must be at least 6 characters'});
    }
    const hash = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, hash);

    const newUser = new User({
        fullName,
        username,
        email,
        password: hashedPassword,
    })
    if(newUser){
      generateTokenAndSecret(newUser._id,res)
      await newUser.save();

      res.status(201).json({
         _id:newUser._id,
         fullName:newUser.fullName,
         username: newUser.username,
         email: newUser.email,
followers:newUser.followers,
followings:newUser.followings,
profileImg:newUser.profileImg,
coverImg:newUser.coverImg      
      })
    } else{
      res.status(400).json({error: 'Signup failed'})
    }
} catch (error) {
   console.log('Error in signup User',error.message)
   res.status(500).json({error: 'Internal server error'})
} }

 export const login =async (req, res) => {
    res.json({
       message: 'Signup complete'})
 }

 export const logout =async (req, res) => {
    res.json({
       message: 'Signup complete'})
 }