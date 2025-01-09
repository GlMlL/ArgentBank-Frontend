import { configureStore } from '@reduxjs/toolkit'; // Utilisation de Redux Toolkit
import rootReducer from './reducers/rootReducer'; // Import du rootReducer

// Configuration du store Redux
const store = configureStore({
  reducer: rootReducer, // Utilisation du rootReducer combiné
  devTools: process.env.NODE_ENV !== 'production', // Activer Redux DevTools en développement
});

export default store;
