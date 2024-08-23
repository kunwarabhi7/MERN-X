import express from 'express';
import { getMe, login, logout, signup } from '../controllers/auth.controller.js';
import { ProtectRoute } from '../middleware/ProtectedRoute.js';

const router = express.Router();

router.get("/getme", ProtectRoute,getMe)

router.post('/signup', signup);

router.post('/login', login);

router.post('/logout',logout);

export {router as authRouter};