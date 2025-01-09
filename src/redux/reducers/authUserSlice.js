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
      console.log("Action de login reçue :", action); // Afficher l'action reçue
      state.token = action.payload.token; // Stocke le token dans l'état global
      state.user = action.payload.user || null; // Récupération des données utilisateur
      state.error = null;
      console.log("État après login :", state); // Afficher l'état après la mise à jour
    },
    logout: (state) => {
      console.log("Action de logout reçue");
      state.token = null;
      state.user = null;
      state.error = null;
      console.log("État après logout :", state); // Afficher l'état après la déconnexion
    },
    userProfile: (state, action) => {
      console.log("Mise à jour du profil utilisateur :", action.payload);
      state.user = action.payload;
      console.log("État après mise à jour du profil :", state);
    },
    setError: (state, action) => {
      console.log("Erreur reçue :", action.payload);
      state.error = action.payload;
    },
  },
});

// Sélecteur pour vérifier si l'utilisateur est authentifié (modifié pour tolérer user null)
export const isAuthenticatedSelector = (state) => !!state.authUser?.token;

export const { login, logout, userProfile, setError } = authUserSlice.actions;

export default authUserSlice.reducer;
