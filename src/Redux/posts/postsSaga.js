import { takeLatest, call, put } from 'redux-saga/effects';
import { fetchPosts, fetchSinglePost } from './postsSlice'; // Correct import from postsSlice, not postsService

import { fetchPublishedBlogsAPI, fetchSinglePostAPI } from './postsService'; // You already have these imports, make sure they are used within the saga

function* fetchPostsSaga() {
  try {
    const token = localStorage.getItem('Token');
    const response = yield call(fetchPublishedBlogsAPI, token);
    yield put(fetchPosts.fulfilled(response)); 
    localStorage.setItem('posts', JSON.stringify(response));
  } catch (error) {
    yield put(fetchPosts.rejected('Failed to fetch published posts')); // Dispatching the action on failure
  }
}

function* fetchSinglePostSaga(action) {
  try {
    const token = localStorage.getItem('Token');
    const response = yield call(fetchSinglePostAPI, action.payload, token);
    yield put(fetchSinglePost.fulfilled(response)); // Dispatching the action on success
    localStorage.setItem('selectedPost', JSON.stringify(response));
  } catch (error) {
    yield put(fetchSinglePost.rejected('Failed to fetch the post')); // Dispatching the action on failure
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
