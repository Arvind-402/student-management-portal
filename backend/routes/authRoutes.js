const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  loginAdmin,
  loginStudent,
  getMe,
  changePassword,
  updateProfile,
} = require('../controllers/authController');


router.post('/admin/login', loginAdmin);
router.post('/student/login', loginStudent);


router.get('/me', protect, getMe);
router.put('/change-password', protect, changePassword);
router.put('/profile', protect, updateProfile);

module.exports = router;
