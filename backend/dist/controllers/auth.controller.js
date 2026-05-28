"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPassword = exports.logout = exports.loginUser = exports.registerUser = void 0;
const zod_1 = require("zod");
const User_1 = require("../models/User");
const hashPassword_1 = require("../utils/hashPassword");
const generateToken_1 = require("../utils/generateToken");
const crypto_1 = __importDefault(require("crypto"));
const registerSchema = zod_1.z.object({
    fullName: zod_1.z.string().min(2, "Full name must be at least 2 characters"),
    email: zod_1.z.string().email("Invalid email address"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
});
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email address"),
    password: zod_1.z.string().min(6, "Password is required"),
});
const registerUser = async (req, res, next) => {
    try {
        const { fullName, email, password } = registerSchema.parse(req.body);
        const userExists = await User_1.User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, error: 'User already exists' });
        }
        const passwordHash = await (0, hashPassword_1.hashPassword)(password);
        const referralCode = crypto_1.default.randomBytes(4).toString('hex').toUpperCase();
        const user = await User_1.User.create({
            fullName,
            email,
            passwordHash,
            referralCode,
            profileCompletion: 20 // Base completion upon registration
        });
        (0, generateToken_1.generateAndSetToken)(res, user._id.toString());
        res.status(201).json({
            success: true,
            data: {
                id: user._id.toString(),
                fullName: user.fullName,
                email: user.email,
                profileCompletion: user.profileCompletion,
            }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = loginSchema.parse(req.body);
        const user = await User_1.User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, error: 'Invalid email or password' });
        }
        const isMatch = await (0, hashPassword_1.comparePassword)(password, user.passwordHash);
        if (!isMatch) {
            return res.status(401).json({ success: false, error: 'Invalid email or password' });
        }
        const token = (0, generateToken_1.generateAndSetToken)(res, user._id.toString());
        res.json({
            success: true,
            data: {
                id: user._id.toString(),
                fullName: user.fullName,
                email: user.email,
            },
            token // Return token specifically if NextJS wants to use it directly instead of proxying cookies
        });
    }
    catch (error) {
        next(error);
    }
};
exports.loginUser = loginUser;
const logout = (req, res) => {
    (0, generateToken_1.clearToken)(res);
    res.json({ success: true, message: 'Logged out successfully' });
};
exports.logout = logout;
const forgotPassword = async (req, res, next) => {
    try {
        const { email } = zod_1.z.object({ email: zod_1.z.string().email() }).parse(req.body);
        // Simulate sending email logic here
        console.log(`Sending reset password link to: ${email}`);
        res.json({ success: true, message: 'If the email exists, a reset link will be sent' });
    }
    catch (error) {
        next(error);
    }
};
exports.forgotPassword = forgotPassword;
