import { takeLatest, put, all } from 'redux-saga/effects';
import { loginSuccess, logout } from './authSlice';

function* watchLogin(action) {
 
  const { username, password } = action.payload;

  try {
   
    yield new Promise((resolve) => setTimeout(resolve, 1000));

    
    yield put(loginSuccess({ token: 'sampleToken' }));
  } catch (error) {
  
    console.error('Login error:', error);
  }
}

function* watchLogout() {
  try {
    
    yield new Promise((resolve) => setTimeout(resolve, 1000));

   
    yield put(logout());
  } catch (error) {
   
    console.error('Logout error:', error);
    
  }
}

function* rootSaga() {
  yield all([
    takeLatest('LOGIN_REQUEST', watchLogin),
    takeLatest('LOGOUT_REQUEST', watchLogout),
  ]);
}

export default rootSaga;
