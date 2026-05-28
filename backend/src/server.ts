import express from 'express';
import cors from 'cors';

const app = express();

// Define your frontend origin
const allowedOrigins = [
  'https://moneza-web-app.vercel.app',
  'http://localhost:3000' // For your local testing environment
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS policy'));
    }
  },
  credentials: true, // Crucial for reading HTTP-Only session cookies across domains
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));

// Express json parsers and route declarations should go below this line
app.use(express.json());