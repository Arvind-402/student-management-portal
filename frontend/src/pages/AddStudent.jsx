import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, UserPlus } from 'lucide-react';
import { createStudent } from '@/services/api';
import StudentForm from '@/components/StudentForm';
import { useToast } from '@/components/ui/Toast';

const AddStudent = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (formData) => {
    try {
      setIsLoading(true);
      await createStudent(formData);
      toast({ message: 'Student profile created successfully!', type: 'success' });
      // Minor delay to let toast show before redirect
      setTimeout(() => navigate('/admin/dashboard'), 350);
    } catch (err) {
      toast({ message: err.response?.data?.message || 'Failed to add student profile.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="max-w-2xl mx-auto space-y-6"
    >
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
        <Link to="/admin/dashboard" className="hover:text-slate-700 transition-colors">Dashboard</Link>
        <ChevronRight size={13} />
        <span className="text-slate-800">Add Student</span>
      </nav>

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 shadow-sm shadow-brand-500/5 animate-pulse">
          <UserPlus size={18} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-900 leading-tight">Register New Profile</h2>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Register a student profile with full course enrollment data.
          </p>
        </div>
      </div>

      <StudentForm onSubmit={handleSubmit} submitLabel="Register Student" isLoading={isLoading} />
    </motion.div>
  );
};

export default AddStudent;
