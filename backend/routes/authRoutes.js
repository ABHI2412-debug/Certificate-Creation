const express = require('express');
const router = express.Router();
const passport = require('../config/passport');
const { register, login, logout, getProfile, updateProfile, updatePassword, googleAuth, googleAuthCallback, getGoogleUser } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');
const { verifyCertificate } = require('../controllers/authController');
// public
router.post('/register', register);
router.post('/login', login);
router.post('/verify-certificate', verifyCertificate);
router.get('/google', googleAuth);
router.get('/google/callback', googleAuthCallback);
router.post('/logout', logout ? logout : (req, res) => res.status(501).send('Logout not implemented'));

// protected
router.get('/me', protect, getProfile ? getProfile : (req, res) => res.status(501).send('getProfile not implemented'));
router.put('/profile', protect, updateProfile);
router.post('/update-password', protect, updatePassword ? updatePassword : (req, res) => res.status(501).send('updatePassword not implemented'));

module.exports = router;
