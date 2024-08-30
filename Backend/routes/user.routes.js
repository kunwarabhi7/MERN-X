import { Router } from "express";
import { ProtectRoute } from "../middleware/ProtectedRoute.js";
import { getUserProfile } from "../controllers/user.controller.js";

const router = new Router();

router.get("/profile/:username",ProtectRoute, getUserProfile)

export  {router as userRouter}