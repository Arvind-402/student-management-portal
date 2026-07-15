const Student = require('../models/studentModel');

// @desc    Create new student
// @route   POST /api/students
// @access  Private/Admin
const createStudent = async (req, res, next) => {
  try {
    const { name, rollNumber, email, course, age, department, phone, address, password } = req.body;

    // Check all required fields present
    if (!name || !rollNumber || !email || !course || age === undefined) {
      return res.status(400).json({ message: 'All fields are required (name, rollNumber, email, course, age)' });
    }

    // Check unique roll number
    const existingRoll = await Student.findOne({ rollNumber });
    if (existingRoll) {
      return res.status(400).json({ message: 'Roll number must be unique' });
    }

    // Check unique email
    const existingEmail = await Student.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email must be unique' });
    }

    const student = new Student({
      name,
      rollNumber,
      email,
      course,
      age,
      password: password || 'Student@123', // Default password if not provided
      role: 'student',
      department: department || '',
      phone: phone || '',
      address: address || '',
    });

    const savedStudent = await student.save();

    // Return without password
    const result = savedStudent.toObject();
    delete result.password;

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all students
// @route   GET /api/students
// @access  Private
const getStudents = async (req, res, next) => {
  try {
    const students = await Student.find({ role: 'student' }).sort({ createdAt: -1 });
    res.status(200).json(students);
  } catch (error) {
    next(error);
  }
};

// @desc    Get student by ID
// @route   GET /api/students/:id
// @access  Private
const getStudentById = async (req, res, next) => {
  try {
    // Check if the user is authorized to view this profile
    if (req.user.role !== 'admin' && req.user._id.toString() !== req.params.id) {
      return res.status(403).json({ message: 'Access denied. You can only view your own profile.' });
    }

    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    next(error);
  }
};

// @desc    Update student details
// @route   PUT /api/students/:id
// @access  Private/Admin
const updateStudent = async (req, res, next) => {
  try {
    const { name, rollNumber, email, course, age, department, phone, address } = req.body;

    // Check all required fields present
    if (!name || !rollNumber || !email || !course || age === undefined) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Check unique roll number if changed
    if (rollNumber !== student.rollNumber) {
      const existingRoll = await Student.findOne({ rollNumber });
      if (existingRoll) {
        return res.status(400).json({ message: 'Roll number must be unique' });
      }
    }

    // Check unique email if changed
    if (email !== student.email) {
      const existingEmail = await Student.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ message: 'Email must be unique' });
      }
    }

    student.name = name;
    student.rollNumber = rollNumber;
    student.email = email;
    student.course = course;
    student.age = age;
    if (department !== undefined) student.department = department;
    if (phone !== undefined) student.phone = phone;
    if (address !== undefined) student.address = address;

    const updatedStudent = await student.save();
    res.status(200).json(updatedStudent);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete student
// @route   DELETE /api/students/:id
// @access  Private/Admin
const deleteStudent = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    await Student.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent
};
