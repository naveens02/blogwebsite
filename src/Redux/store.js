import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import postsReducer from './posts/postsReducer';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { postsSaga } from './posts/postsSaga';
import tablepostsReducer from './tableposts/tablepostsReducer';
import { watchTablePosts } from './tableposts/tablepostsSaga';

const rootReducer = {
  auth: authReducer,
  posts: postsReducer,
  tablePosts: tablepostsReducer,
  // Other reducers can be added here if necessary
  // Add other slices' reducers here
};

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield all([postsSaga(), watchTablePosts()]);
  // Add other sagas here
}

const middleware = [...getDefaultMiddleware(), sagaMiddleware]; // Include Saga middleware
const store = configureStore({
  reducer: rootReducer,
  middleware,
  // Other middleware, dev tools, etc. can be configured here
});

sagaMiddleware.run(rootSaga);

export default store;
