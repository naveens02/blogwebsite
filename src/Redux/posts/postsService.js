import axios from 'axios';

export const fetchPublishedBlogsAPI = async (token) => {
  try {
    const response = await axios.get('https://react-assignment-api.mallow-tech.com/api/public/posts', {
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': token,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch published posts');
  }
};

export const fetchSinglePostAPI = async (postId, token) => {
  try {
    const response = await axios.get(`https://react-assignment-api.mallow-tech.com/api/public/posts/${postId}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': token,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch the post');
  }
};

const postsService = { fetchPublishedBlogsAPI, fetchSinglePostAPI };
export default postsService;
