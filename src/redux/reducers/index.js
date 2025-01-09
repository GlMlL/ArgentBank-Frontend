import { combineReducers } from 'redux';
// Importez ici vos différents réducteurs
import authReducer from './authReducer';

const rootReducer = combineReducers({
  auth: authReducer, 
});

export default rootReducer;

