require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const session = require('express-session');
const passport = require('./config/passport');
const connectDB = require('./config/db');
const path = require('path');

// Route imports
const authRoutes = require('./routes/authRoutes');
const certificateRoutes = require('./routes/certificateRoutes');
const studentRoutes = require('./routes/studentRoutes');

const errorMiddleware = require('./middlewares/errorHandler.js');

// Connect to MongoDB
connectDB();

const app = express();

// Trust proxy (important for rate limiting behind reverse proxy)
app.set('trust proxy', 1);

// Security Middleware
app.use(helmet());

// CORS Configuration - FIXED to match frontend port
app.use(cors({ 
  credentials: true, 
  origin: process.env.FRONTEND_URL || 'http://localhost:5173'  // Changed from 3000 to 5173
}));

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Session Middleware (required for Passport)
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // true in production (HTTPS)
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// Serve static files (uploaded certificates)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health Check Route
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/students', studentRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    message: 'Route not found' 
  });
});

// Error Handling Middleware (must be last)
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;  // Changed default from 5173 to 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
});