import { takeLatest, call, put } from 'redux-saga/effects';
import { fetchPosts, fetchSinglePost } from './postsSlice'; 

import { fetchPublishedBlogsAPI, fetchSinglePostAPI } from './postsService'; 

function* fetchPostsSaga() {
  try {
    const token = localStorage.getItem('Token');
    const response = yield call(fetchPublishedBlogsAPI, token);
    yield put(fetchPosts.fulfilled(response)); 
    localStorage.setItem('posts', JSON.stringify(response));
  } catch (error) {
    yield put(fetchPosts.rejected('Failed to fetch published posts')); 
  }
}

function* fetchSinglePostSaga(action) {
  try {
    const token = localStorage.getItem('Token');
    const response = yield call(fetchSinglePostAPI, action.payload, token);
    yield put(fetchSinglePost.fulfilled(response)); 
    localStorage.setItem('selectedPost', JSON.stringify(response));
  } catch (error) {
    yield put(fetchSinglePost.rejected('Failed to fetch the post')); 
  }
}

function* watchFetchPosts() {
  yield takeLatest(fetchPosts.type, fetchPostsSaga);
}

function* watchFetchSinglePost() {
  yield takeLatest(fetchSinglePost.type, fetchSinglePostSaga);
}

export function* postsSaga() {
  yield watchFetchPosts();
  yield watchFetchSinglePost();
}
