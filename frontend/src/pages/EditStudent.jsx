import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, UserCog } from 'lucide-react';
import { getStudentById, updateStudent } from '@/services/api';
import StudentForm from '@/components/StudentForm';
import { useToast } from '@/components/ui/Toast';
import { Skeleton } from '@/components/ui/Skeleton';

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [student, setStudent]   = React.useState(null);
  const [isFetching, setFetching] = React.useState(true);
  const [isSaving, setSaving]   = React.useState(false);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await getStudentById(id);
        setStudent(data);
      } catch {
        toast({ message: 'Failed to retrieve student profile details.', type: 'error' });
      } finally { 
        setFetching(false); 
      }
    })();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      setSaving(true);
      await updateStudent(id, formData);
      toast({ message: 'Student profile updated successfully!', type: 'success' });
      // Minor delay to let toast show before redirect
      setTimeout(() => navigate('/admin/dashboard'), 350);
    } catch (err) {
      toast({ message: err.response?.data?.message || 'Failed to update student profile.', type: 'error' });
    } finally { 
      setSaving(false); 
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
        <span className="text-slate-800">Edit Student</span>
      </nav>

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center text-violet-600 shadow-sm shadow-violet-500/5 animate-pulse">
          <UserCog size={18} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-900 leading-tight">Edit Profile</h2>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Modify this student record's details and properties.
          </p>
        </div>
      </div>

      {isFetching ? (
        <div className="space-y-6 p-8 bg-white rounded-2xl border border-slate-100 shadow-premium">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-11 w-full" />
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-50">
            <Skeleton className="h-9 w-20" />
            <Skeleton className="h-9 w-28" />
          </div>
        </div>
      ) : student ? (
        <StudentForm
          initialData={student}
          onSubmit={handleSubmit}
          submitLabel="Save Settings"
          isLoading={isSaving}
        />
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-12 text-center">
          <p className="text-slate-500 text-sm font-semibold">Student profile not found.</p>
        </div>
      )}
    </motion.div>
  );
};

export default EditStudent;
