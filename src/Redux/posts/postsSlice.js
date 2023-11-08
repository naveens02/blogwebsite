import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPublishedBlogsAPI, fetchSinglePostAPI } from './postsService';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('Token');
    const response = await fetchPublishedBlogsAPI();
    return response.data;
  } catch (error) {
    return rejectWithValue('Failed to fetch published posts');
  }
});

export const fetchSinglePost = createAsyncThunk('posts/fetchSinglePost', async (postId, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('Token');
    const response = await fetchSinglePostAPI(postId);
    return response.data;
  } catch (error) {
    return rejectWithValue('Failed to fetch the post');
  }
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    selectedPost: null,
    error: null,
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setSelectedPost: (state, action) => {
      state.selectedPost = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
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
  },
});

export const { setPosts, setSelectedPost, setError } = postsSlice.actions;

export default postsSlice.reducer;
