
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    token: null,
    first_name: '',
    last_name: '',
    profile_Pic: null,
    
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.profile_Pic = action.payload.profile_Pic;
     
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.first_name = '';
      state.last_name = '';
      state.profile_Pic = null; // Reset the image upon logout
      // Handle other state changes upon logout
    },
    updateProfileSuccess: (state, action) => {
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.profile_Pic = action.payload.profile_Pic;
      // Handle other state changes upon profile update
    },
    updateProfileRequest: (state, action) => {
      // This would typically trigger the API call to update the profile
      // You can handle the state changes related to the update request here
    },
    // Other reducers as needed
  },
});

export const {
  loginSuccess,
  logout,
  updateProfileSuccess,
  updateProfileRequest, // Include updateProfileRequest here
} = authSlice.actions;

export default authSlice.reducer;
