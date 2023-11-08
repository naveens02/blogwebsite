import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Ensure the correct path
import postsReducer from './posts/postsReducer'; // Ensure the correct path
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { postsSaga } from './posts/postsSaga'; // Ensure the correct path
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
  yield all([postsSaga(),watchTablePosts(),]);
  
  // Add other sagas here
}

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
  // Other middleware, dev tools, etc. can be configured here
});

sagaMiddleware.run(rootSaga);

export default store;
