import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Fonction pour récupérer le token stocké dans le localStorage
const storedToken = localStorage.getItem('authToken');

const getUserInfo = () => {
    const userInfoString = localStorage.getItem("userInfo");
    if (userInfoString) {
        return JSON.parse(userInfoString);
    } else {
        return {
            firstName: "",
            lastName: "",
            userName: "",
            email: "",
        };
    }
};

const userSlice = createSlice({
    name: "user",
    initialState: {
        token: storedToken || null,  //  Ajoute le token stocké
        isAuthenticated: storedToken ? true : false,  //  Vérifie si l'utilisateur est connecté
        error: null,
        ...getUserInfo(), 
    },

    reducers: {
        login(state, action) {
            state.isAuthenticated = true;
            state.token = action.payload.token;
            localStorage.setItem("authToken", action.payload.token);
        },

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

        userProfile(state, action) {
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.userName = action.payload.userName;
            state.email = action.payload.email;
            localStorage.setItem("userInfo", JSON.stringify({
                firstName: state.firstName,
                lastName: state.lastName,
                userName: state.userName,
                email: state.email,
            }));
        },

        updateUsername(state, action) {
            state.userName = action.payload;
            const updatedUserInfo = {
                firstName: state.firstName,
                lastName: state.lastName,
                userName: action.payload,
                email: state.email
            };
            localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
        },

        fetchUserData(state, action) {
            try {
                const config = {
                    headers: {
                        'Authorization': `Bearer ${state.token}`
                    }
                };

                const response = axios.get('http://localhost:3001/api/v1/user/profile', config);
                
                state.firstName = response.data.body.firstName;
                state.lastName = response.data.body.lastName;
                state.userName = response.data.body.userName;
                state.email = response.data.body.email;

                localStorage.setItem("userInfo", JSON.stringify({
                    firstName: state.firstName,
                    lastName: state.lastName,
                    userName: state.userName,
                    email: state.email
                }));
            } catch (error) {
                console.error('Erreur lors de la requête :', error);
                state.error = error.message;
            }
        }
    }
});


export const { login, logout, userError, userProfile, updateUsername, fetchUserData } = userSlice.actions;

export default userSlice.reducer;