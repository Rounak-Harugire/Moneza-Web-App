import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { User } from '../models/User';
import { hashPassword, comparePassword } from '../utils/hashPassword';
import { generateAndSetToken, clearToken } from '../utils/generateToken';
import crypto from 'crypto';

const registerSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password is required"),
});

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { fullName, email, password } = registerSchema.parse(req.body);

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, error: 'User already exists' });
    }

    const passwordHash = await hashPassword(password);
    const referralCode = crypto.randomBytes(4).toString('hex').toUpperCase();

    const user = await User.create({
      fullName,
      email,
      passwordHash,
      referralCode,
      profileCompletion: 20 // Base completion upon registration
    });

    generateAndSetToken(res, user._id.toString());

    res.status(201).json({
      success: true,
      data: {
        id: user._id.toString(),
        fullName: user.fullName,
        email: user.email,
        profileCompletion: user.profileCompletion,
      }
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    const token = generateAndSetToken(res, user._id.toString());

    res.json({
      success: true,
      data: {
        id: user._id.toString(),
        fullName: user.fullName,
        email: user.email,
      },
      token // Return token specifically if NextJS wants to use it directly instead of proxying cookies
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (req: Request, res: Response) => {
  clearToken(res);
  res.json({ success: true, message: 'Logged out successfully' });
};

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = z.object({ email: z.string().email() }).parse(req.body);
    // Simulate sending email logic here
    console.log(`Sending reset password link to: ${email}`);
    res.json({ success: true, message: 'If the email exists, a reset link will be sent' });
  } catch (error) {
    next(error);
  }
};
