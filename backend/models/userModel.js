const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, select: false },  // Changed: not required for Google OAuth
  phone: { type: String, trim: true },
  userType: { type: String, enum: ['candidate', 'employer'], default: 'candidate' },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  isActive: { type: Boolean, default: true },
  lastLogin: { type: Date },
  googleId: { type: String, unique: true, sparse: true },  // ADDED for Google OAuth
  createdAt: { type: Date, default: Date.now },
  // Profile fields
  address: { type: String, trim: true },
  bio: { type: String, trim: true },
  skills: { type: String, trim: true },
  experience: { type: String, trim: true },
  education: { type: String, trim: true }
});

// Hash password before saving (only if password is modified)
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  // Only hash if password exists (for Google OAuth users, password might not exist)
  if (this.password) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  if (!this.password) return false;  // Google OAuth users don't have passwords
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);