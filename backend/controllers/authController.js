const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passport = require('../config/passport');

// Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '30d' }
  );
};

// @desc    Register a new user (Candidate or Employer)
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res, next) => {
  try {
    const { name, email, password, phone, userType } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide name, email and password' });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Set role based on userType (employer = admin, candidate = user)
    const role = userType === 'employer' ? 'admin' : 'user';

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      phone,
      userType: userType || 'candidate',
      role
    });

    // Generate token
    const token = generateToken(user);

    res.status(201).json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        userType: user.userType,
        role: user.role,
      },
      message: 'Registration successful'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Find user and include password field
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if user registered with Google OAuth (no password)
    if (!user.password && user.googleId) {
      return res.status(401).json({ 
        message: 'This account was created with Google. Please sign in with Google.' 
      });
    }

    // Check password
    const isPasswordMatch = await user.matchPassword(password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(403).json({ message: 'Account is deactivated. Please contact support.' });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    // Generate token
    const token = generateToken(user);

    res.json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        userType: user.userType,
        role: user.role,
        lastLogin: user.lastLogin
      },
      message: 'Login successful'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Public
const logout = (req, res) => {
  // Token-based auth: logout is handled on client side by deleting token
  res.json({ 
    success: true,
    message: 'Logout successful' 
  });
};

// @desc    Get user profile
// @route   GET /api/auth/me
// @access  Private
const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      success: true,
      user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { name, email, phone, address, bio, skills, experience, education } = req.body;

    // Check if email is being changed and if it's already taken
    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: 'Email already in use' });
      }
    }

    // Update user fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (phone !== undefined) user.phone = phone;
    if (address !== undefined) user.address = address;
    if (bio !== undefined) user.bio = bio;
    if (skills !== undefined) user.skills = skills;
    if (experience !== undefined) user.experience = experience;
    if (education !== undefined) user.education = education;

    await user.save();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        userType: user.userType,
        role: user.role,
        address: user.address,
        bio: user.bio,
        skills: user.skills,
        experience: user.experience,
        education: user.education
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update password
// @route   POST /api/auth/update-password
// @access  Private
const updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('+password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { currentPassword, newPassword } = req.body;

    // Validation
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ 
        message: 'Please provide current password and new password' 
      });
    }

    // Check if user has a password (Google OAuth users don't)
    if (!user.password) {
      return res.status(400).json({ 
        message: 'Cannot update password for accounts created with Google OAuth' 
      });
    }

    // Validate current password
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    // Validate new password strength
    if (newPassword.length < 6) {
      return res.status(400).json({ 
        message: 'New password must be at least 6 characters long' 
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({ 
      success: true,
      message: 'Password updated successfully' 
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Google OAuth - Initiate authentication
// @route   GET /api/auth/google
// @access  Public
const googleAuth = (req, res, next) => {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/login?error=google_not_configured`);
  }

  passport.authenticate('google', { 
    scope: ['profile', 'email'] 
  })(req, res, next);
};

// @desc    Google OAuth Callback
// @route   GET /api/auth/google/callback
// @access  Public
const googleAuthCallback = (req, res, next) => {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/login?error=google_not_configured`);
  }

  passport.authenticate('google', { 
    failureRedirect: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/login?error=google_auth_failed`,
    session: false 
  }, (err, user) => {
    if (err) {
      console.error('Google auth error:', err);
      return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/login?error=auth_failed`);
    }
    
    if (!user) {
      return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/login?error=no_user`);
    }

    try {
      // Generate JWT token
      const token = generateToken(user);

      // Redirect to frontend with token
      res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/login?token=${token}`);
    } catch (error) {
      console.error('Token generation error:', error);
      res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/login?error=token_failed`);
    }
  })(req, res, next);
};

// @desc    Get Google user info
// @route   GET /api/auth/google/user
// @access  Private
const getGoogleUser = async (req, res, next) => {
  try {
    res.json({ 
      success: true,
      user: req.user 
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Verify certificate by ID (For Certificate-based Login)
// @route   POST /api/auth/verify-certificate
// @access  Public
const verifyCertificate = async (req, res, next) => {
  try {
    const { certificateId } = req.body;

    if (!certificateId) {
      return res.status(400).json({ message: 'Certificate ID is required' });
    }

    // Import Certificate model
    const Certificate = require('../models/certificateModel');

    // Find certificate by ID
    const certificate = await Certificate.findOne({ certificateId });

    if (!certificate) {
      return res.status(404).json({ 
        success: false,
        message: 'Certificate not found or invalid' 
      });
    }

    // Check if certificate is valid
    if (!certificate.valid) {
      return res.status(400).json({ 
        success: false,
        message: 'This certificate has been revoked or is no longer valid' 
      });
    }

    // Return certificate details (no user login for public verification)
    res.json({
      success: true,
      message: 'Certificate verified successfully',
      certificate: {
        certificateId: certificate.certificateId,
        studentName: certificate.studentName,
        course: certificate.course,
        grade: certificate.grade,
        issueDate: certificate.issueDate,
        valid: certificate.valid,
        pdfPath: certificate.pdfPath
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
  updatePassword,
  googleAuth,
  googleAuthCallback,
  getGoogleUser,
  verifyCertificate,
};