const mongoose = require('mongoose');

async function connectDB() {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/cvs';
    await mongoose.connect(uri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    console.log('Please ensure MongoDB is running locally or update MONGO_URI in .env file');
    console.log('For MongoDB Atlas (cloud): mongodb+srv://username:password@cluster.mongodb.net/cvs');
    process.exit(1);
  }
}

module.exports = connectDB;
