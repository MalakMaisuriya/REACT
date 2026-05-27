import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { 
    isAuthenticated: localStorage.getItem('auth') === 'true' 
  },
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
      localStorage.setItem('auth', 'true');
    },
    logout: (state) => {
      state.isAuthenticated = false;
      localStorage.removeItem('auth');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;