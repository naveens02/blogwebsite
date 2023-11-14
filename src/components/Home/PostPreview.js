// PostPreview.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button, Spin, message } from 'antd';
import { deleteTablePostRequest, updatePostPublishRequest } from '../../Redux/tableposts/tablepostsActions';
import './PostPreview.css';

const PostPreview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postId } = useParams();
  const post = useSelector((state) =>
    state.tablePosts.tablePosts.find((post) => post.id === Number(postId))
  );

  const handleDelete = () => {
    dispatch(deleteTablePostRequest(postId));
    message.success('Post deleted successfully');
    navigate('/post');
  };

  const handleEdit = () => (
    <Link to={`/edit/${postId}`} className="EditButton">
      Edit
    </Link>
  );

  const handlePublish = () => {
    dispatch(updatePostPublishRequest(postId, !post.published));
    const publishMessage = post.published ? 'unpublished' : 'published';
    message.success(`Post ${publishMessage} successfully`);
  };

  return (
    <Spin spinning={!post} size="large">
      {post && (
        <div className="PostPreview">
          <Link to="/post" className="BackButton">
          ← Back
          </Link>
          <Button type="link" onClick={handleDelete} className="DeleteButton">
            Delete
          </Button>
          <Button type="link" onClick={handlePublish} className="PublishButton">
            {post.published ? 'Unpublish' : 'Publish'}
          </Button>

    
          {handleEdit()}
        
          <img
            src={post.image_url}  
            alt="Post"
            className="PostPreviewImage"
          />
           <h1 className="PostPreview">{post.name}</h1>
          <p className="PostPreview">{post.content}</p>
        </div>
      )}
    </Spin>
  );
};

export default PostPreview;
