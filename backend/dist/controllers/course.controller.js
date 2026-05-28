"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unenrollCourse = exports.enrollCourse = exports.getCourseById = exports.getCourses = void 0;
const Course_1 = require("../models/Course");
const Enrollment_1 = require("../models/Enrollment");
const getCourses = async (req, res, next) => {
    try {
        const courses = await Course_1.Course.find({}).sort({ createdAt: -1 });
        res.json({ success: true, data: courses });
    }
    catch (error) {
        next(error);
    }
};
exports.getCourses = getCourses;
const getCourseById = async (req, res, next) => {
    try {
        const course = await Course_1.Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ success: false, error: 'Course not found' });
        }
        res.json({ success: true, data: course });
    }
    catch (error) {
        next(error);
    }
};
exports.getCourseById = getCourseById;
const enrollCourse = async (req, res, next) => {
    try {
        const courseId = req.params.id;
        const course = await Course_1.Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ success: false, error: 'Course not found' });
        }
        const existingEnrollment = await Enrollment_1.Enrollment.findOne({
            user: req.user._id,
            course: courseId
        });
        if (existingEnrollment) {
            return res.status(400).json({ success: false, error: 'Already enrolled in this course' });
        }
        const enrollment = await Enrollment_1.Enrollment.create({
            user: req.user._id,
            course: courseId,
        });
        res.status(201).json({ success: true, data: enrollment });
    }
    catch (error) {
        next(error);
    }
};
exports.enrollCourse = enrollCourse;
const unenrollCourse = async (req, res, next) => {
    try {
        const courseId = req.params.id;
        const enrollment = await Enrollment_1.Enrollment.findOneAndDelete({
            user: req.user._id,
            course: courseId
        });
        if (!enrollment) {
            return res.status(404).json({ success: false, error: 'Enrollment not found' });
        }
        res.json({ success: true, message: 'Course unenrollment successful' });
    }
    catch (error) {
        next(error);
    }
};
exports.unenrollCourse = unenrollCourse;
