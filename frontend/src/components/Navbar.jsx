import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, Bell, Search, GraduationCap, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Navbar = ({ onMenuClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/dashboard')) return 'Dashboard';
    if (path.includes('/add')) return 'Add New Student';
    if (path.includes('/edit')) return 'Edit Student Profile';
    return 'StudentPortal';
  };

  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'AD';

  return (
    <header className="glass-header sticky top-0 z-30 w-full h-16 flex items-center px-4 sm:px-6 lg:px-8">
      <div className="w-full flex items-center justify-between">
        
        {}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors focus-visible:ring-2 focus-visible:ring-brand-500"
            aria-label="Open Sidebar"
          >
            <Menu size={20} />
          </button>
          
          {}
          <div className="lg:hidden h-8 w-8 rounded-xl bg-brand-600 flex items-center justify-center shadow-sm mr-1">
            <GraduationCap size={16} className="text-white" />
          </div>

          <h1 className="text-sm font-semibold text-slate-800 tracking-tight sm:text-base">
            {getPageTitle()}
          </h1>
        </div>

        {}
        <div className="flex items-center gap-3">
          
          {}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-100 bg-slate-50 text-slate-400 hover:bg-slate-100/50 cursor-pointer transition-colors">
            <Search size={14} />
            <span className="text-xs font-medium">Search Portal...</span>
            <kbd className="text-[10px] bg-white border border-slate-200 px-1.5 py-0.5 rounded font-mono text-slate-500">⌘K</kbd>
          </div>

          {}
          <button className="relative p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors">
            <Bell size={18} />
            <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-brand-500 ring-2 ring-white" />
          </button>

          {}
          <div className="flex items-center gap-2 pl-1 border-l border-slate-100">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-brand-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
              {initials}
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-semibold text-slate-700 leading-tight">{user?.name || 'Admin'}</span>
              <span className="text-[10px] text-slate-400 font-medium leading-none capitalize">{user?.role || 'Admin'}</span>
            </div>
          </div>

          {}
          <button
            onClick={handleLogout}
            className="p-2 rounded-xl text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
            title="Sign Out"
          >
            <LogOut size={18} />
          </button>
        </div>

      </div>
    </header>
  );
};

export default Navbar;
