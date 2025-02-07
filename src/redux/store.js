import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from './reducers/authUserSlice';  

const store = configureStore({
  reducer: {
    user: authUserReducer,  
  },
});

export default store;
