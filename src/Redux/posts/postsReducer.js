import { createSlice } from '@reduxjs/toolkit';
import { fetchPosts, fetchSinglePost } from './postsActions';


const initialState = {
  posts: [],
  selectedPost: null,
  error: null,
  loading: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearSelectedPost: (state) => {
      state.selectedPost = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
        state.error = null;
        localStorage.setItem('posts', JSON.stringify(action.payload));
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.posts = [];
      })
      .addCase(fetchSinglePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSinglePost.fulfilled, (state, action) => {
        state.selectedPost = action.payload;
        state.loading = false;
        state.error = null;
        localStorage.setItem('selectedPost', JSON.stringify(action.payload));
      })
      .addCase(fetchSinglePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.selectedPost = null;
      });
  },
});

export const { clearSelectedPost } = postsSlice.actions;

export default postsSlice.reducer;
