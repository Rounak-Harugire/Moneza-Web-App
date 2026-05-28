import express from 'express';
import { getReferralStats, getReferralLink } from '../controllers/referral.controller';
import { protect } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: "Referral route working" });
});

router.use(protect);
router.get('/link', getReferralLink);
router.get('/stats', getReferralStats);

export default router;
