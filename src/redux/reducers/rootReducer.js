import { combineReducers } from '@reduxjs/toolkit';
import authUserSlice from './authUserSlice'; // Importe le reducer de authUser

// Combiner les reducers en un rootReducer
const rootReducer = combineReducers({
  authUser: authUserSlice, 
});

export default rootReducer;
