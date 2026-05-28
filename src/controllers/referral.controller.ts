import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { Referral } from '../models/Referral';

export const getReferralLink = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const referralCode = req.user.referralCode;
    res.json({
      success: true,
      data: {
        referralCode,
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getReferralStats = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const referrals = await Referral.find({ referrer: req.user._id }).populate('referredUser', 'fullName createdAt');
    
    const totalReferrals = referrals.length;
    const completedReferrals = referrals.filter(r => r.status === 'Completed').length;

    res.json({
      success: true,
      data: {
        total: totalReferrals,
        completed: completedReferrals,
        referrals
      }
    });
  } catch (error) {
    next(error);
  }
};
