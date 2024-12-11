// src/utils/axiosConfig.ts
import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,  // Using Vite's environment variable
  headers: {
    'Content-Type': 'application/json',
    // Add other headers if necessary, like authorization
  },
});

// Optionally add interceptors for adding tokens or handling errors globally
axiosInstance.interceptors.request.use(
  (config) => {
    // Add Authorization token if it exists in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global error responses, like 401 (Unauthorized)
    if (error.response?.status === 401) {
      console.log('Unauthorized, please login.');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
