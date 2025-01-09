import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: localStorage.getItem('authToken') || null, // Récupération du token dans localStorage
  error: null, // Gestion des erreurs
};

const authUserSlice = createSlice({
  name: 'authUser',
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token; // Stocke le token dans l'état global
      state.user = action.payload.user || null; // Récupération des données utilisateur
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

// Sélecteur pour vérifier si l'utilisateur est authentifié (modifié pour tolérer user null)
export const isAuthenticatedSelector = (state) => !!state.authUser?.token;

export const { login, logout, userProfile, setError } = authUserSlice.actions;

export default authUserSlice.reducer;
