import axios from 'axios';
import { userProfile, setError } from './reducers/authUserSlice'; // Actions du slice
import { login } from './reducers/authUserSlice'; // Action de login

// Action pour récupérer le profil utilisateur
export const fetchUserProfile = (token) => async (dispatch) => {
  try {
    const response = await axios.post(
      'http://localhost:3001/api/v1/user/profile',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`, // Ajout du token dans l'en-tête de la requête
        },
      }
    );

    if (response.status === 200) {
      // Dispatch action pour mettre à jour les données utilisateur dans le store
      dispatch(userProfile(response.data.body));
    } else {
      console.error('Erreur lors de la récupération du profil utilisateur : ', response.statusText);
      dispatch(setError('Erreur lors de la récupération du profil utilisateur.'));
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des données utilisateur : ', error);
    dispatch(setError('Erreur lors de la récupération des données utilisateur.'));
  }
};

// Action pour mettre à jour le profil utilisateur
export const updateUserProfile = (token, updatedData) => async (dispatch) => {
  try {
    const response = await axios.put(
      'http://localhost:3001/api/v1/user/profile', // URL de l'API pour mettre à jour le profil
      updatedData, // Les données à mettre à jour (par exemple { userName: 'nouveauNom' })
      {
        headers: {
          Authorization: `Bearer ${token}`, // Ajoute le token dans l'en-tête
          'Content-Type': 'application/json', // Le type de contenu de la requête
        },
      }
    );

    if (response.status === 200) {
      // Dispatch pour mettre à jour les informations de l'utilisateur dans Redux
      dispatch(userProfile(response.data.body)); // Met à jour le profil de l'utilisateur
    } else {
      console.error('Erreur lors de la mise à jour du profil utilisateur : ', response.statusText);
      dispatch(setError('Erreur lors de la mise à jour du profil utilisateur.'));
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil utilisateur : ', error);
    dispatch(setError('Erreur lors de la mise à jour du profil utilisateur.'));
  }
};

// Action de login qui envoie les données de connexion à Redux
export const loginUser = (userData) => (dispatch) => {
  const { token, user } = userData;

  if (token) {
    // Dispatch de l'action de login pour enregistrer le token et les données utilisateur
    dispatch(login({ token, user }));
  } else {
    console.error('Erreur lors de la connexion : pas de token');
  }
};
