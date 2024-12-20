import { combineReducers } from 'redux';
import authUserSlice from './authUserSlice'; // Importe le reducer

const rootReducer = combineReducers({
  auth: authUserSlice, 
});

export default rootReducer;
