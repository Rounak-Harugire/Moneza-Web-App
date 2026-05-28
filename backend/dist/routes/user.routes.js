"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.json({ message: "User route working" });
});
router.use(auth_middleware_1.protect); // Secure all basic user routes
router.route('/me').get(user_controller_1.getMe).put(user_controller_1.updateProfile);
exports.default = router;
