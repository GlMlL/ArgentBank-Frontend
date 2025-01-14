import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Fonction pour récupérer le token stocké dans le localStorage
const storedToken = localStorage.getItem('authToken');

// Fonction pour récupérer les informations de l'utilisateur depuis le localStorage
const getUserInfo = () => {
    const userInfoString = localStorage.getItem("userInfo");
    if (userInfoString) {
        return JSON.parse(userInfoString); // Convertir la chaîne JSON en objet JavaScript
    } else {
        return {
            firstName: "",
            lastName: "",
            userName: "",
            email: "",
        };
    }
};

// Création du slice Redux pour l'utilisateur et l'authentification
const userSlice = createSlice({
    name: "user",
    initialState: {
        token:  null,
        isAuthenticated: null, // Authentifié si le token est présent
        error: null,
        ...getUserInfo(), // Utiliser les infos utilisateurs stockées si disponibles
    },

    reducers: {
        // Action pour la connexion de l'utilisateur
        login(state, action) {
            state.isAuthenticated = true;
            state.token = action.payload.token;
            //localStorage.setItem("authToken", action.payload.token); // Stocker le token dans le localStorage
        },

        // Action pour la déconnexion de l'utilisateur
        logout(state) {
            state.isAuthenticated = false;
            state.token = null;
            state.firstName = "";
            state.lastName = "";
            state.userName = "";
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
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.userName = action.payload.userName;
            state.email = action.payload.email;
            localStorage.setItem("userInfo", JSON.stringify(action.payload)); // Stocker les infos dans le localStorage
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
                state.userName = response.data.body.userName;
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