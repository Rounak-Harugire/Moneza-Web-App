import { Request, Response, NextFunction } from 'express';
import { ENV } from '../config/env';

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
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
    message = err.errors.map((e: any) => e.message).join(', ');
    statusCode = 400;
  }

  res.status(statusCode).json({
    success: false,
    error: message,
    stack: ENV.NODE_ENV === 'production' ? null : err.stack,
  });
};
