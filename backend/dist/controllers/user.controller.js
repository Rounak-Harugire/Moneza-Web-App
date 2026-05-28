"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.getMe = void 0;
const zod_1 = require("zod");
const User_1 = require("../models/User");
const updateProfileSchema = zod_1.z.object({
    fullName: zod_1.z.string().min(2).optional(),
    // Add other updateable fields here
});
const getMe = async (req, res, next) => {
    try {
        const user = req.user;
        res.json({ success: true, data: user });
    }
    catch (error) {
        next(error);
    }
};
exports.getMe = getMe;
const updateProfile = async (req, res, next) => {
    try {
        const validatedData = updateProfileSchema.parse(req.body);
        // Simulate profile completion calculation
        let completionScore = req.user.profileCompletion;
        if (validatedData.fullName && req.user.fullName !== validatedData.fullName) {
            completionScore = Math.min(100, completionScore + 10);
        }
        const updatedUser = await User_1.User.findByIdAndUpdate(req.user._id, { ...validatedData, profileCompletion: completionScore }, { new: true, runValidators: true }).select('-passwordHash');
        res.json({ success: true, data: updatedUser });
    }
    catch (error) {
        next(error);
    }
};
exports.updateProfile = updateProfile;
