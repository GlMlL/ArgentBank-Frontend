import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: !!localStorage.getItem('userInfo'),
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
    setError: (state, action) => {
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    resetError: (state) => {
      state.error = null;
    },
    updateUserInfo: (state, action) => {
      state.userInfo = { ...state.userInfo, ...action.payload };
      localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
    },
  },
});

export const { login, logout, setError, resetError, updateUserInfo } = userSlice.actions;
export default userSlice.reducer;
