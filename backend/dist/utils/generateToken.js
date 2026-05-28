"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearToken = exports.generateAndSetToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const generateAndSetToken = (res, userId) => {
    const token = jsonwebtoken_1.default.sign({ userId }, env_1.ENV.JWT_SECRET, {
        expiresIn: env_1.ENV.JWT_EXPIRES_IN,
    });
    res.cookie('token', token, {
        httpOnly: true,
        secure: true, // Required for sameSite: 'none'
        sameSite: 'none', // Crucial for Vercel -> Render communication
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return token;
};
exports.generateAndSetToken = generateAndSetToken;
const clearToken = (res) => {
    res.cookie('token', '', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        expires: new Date(0),
    });
};
exports.clearToken = clearToken;
