import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

function* fetchTablePostsSaga() {
  try {
    const token = localStorage.getItem('token');
    const response = yield call(fetch, 'https://react-assignment-api.mallow-tech.com/api/posts?limit=10&page=1&sort=name&order=desc', {
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': token,
      },
    });

    if (response.ok) {
      const data = yield response.json();
      yield put({ type: 'FETCH_TABLE_POSTS_SUCCESS', payload: data.data });
    } else {
      throw new Error(response.statusText || 'Failed to fetch table posts');
    }
  } catch (error) {
    yield put({ type: 'FETCH_TABLE_POSTS_FAILURE', error: error.message });
  }
}

function* createTablePostSaga(action) {

  try {
    const formData = new FormData();
    formData.append('name', action.payload.name);
    formData.append('content', action.payload.content);
    formData.append('image', action.payload.image);
 
    const response = yield call(axios.post, 'https://react-assignment-api.mallow-tech.com/api/posts', formData, {
      headers: {
        'Authorization': localStorage.getItem('token'),
      },
    });
    
    if (response.status === 200) {
      const createdPost = response.data;
      yield put({ type: 'CREATE_TABLE_POST_SUCCESS', payload: createdPost });
    } else {
      yield put({ type: 'CREATE_TABLE_POST_FAILURE', error: 'Post creation failed' });
    }
  } catch (error) {
    console.log(error.response.data);
    yield put({ type: 'CREATE_TABLE_POST_FAILURE', error: 'Post creation failed' });
  }
}
function* deleteTablePostSaga(action) {
  try {
    const apiUrl = `https://react-assignment-api.mallow-tech.com/api/posts/${action.payload}`;
    const response = yield call(axios.delete, apiUrl, {
      headers: {
        'Authorization': localStorage.getItem('token'),
      },
    });

    if (response.status === 200) {
      yield put({ type: 'DELETE_TABLE_POST_SUCCESS', payload: action.payload });
      yield put({ type: 'FETCH_TABLE_POSTS_REQUEST' });
      yield put({ type: 'SHOW_SUCCESS_MESSAGE', message: 'Post deleted successfully' });
    } else {
      throw new Error(response.statusText || 'Failed to delete table post');
    }
  } catch (error) {
    yield put({ type: 'DELETE_TABLE_POST_FAILURE', error: error.message });
  }
}

function* updateTablePostSaga(action) {
  try {
    const apiUrl = `https://react-assignment-api.mallow-tech.com/api/posts/${action.payload.postId}`;
    const requestData = {
      name: action.payload.name,
      content: action.payload.content,
      image: action.payload.image,
    };

    const response = yield call(axios.patch, apiUrl, requestData, {
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': localStorage.getItem('token'),
      },
    });

    if (response.status === 200) {
      yield put({ type: 'UPDATE_TABLE_POST_SUCCESS', payload: response.data });
      yield put({ type: 'FETCH_TABLE_POSTS_REQUEST' });
    } else {
      throw new Error(response.statusText || 'Failed to update table post');
    }
  } catch (error) {
    yield put({ type: 'UPDATE_TABLE_POST_FAILURE', error: error.message });
  }
}

function* publishPostSaga(action) {
  try {
    const apiUrl = `https://react-assignment-api.mallow-tech.com/api/posts/${action.payload}/publish/true`;

    const response = yield call(axios.post, apiUrl, null, {
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': localStorage.getItem('token'),
      },
    });

    if (response.status === 200) {
      yield put({ type: 'PUBLISH_POST_SUCCESS', payload: action.payload });
      yield put({ type: 'FETCH_TABLE_POSTS_REQUEST' });
    } else {
      throw new Error(response.statusText || 'Failed to publish post');
    }
  } catch (error) {
    yield put({ type: 'PUBLISH_POST_FAILURE', error: error.message });
  }
}

function* unpublishPostSaga(action) {
  try {
    const apiUrl = `https://react-assignment-api.mallow-tech.com/api/posts/${action.payload}/publish/false`;

    const response = yield call(axios.post, apiUrl, null, {
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': localStorage.getItem('token'),
      },
    });

    if (response.status === 200) {
      yield put({ type: 'UNPUBLISH_POST_SUCCESS', payload: action.payload });
      yield put({ type: 'FETCH_TABLE_POSTS_REQUEST' });
    } else {
      throw new Error(response.statusText || 'Failed to unpublish post');
    }
  } catch (error) {
    yield put({ type: 'UNPUBLISH_POST_FAILURE', error: error.message });
  }
}

export function* watchTablePosts() {
  yield takeLatest('FETCH_TABLE_POSTS_REQUEST', fetchTablePostsSaga);
  yield takeLatest('CREATE_TABLE_POST_REQUEST', createTablePostSaga);
  yield takeLatest('DELETE_TABLE_POST_REQUEST', deleteTablePostSaga);
  yield takeLatest('UPDATE_TABLE_POST_REQUEST', updateTablePostSaga);
  yield takeLatest('PUBLISH_POST_REQUEST', publishPostSaga);
  yield takeLatest('UNPUBLISH_POST_REQUEST', unpublishPostSaga);
  yield takeLatest('UPDATE_TABLE_POST_REQUEST', updateTablePostSaga)
  // Add other takeLatest calls for remaining actions if available
}