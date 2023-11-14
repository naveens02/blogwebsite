import { FETCH_POSTS, FETCH_SINGLE_POST, CREATE_COMMENT, DELETE_COMMENT, EDIT_COMMENT } from './dashboardActions';
  

  
  
  const initialState = {
    posts: [],
    selectedPost: null,
  };
  
  const findPostIndexById = (posts, postId) => {
    return posts.findIndex((post) => post.id === postId);
  };
  
  const findCommentIndexById = (comments, commentId) => {
    return comments.findIndex((comment) => comment.id === commentId);
  };
  
  const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_POSTS:
        return {
          ...state,
          posts: action.payload,
        };
  
      case FETCH_SINGLE_POST:
        return {
          ...state,
          selectedPost: action.payload,
        };
  
      case CREATE_COMMENT:
        const createdComment = action.payload;
        const createPostIndex = findPostIndexById(state.posts, createdComment.post_id);
  
        if (createPostIndex !== -1) {
          const updatedPostsCreate = [...state.posts];
          updatedPostsCreate[createPostIndex].comments.push(createdComment);
  
          return {
            ...state,
            posts: updatedPostsCreate,
            selectedPost: {
              ...state.selectedPost,
              comments: [...state.selectedPost.comments, createdComment],
            },
          };
        }
  
        return state;
  
      case DELETE_COMMENT:
        const deletedCommentId = action.payload;
        const deletePostIndex = findPostIndexById(state.posts, state.selectedPost.id);
        const deleteCommentIndex = findCommentIndexById(state.selectedPost.comments, deletedCommentId);
  
        if (deletePostIndex !== -1 && deleteCommentIndex !== -1) {
          const updatedPostsDelete = [...state.posts];
          updatedPostsDelete[deletePostIndex].comments = [
            ...state.selectedPost.comments.slice(0, deleteCommentIndex),
            ...state.selectedPost.comments.slice(deleteCommentIndex + 1),
          ];
  
          return {
            ...state,
            posts: updatedPostsDelete,
            selectedPost: {
              ...state.selectedPost,
              comments: [
                ...state.selectedPost.comments.slice(0, deleteCommentIndex),
                ...state.selectedPost.comments.slice(deleteCommentIndex + 1),
              ],
            },
          };
        }
  
        return state;
  
      case EDIT_COMMENT:
        const editedComment = action.payload;
        const editPostIndex = findPostIndexById(state.posts, state.selectedPost.id);
        const editCommentIndex = findCommentIndexById(state.selectedPost.comments, editedComment.id);
  
        if (editPostIndex !== -1 && editCommentIndex !== -1) {
          const updatedPostsEdit = [...state.posts];
          updatedPostsEdit[editPostIndex].comments[editCommentIndex] = editedComment;
  
          return {
            ...state,
            posts: updatedPostsEdit,
            selectedPost: {
              ...state.selectedPost,
              comments: [
                ...state.selectedPost.comments.slice(0, editCommentIndex),
                editedComment,
                ...state.selectedPost.comments.slice(editCommentIndex + 1),
              ],
            },
          };
        }
  
        return state;
  
      default:
        return state;
    }
  };
  
  export default dashboardReducer;
  