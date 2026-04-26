const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Protect routes - Verify JWT token
async function protect(req, res, next) {
  try {
    let token;

    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Check if token exists
    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'Not authenticated. Please login.' 
      });
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid or expired token. Please login again.' 
      });
    }

    // Find user by decoded ID
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'User not found. Token is invalid.' 
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(403).json({ 
        success: false,
        message: 'Your account has been deactivated. Please contact support.' 
      });
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}

// Authorize specific roles
function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        success: false,
        message: 'Not authenticated' 
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false,
        message: `Access denied. This action requires ${roles.join(' or ')} role.` 
      });
    }

    next();
  };
}

module.exports = { protect, authorize };