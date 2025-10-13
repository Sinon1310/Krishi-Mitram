import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';

// Config
import connectDB from './config/database.js';

// Routes
import aiRoutes from './routes/aiRoutes.js';
import imageRoutes from './routes/imageRoutes.js';
import weatherRoutes from './routes/weatherRoutes.js';

// Debug environment variables
console.log('🔧 Environment Debug:', {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  GEMINI_KEY_EXISTS: !!process.env.GEMINI_API_KEY,
  GEMINI_KEY_PREVIEW: process.env.GEMINI_API_KEY?.substring(0, 10) + '...',
  OPENAI_KEY_EXISTS: !!process.env.OPENAI_API_KEY
});

const app = express();
const PORT = process.env.PORT || 10000;

// Security Middleware
app.use(helmet());
app.use(compression());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

// CORS
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://krishi-mitram-wheat.vercel.app',
    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true
}));

// Logging
app.use(morgan('combined'));

// Body Parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Database Connection
connectDB();

// API Routes
app.use('/api/v1/ai', aiRoutes);
app.use('/api/v1/images', imageRoutes);
app.use('/api/v1/weather', weatherRoutes);

// Health Check
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'KrishiMitram API is running optimally',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Test Route
app.post('/api/v1/test-query', (req, res) => {
  const { question } = req.body;
  res.json({
    success: true,
    answer: `I received your question: "${question}". This is from KrishiMitram AI!`,
    timestamp: new Date().toISOString()
  });
});

// Error Handling for undefined routes - FIXED THIS LINE
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  });
});

// Keep-alive mechanism for free tier hosting
if (process.env.NODE_ENV === 'production') {
  setInterval(() => {
    // Self-ping to prevent Render from sleeping
    const https = require('https');
    const options = {
      hostname: 'krishi-mitram.onrender.com',
      port: 443,
      path: '/api/v1/health',
      method: 'GET'
    };
    
    const req = https.request(options, (res) => {
      console.log('🔄 Keep-alive ping sent, status:', res.statusCode);
    });
    
    req.on('error', (err) => {
      console.log('⚠️ Keep-alive ping failed:', err.message);
    });
    
    req.end();
  }, 14 * 60 * 1000); // Ping every 14 minutes
}

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 KrishiMitram Backend running on port ${PORT}`);
  console.log(`🌱 Environment: ${process.env.NODE_ENV || 'development'}`);
  
  if (process.env.NODE_ENV === 'production') {
    console.log('🔄 Keep-alive mechanism activated for production');
  }
});