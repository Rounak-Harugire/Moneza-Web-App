import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://moneza-backend-dlhl.onrender.com/api/v1',
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.error || 'An unexpected error occurred';

    return Promise.reject(new Error(message));
  }
);