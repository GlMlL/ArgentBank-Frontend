import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,    // L'utilisateur est null par défaut
  token: null,   // Le token est null par défaut
  error: null,   // Pas d'erreur initialement
};

const authUserSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;  // Assurez-vous que le payload contient le token
      state.user = action.payload.user;    // Assurez-vous que le payload contient l'utilisateur
      state.error = null;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { login, logout, setError } = authUserSlice.actions;
export default authUserSlice.reducer;
