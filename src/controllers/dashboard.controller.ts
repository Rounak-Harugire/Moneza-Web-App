import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { Enrollment } from '../models/Enrollment';

export const getDashboardStats = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user._id;

    const enrolledCoursesCount = await Enrollment.countDocuments({ user: userId });
    const certificatesCount = await Enrollment.countDocuments({ user: userId, isCompleted: true });

    res.json({
      success: true,
      data: {
        enrolledCourses: enrolledCoursesCount,
        certificates: certificatesCount,
        profileCompletion: req.user.profileCompletion,
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getMyCourses = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const enrollments = await Enrollment.find({ user: req.user._id }).populate('course');
    res.json({ success: true, data: enrollments });
  } catch (error) {
    next(error);
  }
};
