import express, { Express } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Import Routes
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import courseRoutes from './routes/course.routes';
import dashboardRoutes from './routes/dashboard.routes';
import referralRoutes from './routes/referral.routes';
import contactRoutes from './routes/contact.routes';

// Import Custom Error Middleware
import { notFound, errorHandler } from './middleware/error.middleware';

const app: Express = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Test Route
app.get('/api/v1/test', (req, res) => {
  res.json({ message: "API working perfectly 🚀" });
});

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);
app.use('/api/v1/referrals', referralRoutes);
app.use('/api/v1/contact', contactRoutes);

// Error Handling Middleware (must be registered last)
app.use(notFound);
app.use(errorHandler);

export default app;
