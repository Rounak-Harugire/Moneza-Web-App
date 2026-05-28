"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyCourses = exports.getDashboardStats = void 0;
const Enrollment_1 = require("../models/Enrollment");
const getDashboardStats = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const enrolledCoursesCount = await Enrollment_1.Enrollment.countDocuments({ user: userId });
        const certificatesCount = await Enrollment_1.Enrollment.countDocuments({ user: userId, isCompleted: true });
        res.json({
            success: true,
            data: {
                enrolledCourses: enrolledCoursesCount,
                certificates: certificatesCount,
                profileCompletion: req.user.profileCompletion,
            }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getDashboardStats = getDashboardStats;
const getMyCourses = async (req, res, next) => {
    try {
        const enrollments = await Enrollment_1.Enrollment.find({ user: req.user._id }).populate('course');
        res.json({ success: true, data: enrollments });
    }
    catch (error) {
        next(error);
    }
};
exports.getMyCourses = getMyCourses;
