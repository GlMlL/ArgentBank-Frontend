import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  
import App from './App';   
import 'font-awesome/css/font-awesome.min.css';  
import { Provider } from 'react-redux';  // Importation du Provider de Redux
import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <Provider store={store}>  {/* Fournit le store Redux à toute l'application  */}
      <App />
    </Provider>
  
);


