import express from 'express';
import cors from 'cors';

const app = express();

// 1. Define allowed origins explicitly (No trailing slashes!)
const allowedOrigins = [
  'https://moneza-web-app.vercel.app',
  'http://localhost:3000' // For local testing
];

// 2. Configure CORS middleware options
app.use(cors({
  origin: function (origin, callback) {
    // Allow server-to-server requests or tools like Postman (where origin is undefined)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.error(`Blocked by CORS: ${origin}`);
      callback(new Error('Not allowed by CORS policy'));
    }
  },
  credentials: true, // MANDATORY: This allows cookies/sessions to pass cross-domain
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'set-cookie']
}));

// IMPORTANT: Make sure your express parsers go AFTER the CORS middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Your routes (like app.use('/api/v1/auth', authRoutes)) go below this...