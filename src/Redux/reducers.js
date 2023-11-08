// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    token: null,
    first_name: '',
    last_name: '',
    image: null, // Image object or null
    // Other necessary state data
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.image = action.payload.image;
      // Handle other state changes upon successful login
    },
    fetchUserSuccess: (state, action) => {
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.image = action.payload.image;
      // Update other user data if available from the fetch
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.first_name = '';
      state.last_name = '';
      state.image = null; // Reset image state on logout
      // Handle other state changes upon logout
    },
    updateProfileSuccess: (state, action) => {
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.image = action.payload.image; // Assuming a URL or base64 representation of the image
      // Handle other state changes upon profile update
    },
    updateProfileRequest: (state, action) => {
      // Logic to handle the initial update request, if necessary
      // This action might trigger an API call to update the profile
      // You can handle the state changes related to the update request here
    },
    clearState: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.first_name = '';
      state.last_name = '';
      state.image = null;
      // Clear any other state data if necessary
    },
    // Other reducers as needed
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
