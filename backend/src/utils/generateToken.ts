import jwt from 'jsonwebtoken';
import { ENV } from '../config/env';
import { Response } from 'express';

export const generateAndSetToken = (
  res: Response,
  userId: string
) => {
  const token = jwt.sign(
    { userId },
    ENV.JWT_SECRET,
    {
      expiresIn: ENV.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'],
    }
  );

res.cookie('token', token, {
  httpOnly: true,
  secure: true,
  sameSite: 'none',
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

  return token;
};

export const clearToken = (res: Response) => {
  res.cookie('token', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    expires: new Date(0),
  });
};