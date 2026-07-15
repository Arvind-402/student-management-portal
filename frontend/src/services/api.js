import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://student-management-portal-xfkn.onrender.com/api'
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      const path = window.location.pathname;
      if (!path.includes('/login') && path !== '/') {
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);

export const getStudents = () => API.get('/students');
export const getStudentById = (id) => API.get(`/students/${id}`);
export const createStudent = (studentData) => API.post('/students', studentData);
export const updateStudent = (id, studentData) => API.put(`/students/${id}`, studentData);
export const deleteStudent = (id) => API.delete(`/students/${id}`);

export const loginAdmin = (credentials) => API.post('/auth/admin/login', credentials);
export const loginStudent = (credentials) => API.post('/auth/student/login', credentials);
export const getMe = () => API.get('/auth/me');
export const changePassword = (data) => API.put('/auth/change-password', data);
export const updateProfile = (data) => API.put('/auth/profile', data);

export default API;
