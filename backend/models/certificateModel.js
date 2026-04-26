const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  certificateId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  studentName: { 
    type: String, 
    required: true 
  },
  course: { 
    type: String, 
    required: true 
  },
  grade: { 
    type: String 
  },
  issueDate: { 
    type: Date, 
    required: true,
    default: Date.now
  },
  pdfPath: { 
    type: String  // Relative path like '/uploads/certificates/xxx.pdf'
  },
  qrCodeData: { 
    type: String  // The verification URL
  },
  valid: { 
    type: Boolean, 
    default: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Add index for faster searches
certificateSchema.index({ certificateId: 1 });
certificateSchema.index({ studentName: 1 });

module.exports = mongoose.model('Certificate', certificateSchema);