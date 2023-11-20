import { takeLatest, call, put } from 'redux-saga/effects';
import { FETCH_POSTS, FETCH_SINGLE_POST, CREATE_COMMENT, DELETE_COMMENT, EDIT_COMMENT } from './dashboardActions';
import axios from 'axios';

function* fetchPostsSaga() {
  try {
    const response = yield call(axios.get, 'https://react-assignment-api.mallow-tech.com/api/public/posts');
    yield put({ type: FETCH_POSTS, payload: response.data });
  } catch (error) {
   
  }
}

function* fetchSinglePostSaga(action) {
  try {
    const postId = action.payload;
    const response = yield call(axios.get, `https://react-assignment-api.mallow-tech.com/api/public/posts/${postId}`);
    yield put({ type: FETCH_SINGLE_POST, payload: response.data });
  } catch (error) {
    
  }
}

function* createCommentSaga(action) {
  try {
    const { postId, commentText } = action.payload;
    const response = yield call(axios.post, `https://react-assignment-api.mallow-tech.com/api/posts/${postId}/comments`, {
      comment: commentText,
    });
    yield put({ type: CREATE_COMMENT, payload: response.data });
  } catch (error) {
    
  }
}

function* deleteCommentSaga(action) {
  try {
    const commentId = action.payload;
    yield call(axios.delete, `https://react-assignment-api.mallow-tech.com/api/posts/comments/${commentId}`);
    yield put({ type: DELETE_COMMENT, payload: commentId });
  } catch (error) {
   
  }
}

function* editCommentSaga(action) {
  try {
    const { commentId, editedComment } = action.payload;
    const response = yield call(axios.patch, `https://react-assignment-api.mallow-tech.com/api/posts/comments/${commentId}`, {
      comment: editedComment,
    });
    yield put({ type: EDIT_COMMENT, payload: response.data });
  } catch (error) {
   
    
  }
}

function* watchDashboard() {
    yield takeLatest(FETCH_POSTS, fetchPostsSaga);
    yield takeLatest(FETCH_SINGLE_POST, fetchSinglePostSaga);
    yield takeLatest(CREATE_COMMENT, createCommentSaga);
    yield takeLatest(DELETE_COMMENT, deleteCommentSaga);
    yield takeLatest(EDIT_COMMENT, editCommentSaga);
  }
  
  export { watchDashboard };
