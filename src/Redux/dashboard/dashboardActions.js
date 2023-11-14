// src/Redux/dashboard/dashboardActions.js
export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_SINGLE_POST = 'FETCH_SINGLE_POST';
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';

export const fetchPosts = (posts) => ({
  type: FETCH_POSTS,
  payload: posts,
});

export const fetchSinglePost = (post) => ({
  type: FETCH_SINGLE_POST,
  payload: post,
});

export const createComment = (comment) => ({
  type: CREATE_COMMENT,
  payload: comment,
});

export const deleteComment = (commentId) => ({
  type: DELETE_COMMENT,
  payload: commentId,
});

export const editComment = (comment) => ({
  type: EDIT_COMMENT,
  payload: comment,
});
