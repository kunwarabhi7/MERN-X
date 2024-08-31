import { Router } from "express";
import { ProtectRoute } from "../middleware/ProtectedRoute.js";
import { followUnfollowUser, getUserProfile } from "../controllers/user.controller.js";

const router = new Router();

router.get("/profile/:username",ProtectRoute, getUserProfile)
router.post("/profile/",ProtectRoute,followUnfollowUser);

export  {router as userRouter}