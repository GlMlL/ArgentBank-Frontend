import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Fonction pour récupérer le token stocké dans le localStorage
const storedToken = localStorage.getItem('authToken');

// Fonction pour récupérer les informations utilisateur depuis le localStorage
const getUserInfo = () => {
  const userInfoString = localStorage.getItem("userInfo");
  if (userInfoString) {
      return JSON.parse(userInfoString); // Convertir la chaîne JSON en objet JavaScript
  } else {
      // Valeurs par défaut pour userInfo
      return {
          firstName: "",
          lastName: "",
          userName: "Guest", // Valeur par défaut pour userName si non défini
          email: "",
      };
  }
};

// Création du slice Redux pour l'utilisateur et l'authentification
const userSlice = createSlice({
    name: "user",
    initialState: {
        token: storedToken || null, // Utilisation du token stocké dans le localStorage
        isAuthenticated: storedToken ? true : false, // Authentifié si le token est présent
        error: null,
        ...getUserInfo(), // Utiliser les infos utilisateurs stockées si disponibles
    },

    reducers: {
        // Action pour la connexion de l'utilisateur
        login(state, action) {
            state.isAuthenticated = true;
            state.token = action.payload.token;
            localStorage.setItem("authToken", action.payload.token); // Stocker le token dans le localStorage
        },

        // Action pour la déconnexion de l'utilisateur
        logout(state) {
            state.isAuthenticated = false;
            state.token = null;
            state.firstName = "";
            state.lastName = "";
            state.userName = "Guest"; // Remise à la valeur par défaut
            state.email = "";
            localStorage.removeItem("authToken");
            localStorage.removeItem("userInfo");
        },

        // Action pour gérer les erreurs lors des actions utilisateur
        userError(state, action) {
            state.error = action.payload;
        },

        // Action pour mettre à jour le profil de l'utilisateur
        userProfile(state, action) {
            console.log("Updated user profile data:", action.payload);
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.userName = action.payload.userName || "Guest";  // Assurez-vous que userName n'est jamais nul
            state.email = action.payload.email;

            // Mettre à jour le localStorage avec les nouvelles données
            localStorage.setItem("userInfo", JSON.stringify(state));
        },

        // Action pour mettre à jour uniquement le champ userName
        updateUsername(state, action) {
            state.userName = action.payload;
            const userInfo = { ...state }; // Copier l'état utilisateur actuel
            localStorage.setItem("userInfo", JSON.stringify(userInfo)); // Mettre à jour localStorage
        },

        // Action pour récupérer les données utilisateur depuis l'API avec Axios
        async fetchUserData(state, action) {
            try {
                const config = {
                    headers: {
                        'Authorization': `Bearer ${state.token}` // Utiliser le token pour l'authentification
                    }
                };

                const response = await axios.get('http://localhost:3001/api/v1/user/profile', config);

                // Mise à jour de l'état avec les données récupérées
                state.firstName = response.data.body.firstName;
                state.lastName = response.data.body.lastName;
                state.userName = response.data.body.userName || "Guest"; // Valeur par défaut si userName est manquant
                state.email = response.data.body.email;

                // Stocker les nouvelles informations dans le localStorage
                localStorage.setItem("userInfo", JSON.stringify(response.data.body));
            } catch (error) {
                console.error('Erreur lors de la requête :', error);
                state.error = error.message;
            }
        },
    },
});

export const { login, logout, userError, userProfile, updateUsername, fetchUserData } = userSlice.actions;

export default userSlice.reducer;
