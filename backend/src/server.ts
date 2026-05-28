import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'; // Make sure this is installed!
// Import your routes below
import authRoutes from './routes/authRoutes.js'; 
import courseRoutes from './routes/courseRoutes.js'; 
import userRoutes from './routes/userRoutes.js'; 

const app = express();

// ==========================================
// 1. CORS CONFIGURATION (MUST BE FIRST)
// ==========================================
const allowedOrigins = [
  'https://moneza-web-app.vercel.app',
  'http://localhost:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow server-to-server requests or tools like Postman
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS policy'));
    }
  },
  credentials: true, // Required for HttpOnly cookies across domains
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Cookie']
}));

// ==========================================
// 2. STANDARD PARSERS & COOKIE HANDLING
// ==========================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Essential to read cross-site auth tokens

// ==========================================
// 3. ROUTE DECLARATIONS (MUST BE AFTER CORS)
// ==========================================
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/users', userRoutes);

// Root test endpoint to confirm CORS is active
app.get('/', (req, res) => {
  res.send('Moneza API Backend is running and CORS is healthy!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server executing safely on port ${PORT}`);
});