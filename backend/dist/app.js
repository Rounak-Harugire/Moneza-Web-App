"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// Import Routes
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const course_routes_1 = __importDefault(require("./routes/course.routes"));
const dashboard_routes_1 = __importDefault(require("./routes/dashboard.routes"));
const referral_routes_1 = __importDefault(require("./routes/referral.routes"));
const contact_routes_1 = __importDefault(require("./routes/contact.routes"));
// Import Custom Error Middleware
const error_middleware_1 = require("./middleware/error.middleware");
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:3000",
        "https://moneza-web-app.vercel.app"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.get("/", (req, res) => {
    res.send("Moneza Backend Running 🚀");
});
app.get("/api/v1", (req, res) => {
    res.json({
        success: true,
        message: "Moneza API Running 🚀",
    });
});
// Test Route
app.get('/api/v1/test', (req, res) => {
    res.json({ message: "API working perfectly 🚀" });
});
// API Routes
app.use('/api/v1/auth', auth_routes_1.default);
app.use('/api/v1/users', user_routes_1.default);
app.use('/api/v1/courses', course_routes_1.default);
app.use('/api/v1/dashboard', dashboard_routes_1.default);
app.use('/api/v1/referrals', referral_routes_1.default);
app.use('/api/v1/contact', contact_routes_1.default);
// Error Handling Middleware (must be registered last)
app.use(error_middleware_1.notFound);
app.use(error_middleware_1.errorHandler);
exports.default = app;
