// tablepostsReducer.js

const initialState = {
  tablePosts: [],
  loading: false,
  error: null,
};

const tablepostsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_TABLE_POSTS_REQUEST':
    case 'CREATE_TABLE_POST_REQUEST':
    case 'DELETE_TABLE_POST_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_TABLE_POSTS_SUCCESS':
      return {
        ...state,
       tablePosts: action.payload,
        loading: false,
        error: null,
      };
    case 'CREATE_TABLE_POST_SUCCESS':
      return {
        ...state,
        tablePosts: [action.payload, ...state.tablePosts], // Append the new post to existing posts
        loading: false,
        error: null,
      };
    case 'DELETE_TABLE_POST_SUCCESS':
      return {
        ...state,
        tablePosts: state.tablePosts.filter(post => post.id !== action.payload), // Remove the deleted post
        loading: false,
        error: null,
      };
    case 'FETCH_TABLE_POSTS_FAILURE':
    case 'CREATE_TABLE_POST_FAILURE':
    case 'DELETE_TABLE_POST_FAILURE':
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};
export const fetchPostsSuccess = (data) => {
  return {
    type: 'FETCH_TABLE_POSTS_SUCCESS',
    payload: data,
  };
};

export const fetchPostsFailure = (error) => {
  return {
    type: 'FETCH_TABLE_POSTS_FAILURE',
    error: error,
  };
};
export default tablepostsReducer;