"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dashboard_controller_1 = require("../controllers/dashboard.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.json({ message: "Dashboard route working" });
});
router.use(auth_middleware_1.protect);
router.get('/stats', dashboard_controller_1.getDashboardStats);
router.get('/my-courses', dashboard_controller_1.getMyCourses);
exports.default = router;
