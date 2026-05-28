import express from 'express';
import { getCourses, getCourseById, enrollCourse, unenrollCourse } from '../controllers/course.controller';
import { protect } from '../middleware/auth.middleware';

const router = express.Router();
router.get('/', getCourses);
router.get('/:id', getCourseById);
router.post('/:id/enroll', protect, enrollCourse);
router.delete('/:id/enroll', protect, unenrollCourse);

export default router;
