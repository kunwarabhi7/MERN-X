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

export const followUnfollowUser = async(req,res) => {
    try {
        const {id} = req.params;
        const userToModify = await User.findById(id);
        const currentUser = await User.findById(req.user._id);
        if(id=== req.user._id){
            return res.status(400).json({error: 'Cannot follow or unfollow yourself'})
        }
        if(!userToModify || !currentUser){{
            return res.status(404).json({error: 'User not found'})
        }}
        const isFollowing = currentUser.followings.includes(id);
        if(isFollowing){
            //unfollow
 await User.findByIdAndUpdate(id,{$pull:{followers:currentUser._id}});
 await User.findByIdAndUpdate(req.user._id,{$pull:{followings:id}})
 res.status(200).json({message: 'user Unfollowed successfully'})
        }else{
            //follow
            await User.findByIdAndUpdate(id, {$push:{followers:currentUser._id}});
            await User.findByIdAndUpdate(req.user._id,{$push:{followings:id}})
            res.status(200).json({message: 'user Followed successfully'})
        }
    } catch (error) {
        console.log("Error in followUnfollowUser",error.message);
        res.status(500).json({error: 'Internal server error'})
    }
}