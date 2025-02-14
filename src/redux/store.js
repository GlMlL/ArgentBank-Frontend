import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/authUserSlice'; 

const store = configureStore({
  reducer: {
    user: userReducer, 
  },
});

export default store;
