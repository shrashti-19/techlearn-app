// src/api/authService.js
import API from './client';

// Auth services
export const login = (credentials) => API.post('/auth/login', credentials);
export const register = (userData) => API.post('/auth/register', userData);
export const googleLogin = (token) => API.post('/auth/google', { token });

// User services
export const getCurrentUser = () => API.get('/auth/me');