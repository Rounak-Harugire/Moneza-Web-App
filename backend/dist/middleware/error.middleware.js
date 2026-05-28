"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFound = void 0;
const env_1 = require("../config/env");
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};
exports.notFound = notFound;
const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;
    // Handle Mongoose cast errors
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        message = 'Resource not found';
        statusCode = 404;
    }
    // Handle Mongoose duplicate key
    if (err.code === 11000) {
        message = 'Duplicate field value entered';
        statusCode = 400;
    }
    // Handle Zod validation errors
    if (err.name === 'ZodError') {
        message = err.errors.map((e) => e.message).join(', ');
        statusCode = 400;
    }
    res.status(statusCode).json({
        success: false,
        error: message,
        stack: env_1.ENV.NODE_ENV === 'production' ? null : err.stack,
    });
};
exports.errorHandler = errorHandler;
