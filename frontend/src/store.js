import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';

const loadTokenFromStorage = () => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const isChecked = !!token;
  return { token, isChecked };
};

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState: {
    user: loadTokenFromStorage(),
  },
});

export { store };
