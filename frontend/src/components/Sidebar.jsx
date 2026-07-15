import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { GraduationCap, LayoutDashboard, UserPlus, X, LogOut, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    onClose();
    logout();
    navigate('/', { replace: true });
  };

  const links = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/admin/students/add', label: 'Add Student', icon: UserPlus, end: false },
  ];

  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'AD';

  const sidebarContent = (
    <div className="h-full flex flex-col bg-white border-r border-slate-100 px-4 py-6">
      {}
      <div className="flex items-center justify-between mb-6 px-2">
        <Link to="/admin/dashboard" className="flex items-center gap-2.5" onClick={onClose}>
          <div className="h-9 w-9 rounded-xl bg-brand-600 flex items-center justify-center shadow-md shadow-brand-500/10">
            <GraduationCap size={18} className="text-white" />
          </div>
          <span className="font-bold text-slate-900 text-base tracking-tight">
            Student<span className="text-brand-600">Portal</span>
          </span>
        </Link>
        {}
        <button
          onClick={onClose}
          className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {}
      <div className="mx-1 mb-6 p-3 rounded-xl bg-slate-50 border border-slate-100">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold shadow-md shadow-brand-500/20">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-800 truncate">{user?.name || 'Admin'}</p>
            <div className="flex items-center gap-1">
              <ShieldCheck size={12} className="text-brand-500" />
              <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Administrator</span>
            </div>
          </div>
        </div>
      </div>

      {}
      <nav className="flex-1 space-y-1.5 px-1">
        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">Menu</p>
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-brand-600 bg-brand-50/70 shadow-sm shadow-brand-500/5'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={18} className={isActive ? 'text-brand-600' : 'text-slate-400'} />
                  {link.label}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {}
      <div className="border-t border-slate-100 pt-4 px-1">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:text-red-600 hover:bg-red-50 transition-all w-full"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-64 max-w-full shadow-2xl"
            >
              {sidebarContent}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {}
      <aside className="hidden lg:block fixed inset-y-0 left-0 z-20 w-64 shadow-sm">
        {sidebarContent}
      </aside>
    </>
  );
};

export default Sidebar;
