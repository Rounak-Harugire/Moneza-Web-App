import { Request, Response, NextFunction } from 'express';
import { Course } from '../models/Course';
import { Enrollment } from '../models/Enrollment';
import { AuthRequest } from '../middleware/auth.middleware';

export const getCourses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const courses = await Course.find({}).sort({ createdAt: -1 });
    res.json({ success: true, data: courses });
  } catch (error) {
    next(error);
  }
};

export const getCourseById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, error: 'Course not found' });
    }
    res.json({ success: true, data: course });
  } catch (error) {
    next(error);
  }
};

export const enrollCourse = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ success: false, error: 'Course not found' });
    }

    const existingEnrollment = await Enrollment.findOne({
      user: req.user._id,
      course: courseId
    });

    if (existingEnrollment) {
      return res.status(400).json({ success: false, error: 'Already enrolled in this course' });
    }

    const enrollment = await Enrollment.create({
      user: req.user._id,
      course: courseId,
    });

    res.status(201).json({ success: true, data: enrollment });
  } catch (error) {
    next(error);
  }
};

export const unenrollCourse = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const courseId = req.params.id;
    const enrollment = await Enrollment.findOneAndDelete({
      user: req.user._id,
      course: courseId
    });

    if (!enrollment) {
      return res.status(404).json({ success: false, error: 'Enrollment not found' });
    }

    res.json({ success: true, message: 'Course unenrollment successful' });
  } catch (error) {
    next(error);
  }
};
