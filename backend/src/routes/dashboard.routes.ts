import express from 'express';
import { getDashboardStats, getMyCourses } from '../controllers/dashboard.controller';
import { protect } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: "Dashboard route working" });
});

router.use(protect);
router.get('/stats', getDashboardStats);
router.get('/my-courses', getMyCourses);

export default router;
