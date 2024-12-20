import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  
import App from './App';  
import reportWebVitals from './reportWebVitals';  
import 'font-awesome/css/font-awesome.min.css';  
import { Provider } from 'react-redux';  // Importation du Provider de Redux
import store from './redux/store';  // Importation du store Redux

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>  {/* Fournit le store Redux à toute l'application */}
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();  // Appel optionnel pour mesurer les performances
