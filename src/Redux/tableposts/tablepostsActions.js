// tablepostsActions.js
export const fetchTablePostsRequest = () => ({
    type: 'FETCH_TABLE_POSTS_REQUEST',
    
  });
  
  export const createTablePostRequest = (name, content, image) => ({
    type: 'CREATE_TABLE_POST_REQUEST',
    payload: { name, content, image },
  });
  
  
  export const deleteTablePostRequest = (postId) => ({
    type: 'DELETE_TABLE_POST_REQUEST',
    payload: postId,
  });
  // tablepostsActions.js

export const publishPostRequest = (postId) => ({
  type: 'PUBLISH_POST_REQUEST',
  payload: postId,
});

export const unpublishPostRequest = (postId) => ({
  type: 'UNPUBLISH_POST_REQUEST',
  payload: postId,
});
  export const updatePostPublishRequest = (postId, published) => ({
    type: 'UPDATE_POST_PUBLISH_REQUEST',
    payload: { postId, published },
  });