import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldX, ArrowLeft, Home } from 'lucide-react';

const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center max-w-md"
      >
        <div className="h-20 w-20 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center mx-auto mb-6">
          <ShieldX size={36} className="text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Access Denied</h1>
        <p className="text-sm text-slate-500 mb-8 leading-relaxed">
          You don't have permission to access this page. Please sign in with an account that has the required access level.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 text-white text-sm font-semibold shadow-lg shadow-brand-500/20 hover:shadow-brand-500/30 transition-all"
          >
            <Home size={16} />
            Go to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Unauthorized;
