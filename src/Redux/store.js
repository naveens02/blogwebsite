// src/Redux/store.js
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

import authReducer from './authSlice';
import postsReducer from './posts/postsReducer';
import { postsSaga } from './posts/postsSaga';
import tablepostsReducer from './tableposts/tablepostsReducer';
import { watchTablePosts } from './tableposts/tablepostsSaga';
import dashboardReducer from './dashboard/dashboardReducer';
import { watchDashboard } from './dashboard/dashboardSaga';

// Define your root reducer by combining all the reducers
const rootReducer = {
  auth: authReducer,
  posts: postsReducer,
  tablePosts: tablepostsReducer,
  dashboard: dashboardReducer,
  // Add other reducers here if necessary
};

// Create Saga middleware
const sagaMiddleware = createSagaMiddleware();

// Define the root saga by combining all sagas
function* rootSaga() {
  yield all([postsSaga(), watchTablePosts(), watchDashboard()]);
  // Add other sagas here
}

// Combine middleware, including Saga middleware
const middleware = [...getDefaultMiddleware(), sagaMiddleware];

// Configure the Redux store
const store = configureStore({
  reducer: rootReducer,
  middleware,
  // Other configurations (e.g., dev tools, enhancers) can be added here
});

// Run the root saga
sagaMiddleware.run(rootSaga);

export default store;
