import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import Welcome from '@/pages/Welcome';
import AdminLogin from '@/pages/AdminLogin';
import StudentLogin from '@/pages/StudentLogin';
import Home from '@/pages/Home';
import AddStudent from '@/pages/AddStudent';
import EditStudent from '@/pages/EditStudent';
import StudentDashboard from '@/pages/StudentDashboard';
import Unauthorized from '@/pages/Unauthorized';
import { ToastProvider } from '@/components/ui/Toast';


function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-h-screen lg:pl-64 transition-all duration-200">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route path="dashboard" element={<Home />} />
            <Route path="students/add" element={<AddStudent />} />
            <Route path="students/edit/:id" element={<EditStudent />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}


function PublicOnlyRoute({ children }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="h-10 w-10 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to={isAdmin ? '/admin/dashboard' : '/student/dashboard'} replace />;
  }

  return children;
}

function AppRoutes() {
  return (
    <Routes>
      {}
      <Route path="/" element={<PublicOnlyRoute><Welcome /></PublicOnlyRoute>} />
      <Route path="/admin/login" element={<PublicOnlyRoute><AdminLogin /></PublicOnlyRoute>} />
      <Route path="/student/login" element={<PublicOnlyRoute><StudentLogin /></PublicOnlyRoute>} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/admin/*" element={<AdminLayout />} />
      </Route>

      {}
      <Route element={<ProtectedRoute allowedRoles={['student']} />}>
        <Route path="/student/dashboard" element={<StudentDashboard />} />
      </Route>

      {}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastProvider>
          <AppRoutes />
        </ToastProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
