import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: localStorage.getItem('authToken') || null, // Utilisation du token en localStorage
  error: null,
};

const authUserSlice = createSlice({
  name: 'authUser',
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.error = null;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.error = null;
    },
    userProfile: (state, action) => {
      state.user = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Sélecteur pour vérifier l'authentification
export const isAuthenticatedSelector = (state) => !!state.authUser.token && !!state.authUser.user;

export const { login, logout, userProfile, setError } = authUserSlice.actions;

export default authUserSlice.reducer;
