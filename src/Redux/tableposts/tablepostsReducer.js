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
      console.log(action.payload);
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
        tablePosts: [action.payload, ...state.tablePosts],
        loading: false,
        error: null,
      };

    case 'DELETE_TABLE_POST_SUCCESS':
      return {
        ...state,
        tablePosts: state.tablePosts.filter(post => post.id !== action.payload),
        loading: false,
        error: null,
      };

    case 'FETCH_TABLE_POSTS_FAILURE':
    case 'CREATE_TABLE_POST_FAILURE':
    case 'DELETE_TABLE_POST_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case 'PUBLISH_POST_SUCCESS':
      const updatedPublishedPosts = state.tablePosts.map(post => {
        if (post.id === action.payload) {
          return { ...post, published: true };
        }
        return post;
      });
      return {
        ...state,
        tablePosts: updatedPublishedPosts,
        loading: false,
        error: null,
      };

    case 'UNPUBLISH_POST_SUCCESS':
      const updatedUnpublishedPosts = state.tablePosts.map(post => {
        if (post.id === action.payload) {
          return { ...post, published: false };
        }
        return post;
      });
      return {
        ...state,
        tablePosts: updatedUnpublishedPosts,
        loading: false,
        error: null,
      };

    case 'PUBLISH_POST_FAILURE':
    case 'UNPUBLISH_POST_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export default tablepostsReducer;