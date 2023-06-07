import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'user',
  storage,
  blacklist: ['register'],
};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    firstName: '',
    lastName: '',
    token: null,
    isChecked: false,
  },
  reducers: {
    setUser: (state, action) => {
      const { firstName, lastName } = action.payload;
      state.firstName = firstName;
      state.lastName = lastName;
    },
    setToken: (state, action) => {
      const { token, isChecked } = action.payload;
      state.token = token;
      state.isChecked = isChecked;
    },
    deleteToken: (state) => {
      state.token = null;
      state.isChecked = false;
    },
  },
});

const persistedUserReducer = persistReducer(persistConfig, userSlice.reducer);

export const { setUser, setToken, deleteToken } = userSlice.actions;

export default persistedUserReducer;
