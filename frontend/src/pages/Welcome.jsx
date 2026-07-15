import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, ShieldCheck, BookOpen, ArrowRight, Sparkles } from 'lucide-react';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="relative lg:w-[45%] bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 flex flex-col justify-center items-center p-8 sm:p-12 lg:p-16 overflow-hidden"
      >
        {}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-violet-600/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tl from-indigo-600/15 to-transparent rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-600/5 to-blue-600/5 rounded-full blur-3xl" />

          {}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} />
        </div>

        {}
        <div className="relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="h-20 w-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center mb-8 shadow-2xl"
          >
            <GraduationCap size={40} className="text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4"
          >
            Student
            <span className="block bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              Management Portal
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-md mb-8"
          >
            Manage student records, registrations, academics and personal information through one modern, secure platform.
          </motion.p>

          {}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            {['Secure Auth', 'Real-time', 'Analytics', 'Role-Based'].map((label) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 text-slate-300 border border-white/10 backdrop-blur-sm"
              >
                <Sparkles size={12} className="text-violet-400" />
                {label}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex-1 flex flex-col justify-center items-center p-8 sm:p-12 lg:p-16 bg-slate-50"
      >
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Select Your Portal
            </h2>
            <p className="text-sm text-slate-500 mb-8">
              Choose how you want to access the system
            </p>
          </motion.div>

          {}
          <div className="space-y-4">
            {}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ y: -2, boxShadow: '0 8px 30px -8px rgba(124, 58, 237, 0.15)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/admin/login')}
              className="w-full group relative flex items-start gap-4 p-5 rounded-2xl border border-slate-200 bg-white hover:border-brand-200 transition-all duration-200 text-left cursor-pointer"
              id="admin-portal-btn"
            >
              <div className="shrink-0 h-12 w-12 rounded-xl bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-brand-500/20">
                <ShieldCheck size={22} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-slate-900 mb-1 flex items-center gap-2">
                  Admin Portal
                  <ArrowRight size={16} className="text-slate-400 group-hover:text-brand-500 group-hover:translate-x-1 transition-all duration-200" />
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Manage all student records, analytics, registrations and system administration.
                </p>
              </div>
            </motion.button>

            {}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ y: -2, boxShadow: '0 8px 30px -8px rgba(16, 185, 129, 0.15)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/student/login')}
              className="w-full group relative flex items-start gap-4 p-5 rounded-2xl border border-slate-200 bg-white hover:border-emerald-200 transition-all duration-200 text-left cursor-pointer"
              id="student-portal-btn"
            >
              <div className="shrink-0 h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <BookOpen size={22} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-slate-900 mb-1 flex items-center gap-2">
                  Student Portal
                  <ArrowRight size={16} className="text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all duration-200" />
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Access your own profile, academic details and account securely.
                </p>
              </div>
            </motion.button>
          </div>

          {}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-center text-xs text-slate-400 mt-10"
          >
            &copy; {new Date().getFullYear()} StudentPortal &mdash; Secure Student Management System
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default Welcome;
