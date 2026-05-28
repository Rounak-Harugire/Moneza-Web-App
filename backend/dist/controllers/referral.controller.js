"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReferralStats = exports.getReferralLink = void 0;
const Referral_1 = require("../models/Referral");
const getReferralLink = async (req, res, next) => {
    try {
        const referralCode = req.user.referralCode;
        res.json({
            success: true,
            data: {
                referralCode,
            }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getReferralLink = getReferralLink;
const getReferralStats = async (req, res, next) => {
    try {
        const referrals = await Referral_1.Referral.find({ referrer: req.user._id }).populate('referredUser', 'fullName createdAt');
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
    }
    catch (error) {
        next(error);
    }
};
exports.getReferralStats = getReferralStats;
