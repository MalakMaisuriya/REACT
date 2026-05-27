import axios from 'axios';

// Store reference – will be set after store initialisation
let storeRef = null;

export const injectStore = (store) => {
  storeRef = store;
};

const api = axios.create({
  baseURL: 'https://zomato-clone-api-5e4m.onrender.com/api',
});

// Attach JWT token from Redux store to every request
api.interceptors.request.use((config) => {
  if (storeRef) {
    const token = storeRef.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Handle errors globally
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg = err.response?.data?.message || 'Something went wrong';
    if (err.response?.status === 401) {
      if (storeRef) {
        storeRef.dispatch({ type: 'auth/logout' });
      }
      window.location.href = '/login';
    }
    return Promise.reject(new Error(msg));
  }
);

export default api;
