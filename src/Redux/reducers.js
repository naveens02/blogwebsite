// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    token: null,
    first_name: '',
    last_name: '',
    image: null, 
    
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.image = action.payload.image;
      
    },
    fetchUserSuccess: (state, action) => {
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.image = action.payload.image;
      
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.first_name = '';
      state.last_name = '';
      state.image = null; 
    
    },
    updateProfileSuccess: (state, action) => {
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.image = action.payload.image; 
    },
    updateProfileRequest: (state, action) => {
     
    },
    clearState: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.first_name = '';
      state.last_name = '';
      state.image = null;
     
    },
   
  },
});

export const {
  loginSuccess,
  logout,
  fetchUserSuccess,
  updateProfileSuccess,
  updateProfileRequest,
  clearState, // New action to clear the state
} = authSlice.actions;

export default authSlice.reducer;
