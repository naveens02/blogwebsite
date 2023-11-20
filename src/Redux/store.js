
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


const rootReducer = {
  auth: authReducer,
  posts: postsReducer,
  tablePosts: tablepostsReducer,
  dashboard: dashboardReducer,
  
};


const sagaMiddleware = createSagaMiddleware();


function* rootSaga() {
  yield all([postsSaga(), watchTablePosts(), watchDashboard()]);
  
}


const middleware = [...getDefaultMiddleware(), sagaMiddleware];


const store = configureStore({
  reducer: rootReducer,
  middleware,
  
});


sagaMiddleware.run(rootSaga);

export default store;
