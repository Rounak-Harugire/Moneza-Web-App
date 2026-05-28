"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const course_controller_1 = require("../controllers/course.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router.get('/', course_controller_1.getCourses);
router.get('/:id', course_controller_1.getCourseById);
router.post('/:id/enroll', auth_middleware_1.protect, course_controller_1.enrollCourse);
router.delete('/:id/enroll', auth_middleware_1.protect, course_controller_1.unenrollCourse);
exports.default = router;
