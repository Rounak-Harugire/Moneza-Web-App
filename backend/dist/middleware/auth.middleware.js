"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const User_1 = require("../models/User");
const protect = async (req, res, next) => {
    try {
        let token = req.cookies.token;
        // Check for Authorization header as fallback
        if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            return res.status(401).json({ success: false, error: 'Not authorized, no token' });
        }
        const decoded = jsonwebtoken_1.default.verify(token, env_1.ENV.JWT_SECRET);
        const user = await User_1.User.findById(decoded.userId).select('-passwordHash');
        if (!user) {
            return res.status(401).json({ success: false, error: 'Not authorized, user not found' });
        }
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(401).json({ success: false, error: 'Not authorized, token failed' });
    }
};
exports.protect = protect;
