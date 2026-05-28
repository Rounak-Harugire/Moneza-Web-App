import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { z } from 'zod';
import { User } from '../models/User';

const updateProfileSchema = z.object({
  fullName: z.string().min(2).optional(),
  // Add other updateable fields here
});

export const getMe = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const validatedData = updateProfileSchema.parse(req.body);
    
    // Simulate profile completion calculation
    let completionScore = req.user.profileCompletion;
    if (validatedData.fullName && req.user.fullName !== validatedData.fullName) {
      completionScore = Math.min(100, completionScore + 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { ...validatedData, profileCompletion: completionScore },
      { new: true, runValidators: true }
    ).select('-passwordHash');

    res.json({ success: true, data: updatedUser });
  } catch (error) {
    next(error);
  }
};
