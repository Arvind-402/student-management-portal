
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected.');

    const Student = require('./models/studentModel');

    
    const adminEmail = 'admin@studentportal.com';
    const existingAdmin = await Student.findOne({ email: adminEmail });

    if (!existingAdmin) {
      const admin = new Student({
        name: 'Admin',
        rollNumber: 'ADMIN-001',
        email: adminEmail,
        course: 'Administration',
        age: 30,
        password: 'Admin@123',
        role: 'admin',
        department: 'Management',
      });
      await admin.save();
      console.log('Default Admin created: admin@studentportal.com / Admin@123');
    } else {
      console.log('Admin already exists, skipping.');
    }

    
    const studentsWithoutPassword = await Student.find({
      $or: [
        { password: { $exists: false } },
        { password: null },
        { password: '' }
      ]
    }).select('+password');

    if (studentsWithoutPassword.length > 0) {
      const salt = await bcrypt.genSalt(10);
      const defaultHash = await bcrypt.hash('Student@123', salt);

      for (const s of studentsWithoutPassword) {
        await Student.updateOne(
          { _id: s._id },
          {
            $set: {
              password: defaultHash,
              role: s.role || 'student'
            }
          }
        );
      }
      console.log(`Updated ${studentsWithoutPassword.length} existing students with default password.`);
    } else {
      console.log('All students already have passwords.');
    }

    
    const result = await Student.updateMany(
      { role: { $exists: false } },
      { $set: { role: 'student' } }
    );
    if (result.modifiedCount > 0) {
      console.log(`Set role='student' for ${result.modifiedCount} records.`);
    }

    console.log('Seed complete!');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error.message);
    process.exit(1);
  }
}

seed();
