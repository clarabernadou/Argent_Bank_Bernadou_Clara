import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    firstName: '',
    lastName: '',
    token: Cookies.get('token'),
  },
  reducers: {
    setUser: (state, action) => {
      const { firstName, lastName } = action.payload;
      state.firstName = firstName;
      state.lastName = lastName;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    deleteToken: (state, action) => {
      state.token = '';
      Cookies.remove('token');
    }    
  },
});

export const { setUser, setToken, deleteToken } = userSlice.actions;

export default userSlice.reducer;
