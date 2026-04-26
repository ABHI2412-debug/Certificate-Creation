const QRCode = require('qrcode');

async function generateQRCode(verificationUrl) {
  return QRCode.toDataURL(verificationUrl);
}

module.exports = { generateQRCode };
