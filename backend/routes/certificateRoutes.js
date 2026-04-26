const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/authMiddleware');
const multer = require('multer');

const {
  getCertificateById,
  bulkUploadCertificates,
  getAllCertificates,
  createCertificate,
  updateCertificate,
  deleteCertificate
} = require('../controllers/certificateController');

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Public route to get certificate by certificateId
router.get('/public/:certificateId', getCertificateById);

// Protected admin routes for certificate management
router.use(protect);
router.use(authorize('admin'));

// Certificate CRUD operations
router.route('/')
  .get(getAllCertificates)
  .post(createCertificate);

router.route('/:id')
  .put(updateCertificate)
  .delete(deleteCertificate);

// Bulk upload certificates using Excel file
router.post('/bulk-upload', upload.single('file'), bulkUploadCertificates);

module.exports = router;