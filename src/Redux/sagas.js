// saga.js
import { takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';
import { loginSuccess, logout, updateProfileSuccess, updateProfileRequest } from './authSlice'; // Ensure updateProfileRequest is imported

function* watchLogin(action) {
  try {
    const response = yield call(axios.post, 'https://react-assignment-api.mallow-tech.com/api/login', action.payload);

    if (response.status === 200) {
      yield put(loginSuccess(response.data)); // Assuming response contains token and user details
      const token=response.headers.get('Authorization');
      localStorage.setItem('token',token);
       
      // Fetch user data after successful login
      yield put({ type: 'FETCH_USER_DATA_REQUEST' });
    } else {
      console.error('Login failed');
    }
  } catch (error) {
    console.error('Error during login:', error);
    // Handle error
  }
}

function* watchLogout() {
  try {
    yield call(axios.post, 'https://react-assignment-api.mallow-tech.com/api/logout', {
      headers: {
        'Authorization': localStorage.getItem('token'),
      }
    });
    yield put(logout());
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // Clear user data on logout
  } catch (error) {
    console.error('Error during logout:', error);
    // Handle error during logout
  }
}

function* updateProfile(action) {
  try {
    const { first_name, last_name, profile_Pic } = action.payload;

    const apiUrl = 'https://react-assignment-api.mallow-tech.com/api/update/profile';

    // Make an API call to update the user's profile
    const formData = new FormData();
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('profile_Pic', profile_Pic);
    
    const token = localStorage.getItem('token');

    const response = yield call(axios.post, apiUrl, formData, {
      headers: {
        'Authorization': token,
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 200) {
      yield put(updateProfileSuccess({ first_name, last_name, profile_Pic }));
      // Update user details in local storage
      const storedUserData = JSON.parse(localStorage.getItem('user'));
      const updatedUserData = { ...storedUserData, first_name, last_name, profile_Pic };
      localStorage.setItem('user', JSON.stringify(updatedUserData));
    } else {
      // Handle failure
      // You may dispatch an action or handle failure cases here
    }
  } catch (error) {
    // Handle errors
    // You may dispatch an action or handle errors here
  }
}

function* fetchUserData() {
  try {
    const token = localStorage.getItem('token');
    const response = yield call(axios.get, 'https://react-assignment-api.mallow-tech.com/api/user', {
      headers: {
        'Authorization': token,
      }
    });

    if (response.status === 200) {
      // Dispatch an action to update the user state with the fetched data
      yield put(updateProfileSuccess(response.data));
      // Update user details in local storage
      localStorage.setItem('user', JSON.stringify(response.data));
    } else {
      // Handle failure to fetch user data
      // You may dispatch an action or handle failure cases here
    }
  } catch (error) {
    // Handle errors during fetching user data
    // You may dispatch an action or handle errors here
  }
}

export default function* rootSaga() {
  yield takeLatest('LOGIN_REQUEST', watchLogin);
  yield takeLatest('LOGOUT_REQUEST', watchLogout);
  yield takeLatest('UPDATE_PROFILE_REQUEST', updateProfile); // Make sure it's 'UPDATE_PROFILE_REQUEST'
  yield takeLatest('FETCH_USER_DATA_REQUEST', fetchUserData);
  // Add other watchers if needed
}
