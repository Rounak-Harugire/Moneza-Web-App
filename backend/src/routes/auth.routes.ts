import express from 'express';
import { registerUser, loginUser, logout, forgotPassword } from '../controllers/auth.controller';

const router = express.Router();
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logout);
router.post('/forgot-password', forgotPassword);

export default router;
