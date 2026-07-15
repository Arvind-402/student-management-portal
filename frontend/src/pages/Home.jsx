import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getStudents, deleteStudent as deleteStudentAPI } from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import StudentTable from '@/components/StudentTable';
import {
  Users, UserPlus, GraduationCap, BookOpen, Search,
  ChevronDown, ArrowUpDown, AlertCircle, RefreshCw, X, Filter
} from 'lucide-react';

const Home = () => {
  const { user } = useAuth();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filterCourse, setFilterCourse] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const fetchStudents = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getStudents();
      setStudents(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteStudentAPI(id);
      setStudents(prev => prev.filter(s => s._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete student');
    }
  };

  
  const courses = useMemo(() => {
    const unique = [...new Set(students.map(s => s.course).filter(Boolean))];
    return unique.sort();
  }, [students]);

  
  const filteredStudents = useMemo(() => {
    let list = [...students];

    
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(s =>
        s.name?.toLowerCase().includes(q) ||
        s.email?.toLowerCase().includes(q) ||
        s.rollNumber?.toLowerCase().includes(q) ||
        s.course?.toLowerCase().includes(q)
      );
    }

    
    if (filterCourse !== 'all') {
      list = list.filter(s => s.course === filterCourse);
    }

    
    switch (sortBy) {
      case 'newest': list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); break;
      case 'oldest': list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); break;
      case 'name-asc': list.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'name-desc': list.sort((a, b) => b.name.localeCompare(a.name)); break;
      default: break;
    }

    return list;
  }, [students, searchQuery, sortBy, filterCourse]);

  
  const stats = [
    {
      label: 'Total Students',
      value: students.length,
      icon: Users,
      color: 'brand',
      gradient: 'from-brand-500 to-indigo-600',
    },
    {
      label: 'Courses',
      value: courses.length,
      icon: BookOpen,
      color: 'emerald',
      gradient: 'from-emerald-500 to-teal-600',
    },
    {
      label: 'Recent (7d)',
      value: students.filter(s => {
        const d = new Date(s.createdAt);
        return (Date.now() - d.getTime()) < 7 * 24 * 60 * 60 * 1000;
      }).length,
      icon: GraduationCap,
      color: 'amber',
      gradient: 'from-amber-500 to-orange-600',
    },
  ];

  return (
    <div className="space-y-6">
      {}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Welcome back, {user?.name?.split(' ')[0] || 'Admin'}!
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Here's an overview of your student management system
          </p>
        </div>
        <Link
          to="/admin/students/add"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 text-white text-sm font-semibold shadow-lg shadow-brand-500/20 hover:shadow-brand-500/30 transition-all"
        >
          <UserPlus size={16} />
          Add Student
        </Link>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -2 }}
              className="relative overflow-hidden bg-white rounded-2xl border border-slate-200 p-5 shadow-card"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-slate-500 font-medium mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-slate-900">{loading ? '—' : stat.value}</p>
                </div>
                <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg shadow-${stat.color}-500/20`}>
                  <Icon size={18} className="text-white" />
                </div>
              </div>
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient}`} />
            </motion.div>
          );
        })}
      </div>

      {/* Error */}
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-200"
        >
          <AlertCircle size={18} className="text-red-500 shrink-0" />
          <p className="text-sm text-red-700 flex-1">{error}</p>
          <button onClick={fetchStudents} className="flex items-center gap-1.5 text-sm text-red-600 font-medium hover:text-red-800">
            <RefreshCw size={14} />
            Retry
          </button>
        </motion.div>
      )}

      {/* Search & Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl border border-slate-200 shadow-card p-4"
      >
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, email, roll number, or course..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="relative">
            <ArrowUpDown size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none pl-9 pr-8 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name-asc">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          {/* Filter toggle */}
          {courses.length > 0 && (
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                showFilters || filterCourse !== 'all'
                  ? 'border-brand-200 bg-brand-50 text-brand-700'
                  : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Filter size={14} />
              Filter
            </button>
          )}
        </div>

        {/* Course Filter Chips */}
        <AnimatePresence>
          {showFilters && courses.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-slate-100">
                <button
                  onClick={() => setFilterCourse('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    filterCourse === 'all'
                      ? 'bg-brand-100 text-brand-700 border border-brand-200'
                      : 'bg-slate-100 text-slate-600 border border-transparent hover:bg-slate-200'
                  }`}
                >
                  All Courses
                </button>
                {courses.map(c => (
                  <button
                    key={c}
                    onClick={() => setFilterCourse(c)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      filterCourse === c
                        ? 'bg-brand-100 text-brand-700 border border-brand-200'
                        : 'bg-slate-100 text-slate-600 border border-transparent hover:bg-slate-200'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Student Table */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
          <div className="h-10 w-10 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-500 font-medium">Loading students...</p>
        </div>
      ) : filteredStudents.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-2xl border border-slate-200 p-12 text-center"
        >
          <div className="h-16 w-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <Users size={28} className="text-slate-400" />
          </div>
          <h3 className="text-base font-semibold text-slate-700 mb-1">
            {searchQuery || filterCourse !== 'all' ? 'No students found' : 'No students yet'}
          </h3>
          <p className="text-sm text-slate-500 mb-4">
            {searchQuery || filterCourse !== 'all'
              ? 'Try adjusting your search or filter criteria'
              : 'Get started by adding your first student'}
          </p>
          {!searchQuery && filterCourse === 'all' && (
            <Link
              to="/admin/students/add"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 transition-colors"
            >
              <UserPlus size={16} />
              Add First Student
            </Link>
          )}
        </motion.div>
      ) : (
        <StudentTable
          students={filteredStudents}
          onDelete={handleDelete}
          basePath="/admin/students"
        />
      )}
    </div>
  );
};

export default Home;
