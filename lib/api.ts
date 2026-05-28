import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Return structured error message
    const message = error.response?.data?.error || 'An unexpected error occurred';
    return Promise.reject(new Error(message));
  }
);
