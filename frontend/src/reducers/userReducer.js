import { createSlice } from '@reduxjs/toolkit';

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
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
    },
  },
});

export const { setUser, setToken, deleteToken } = userSlice.actions;

export default userSlice.reducer;