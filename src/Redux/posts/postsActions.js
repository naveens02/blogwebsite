import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPublishedBlogsAPI, fetchSinglePostAPI } from './postsService';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('Token');
    const response = await fetchPublishedBlogsAPI(token);
    return response.data; // Assuming the API response has a 'data' field containing posts
  } catch (error) {
    return rejectWithValue('Failed to fetch published posts');
  }
});

export const fetchSinglePost = createAsyncThunk('posts/fetchSinglePost', async (postId, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('Token');
    const response = await fetchSinglePostAPI(postId, token);
    return response.data;
  } catch (error) {
    return rejectWithValue('Failed to fetch the post');
  }
});

// postsReducer.js
