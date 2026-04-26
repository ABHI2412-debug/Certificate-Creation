const fs = require('fs');
const path = require('path');
const Certificate = require('../models/certificateModel');
const { parseExcelBuffer } = require('../utils/excelParser');
const { generateQRCode, generateCertificatePDF } = require('../utils/pdfGenerator'); // changed import

const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(__dirname, '..', 'uploads', 'certificates');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// GET /api/certificates/:certificateId
async function getCertificateById(req, res, next) {
  try {
    const { certificateId } = req.params;
    const cert = await Certificate.findOne({ certificateId }).lean();
    if (!cert) return res.status(404).json({ message: 'Invalid or unknown certificate' });
    return res.status(200).json({
      certificate: {
        certificateId: cert.certificateId,
        studentName: cert.studentName,
        course: cert.course,
        grade: cert.grade,
        issueDate: cert.issueDate,
        valid: cert.valid,
        pdfUrl: cert.pdfPath ? `${req.protocol}://${req.get('host')}${cert.pdfPath}` : null
      }
    });
  } catch (err) {
    next(err);
  }
}

// POST /api/certificates/bulk-upload
async function bulkUploadCertificates(req, res, next) {
  try {
    if (!req.file || !req.file.buffer) return res.status(400).json({ message: 'Excel file required' });

    const rows = await parseExcelBuffer(req.file.buffer);
    const report = { success: [], failed: [] };

    for (const row of rows) {
      const { studentName, course, certificateId, grade, issueDate, rowNumber, raw } = row;

      if (!studentName || !course || !certificateId) {
        report.failed.push({ row: rowNumber, reason: 'Missing required fields', raw });
        continue;
      }

      const exists = await Certificate.findOne({ certificateId });
      if (exists) {
        report.failed.push({ row: rowNumber, reason: 'Duplicate certificateId', certificateId });
        continue;
      }

      // compute verification URL (points to frontend verify page by default)
      const FRONTEND_URL = process.env.FRONTEND_URL || `http://localhost:3000`;
      const verificationUrl = `${FRONTEND_URL}/verify/${certificateId}`;

      const qrDataUrl = await generateQRCode(verificationUrl);

      // generate and save PDF; generateCertificatePDF returns relative path like '/uploads/certificates/xxx.pdf'
      const savedPdfRelativePath = await generateCertificatePDF({
        studentName,
        course,
        grade,
        certificateId,
        issueDate: issueDate ? new Date(issueDate) : new Date(),
        qrDataUrl
      });

      // create DB record
      const certDoc = await Certificate.create({
        certificateId,
        studentName,
        course,
        grade,
        issueDate: issueDate ? new Date(issueDate) : new Date(),
        pdfPath: savedPdfRelativePath,
        qrCodeData: verificationUrl,
        valid: true
      });

      report.success.push({ row: rowNumber, certificateId, id: certDoc._id });
    }

    return res.status(200).json({ message: 'Import completed', report });
  } catch (err) {
    next(err);
  }
}

// GET /api/certificates - Get all certificates (admin only)
async function getAllCertificates(req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Certificate.countDocuments();
    const certificates = await Certificate.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    res.status(200).json({
      certificates: certificates.map(cert => ({
        _id: cert._id,
        certificateId: cert.certificateId,
        studentName: cert.studentName,
        course: cert.course,
        grade: cert.grade,
        issueDate: cert.issueDate,
        valid: cert.valid,
        pdfPath: cert.pdfPath,
        qrCodeData: cert.qrCodeData
      })),
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalCertificates: total,
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });
  } catch (err) {
    next(err);
  }
}

// POST /api/certificates - Create a single certificate
async function createCertificate(req, res, next) {
  try {
    const { studentName, course, certificateId, grade, issueDate } = req.body;

    if (!studentName || !course || !certificateId) {
      return res.status(400).json({ message: 'Student name, course, and certificate ID are required' });
    }

    const exists = await Certificate.findOne({ certificateId });
    if (exists) {
      return res.status(400).json({ message: 'Certificate ID already exists' });
    }

    // Generate QR code
    const FRONTEND_URL = process.env.FRONTEND_URL || `http://localhost:3000`;
    const verificationUrl = `${FRONTEND_URL}/verify/${certificateId}`;
    const qrDataUrl = await generateQRCode(verificationUrl);

    // Generate PDF
    const savedPdfRelativePath = await generateCertificatePDF({
      studentName,
      course,
      grade,
      certificateId,
      issueDate: issueDate ? new Date(issueDate) : new Date(),
      qrDataUrl
    });

    const certificate = await Certificate.create({
      certificateId,
      studentName,
      course,
      grade,
      issueDate: issueDate ? new Date(issueDate) : new Date(),
      pdfPath: savedPdfRelativePath,
      qrCodeData: verificationUrl,
      valid: true
    });

    res.status(201).json({
      message: 'Certificate created successfully',
      certificate: {
        _id: certificate._id,
        certificateId: certificate.certificateId,
        studentName: certificate.studentName,
        course: certificate.course,
        grade: certificate.grade,
        issueDate: certificate.issueDate,
        valid: certificate.valid,
        pdfPath: certificate.pdfPath,
        qrCodeData: certificate.qrCodeData
      }
    });
  } catch (err) {
    next(err);
  }
}

// PUT /api/certificates/:id - Update certificate
async function updateCertificate(req, res, next) {
  try {
    const { id } = req.params;
    const updates = req.body;

    const certificate = await Certificate.findById(id);
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    // If certificateId is being updated, check for duplicates
    if (updates.certificateId && updates.certificateId !== certificate.certificateId) {
      const exists = await Certificate.findOne({ certificateId: updates.certificateId });
      if (exists) {
        return res.status(400).json({ message: 'Certificate ID already exists' });
      }
    }

    Object.assign(certificate, updates);
    await certificate.save();

    res.status(200).json({
      message: 'Certificate updated successfully',
      certificate
    });
  } catch (err) {
    next(err);
  }
}

// DELETE /api/certificates/:id - Delete certificate
async function deleteCertificate(req, res, next) {
  try {
    const { id } = req.params;

    const certificate = await Certificate.findById(id);
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    // Delete associated PDF file if it exists
    if (certificate.pdfPath) {
      const pdfPath = path.join(__dirname, '..', certificate.pdfPath);
      if (fs.existsSync(pdfPath)) {
        fs.unlinkSync(pdfPath);
      }
    }

    await Certificate.findByIdAndDelete(id);

    res.status(200).json({ message: 'Certificate deleted successfully' });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getCertificateById,
  bulkUploadCertificates,
  getAllCertificates,
  createCertificate,
  updateCertificate,
  deleteCertificate
};
