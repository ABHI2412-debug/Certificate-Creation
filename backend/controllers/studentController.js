const Student = require('../models/Student');

// @desc    Create a new student
// @route   POST /api/students
// @access  Admin
const createStudent = async (req, res, next) => {
  try {
    const { studentId, name, email, course, grade } = req.body;

    if (!studentId || !name || !course || !grade) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const existingStudent = await Student.findOne({ studentId });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student ID already exists' });
    }

    const student = await Student.create({ studentId, name, email, course, grade });
    res.status(201).json(student);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all students
// @route   GET /api/students
// @access  Admin
const getStudents = async (req, res, next) => {
  try {
    const students = await Student.find({});
    res.json(students);
  } catch (error) {
    next(error);
  }
};

// @desc    Get a student by ID
// @route   GET /api/students/:id
// @access  Admin
const getStudentById = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a student
// @route   PUT /api/students/:id
// @access  Admin
const updateStudent = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const { studentId, name, email, course, grade } = req.body;

    student.studentId = studentId || student.studentId;
    student.name = name || student.name;
    student.email = email || student.email;
    student.course = course || student.course;
    student.grade = grade || student.grade;

    const updatedStudent = await student.save();
    res.json(updatedStudent);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a student
// @route   DELETE /api/students/:id
// @access  Admin
const deleteStudent = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    await Student.deleteOne({ _id: req.params.id });

    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
