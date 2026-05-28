import express from 'express';
import { getMe, updateProfile } from '../controllers/user.controller';
import { protect } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: "User route working" });
});

router.use(protect); // Secure all basic user routes
router.route('/me').get(getMe).put(updateProfile);

export default router;
