import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { changePassword as changePasswordAPI, updateProfile as updateProfileAPI } from '@/services/api';
import {
  User, Mail, BookOpen, Hash, Calendar, Building2, Phone, MapPin,
  Lock, Save, Loader2, CheckCircle2, AlertCircle, GraduationCap, LogOut, Edit3
} from 'lucide-react';

const StudentDashboard = () => {
  const { user, logout, login } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    phone: user?.phone || '',
    address: user?.address || '',
    department: user?.department || '',
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [toast, setToast] = useState(null);

  
  React.useEffect(() => {
    if (user) {
      setProfileForm({
        phone: user.phone || '',
        address: user.address || '',
        department: user.department || '',
      });
    }
  }, [user]);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const handleProfileSave = async () => {
    setProfileLoading(true);
    try {
      const res = await updateProfileAPI(profileForm);
      
      const token = localStorage.getItem('token');
      login({ ...res.data, token });
      setIsEditingProfile(false);
      showToast('success', 'Profile updated successfully');
    } catch (err) {
      showToast('error', err.response?.data?.message || 'Failed to update profile');
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showToast('error', 'New passwords do not match');
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      showToast('error', 'Password must be at least 6 characters');
      return;
    }
    setPasswordLoading(true);
    try {
      await changePasswordAPI({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      showToast('success', 'Password changed successfully');
    } catch (err) {
      showToast('error', err.response?.data?.message || 'Failed to change password');
    } finally {
      setPasswordLoading(false);
    }
  };

  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'ST';

  const profileFields = [
    { icon: User, label: 'Full Name', value: user?.name },
    { icon: Hash, label: 'Roll Number', value: user?.rollNumber },
    { icon: Mail, label: 'Email Address', value: user?.email },
    { icon: BookOpen, label: 'Course', value: user?.course },
    { icon: Calendar, label: 'Age', value: user?.age },
    { icon: Building2, label: 'Department', value: user?.department || 'Not set', editable: true, key: 'department' },
    { icon: Phone, label: 'Phone', value: user?.phone || 'Not set', editable: true, key: 'phone' },
    { icon: MapPin, label: 'Address', value: user?.address || 'Not set', editable: true, key: 'address' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-sm font-medium ${
              toast.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
            }`}
          >
            {toast.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {}
      <header className="glass-header sticky top-0 z-30 h-16 flex items-center px-6 lg:px-8 justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md shadow-emerald-500/20">
            <GraduationCap size={18} className="text-white" />
          </div>
          <span className="font-bold text-slate-900 text-base tracking-tight">
            Student<span className="text-emerald-600">Portal</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 pr-3 border-r border-slate-200">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-xs font-bold">
              {initials}
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-xs font-semibold text-slate-700">{user?.name}</span>
              <span className="text-[10px] text-slate-400">Student</span>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors font-medium"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {}
      <div className="max-w-4xl mx-auto p-6 lg:p-8">
        {}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold text-slate-900 mb-1">
            Welcome back, {user?.name?.split(' ')[0]}!
          </h1>
          <p className="text-sm text-slate-500">View and manage your student profile</p>
        </motion.div>

        {}
        <div className="flex gap-1 mb-6 bg-slate-100 rounded-xl p-1 w-fit">
          {[
            { id: 'profile', label: 'My Profile' },
            { id: 'security', label: 'Security' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
                {}
                <div className="relative h-32 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500">
                  <div className="absolute -bottom-10 left-6">
                    <div className="h-20 w-20 rounded-2xl bg-white p-1 shadow-lg">
                      <div className="h-full w-full rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-xl font-bold">
                        {initials}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-14 px-6 pb-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">{user?.name}</h2>
                      <p className="text-sm text-slate-500">{user?.course} &middot; {user?.rollNumber}</p>
                    </div>
                    <button
                      onClick={() => setIsEditingProfile(!isEditingProfile)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-brand-600 hover:bg-brand-50 transition-colors"
                    >
                      <Edit3 size={14} />
                      {isEditingProfile ? 'Cancel' : 'Edit'}
                    </button>
                  </div>

                  {}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {profileFields.map((field) => {
                      const Icon = field.icon;
                      return (
                        <div
                          key={field.label}
                          className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100"
                        >
                          <div className="h-9 w-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0">
                            <Icon size={16} className="text-slate-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-slate-400 font-medium mb-0.5">{field.label}</p>
                            {isEditingProfile && field.editable ? (
                              <input
                                type="text"
                                value={profileForm[field.key]}
                                onChange={(e) => setProfileForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                                className="w-full px-2 py-1 rounded-lg border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                placeholder={`Enter ${field.label.toLowerCase()}`}
                              />
                            ) : (
                              <p className="text-sm font-medium text-slate-800 truncate">{field.value}</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {}
                  {isEditingProfile && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 flex justify-end"
                    >
                      <button
                        onClick={handleProfileSave}
                        disabled={profileLoading}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-semibold shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all disabled:opacity-70"
                      >
                        {profileLoading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                        Save Changes
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'security' && (
            <motion.div
              key="security"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center">
                    <Lock size={18} className="text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">Change Password</h3>
                    <p className="text-xs text-slate-500">Update your account password</p>
                  </div>
                </div>

                <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Current Password</label>
                    <input
                      type="password"
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">New Password</label>
                    <input
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                      required
                      minLength={6}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm New Password</label>
                    <input
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                      required
                      minLength={6}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={passwordLoading}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-semibold shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all disabled:opacity-70"
                  >
                    {passwordLoading ? <Loader2 size={16} className="animate-spin" /> : <Lock size={16} />}
                    Update Password
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StudentDashboard;
