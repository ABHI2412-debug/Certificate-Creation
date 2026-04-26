const QRCode = require('qrcode');
const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');

/**
 * Generate QR Code as Data URL for a verification URL
 * @param {string} verificationUrl
 * @returns {Promise<string>} - Data URL of the QR code image
 */
const generateQRCode = async (verificationUrl) => {
  try {
    const qrDataUrl = await QRCode.toDataURL(verificationUrl);
    return qrDataUrl;
  } catch (error) {
    throw new Error('Failed to generate QR Code: ' + (error && error.message ? error.message : error));
  }
};

/**
 * Generate high-quality PDF certificate and save to uploads folder
 * @param {Object} opts - { studentName, course, grade, certificateId, issueDate, qrDataUrl }
 * @returns {Promise<string>} - Relative URL path where PDF is saved (for usage by backend routes)
 */
const generateCertificatePDF = (opts) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { studentName, course, grade, certificateId, issueDate, qrDataUrl } = opts;

      const doc = new PDFDocument({
        size: 'A4',
        margin: 50
      });

      // Determine upload directory
      const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(__dirname, '..', 'uploads', 'certificates');
      if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

      const filename = `${certificateId.replace(/[^a-z0-9-_]/gi, '_')}.pdf`;
      const pdfPath = path.join(UPLOAD_DIR, filename);

      // create write stream and pipe
      const writeStream = fs.createWriteStream(pdfPath);
      doc.pipe(writeStream);

      // Certificate layout
      doc.fontSize(26).text('Certificate of Completion', { align: 'center' });
      doc.moveDown(2);

      doc.fontSize(14).text('This certifies that', { align: 'center' });
      doc.moveDown();
      doc.fontSize(22).text(studentName, { align: 'center', underline: true });
      doc.moveDown(1);

      doc.fontSize(16).text(`has successfully completed the course:`, { align: 'center' });
      doc.moveDown(0.5);
      doc.fontSize(18).text(course, { align: 'center', underline: true });
      doc.moveDown(1);

      if (grade) {
        doc.fontSize(14).text(`Grade: ${grade}`, { align: 'center' });
        doc.moveDown(1);
      }

      doc.fontSize(12).text(`Certificate ID: ${certificateId}`, { align: 'left' });
      const issueDateString = issueDate ? new Date(issueDate).toLocaleDateString() : new Date().toLocaleDateString();
      doc.fontSize(12).text(`Issue Date: ${issueDateString}`, { align: 'left' });

      // Add QR code image at bottom right if provided
      if (qrDataUrl) {
        const matches = qrDataUrl.match(/^data:image\/png;base64,(.+)/);
        if (matches) {
          const imgBuffer = Buffer.from(matches[1], 'base64');
          const imgWidth = 100;
          const x = doc.page.width - imgWidth - 50;
          const y = doc.page.height - imgWidth - 80;
          doc.image(imgBuffer, x, y, { width: imgWidth });
        }
      }

      doc.end();

      writeStream.on('finish', () => {
        // Return relative path that can be served by express static '/uploads/...'
        const relativePath = `/uploads/certificates/${filename}`;
        resolve(relativePath);
      });

      writeStream.on('error', (err) => {
        reject(err);
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  generateQRCode,
  generateCertificatePDF
};
