import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://moneza-backend-dlhl.onrender.com/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("FULL ERROR:", error?.response);

    const message =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      'An unexpected error occurred';

    return Promise.reject(new Error(message));
  }
);