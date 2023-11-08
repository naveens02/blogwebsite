import { createReducer } from '@reduxjs/toolkit';
import { fetchPosts, fetchSinglePost } from './postsSlice';

const initialState = {
  posts: [],
  selectedPost: null,
  error: null,
};

const postsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.error = null;
      localStorage.setItem('posts', JSON.stringify(action.payload));
    })
    .addCase(fetchPosts.rejected, (state, action) => {
      state.error = action.payload;
      state.posts = [];
    })
    .addCase(fetchSinglePost.fulfilled, (state, action) => {
      state.selectedPost = action.payload;
      state.error = null;
      localStorage.setItem('selectedPost', JSON.stringify(action.payload));
    })
    .addCase(fetchSinglePost.rejected, (state, action) => {
      state.error = action.payload;
      state.selectedPost = null;
    });
});

export default postsReducer;
