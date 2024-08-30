import User from "../models/users.models.js";

export const getUserProfile = async(req,res)=>{
    const {username} = req.params
    try {
        const user = await User.findOne({username}).select('-password');
        if(!user){
            return res.status(404).json({error: 'User not found'})
        }
        return res.status(200).json(user);
    } catch (error) {
        console.log("Error in getUserProfile",error.message);
        res.status(500).json({error: 'Internal server error'})
    }
}