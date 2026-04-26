const express = require('express');
const router = express.Router();
const {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} = require('../controllers/studentController');
const { protect, authorize } = require('../middlewares/authMiddleware');

// Protect all routes below
router.use(protect);

// Admin-only routes
router.post('/', authorize('admin'), createStudent);
router.get('/', authorize('admin'), getStudents);
router.get('/:id', authorize('admin'), getStudentById);
router.put('/:id', authorize('admin'), updateStudent);
router.delete('/:id', authorize('admin'), deleteStudent);

module.exports = router;
