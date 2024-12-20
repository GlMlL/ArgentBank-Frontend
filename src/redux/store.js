import { configureStore } from '@reduxjs/toolkit';  // Import de configureStore de Redux Toolkit
import rootReducer from './reducers/rootReducer';  // Import de votre rootReducer

// Créez le store en utilisant configureStore
const store = configureStore({
  reducer: rootReducer,  // Utilisez votre rootReducer ici
  devTools: process.env.NODE_ENV !== 'production',  // Active Redux DevTools en mode développement
});

export default store;
