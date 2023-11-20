import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import TopBar from './TopBar';
import axios from 'axios';
import './Dashboard.css';
import { Input, Avatar, Button, Tooltip, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const Dashboard = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  const storedPosts = useMemo(() => {
    return JSON.parse(localStorage.getItem('posts')) || [];
  }, []);

  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchedPosts, setSearchedPosts] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState('');
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (storedPosts.length > 0) {
      dispatch({ type: 'FETCH_POSTS', payload: storedPosts });
      setLoading(false);
      setSelectedPost(storedPosts[0]);
    } else {
      if (token) {
        axios
          .get('https://react-assignment-api.mallow-tech.com/api/public/posts', {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            setLoading(false);
            localStorage.setItem('posts', JSON.stringify(response.data));
            dispatch({ type: 'FETCH_POSTS', payload: response.data });

            if (response.data.length > 0) {
              setSelectedPost(response.data[0]);
            }
          })
          .catch((error) => {
            setError('Failed to fetch data. Please try again later.');
            setLoading(false);
          });
      } else {
        setError('Token not found');
        setLoading(false);
      }
    }
  }, [dispatch, token, storedPosts]);

  const handlePostClick = (postId, post) => {
    setProfile(post.user);
    if (token) {
      axios
        .get(`https://react-assignment-api.mallow-tech.com/api/public/posts/${postId}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setSelectedPost(response.data);
          dispatch({ type: 'FETCH_SINGLE_POST', payload: response.data });
        })
        .catch((error) => {
          setError('Failed to fetch selected post');
          setLoading(false);
        });
    } else {
      setError('Token not found');
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    const filteredPosts = storedPosts.filter((post) =>
      post.name.toLowerCase().includes(value.toLowerCase())
    );
    setSearchedPosts(filteredPosts);
  };

  const postsToDisplay = searchedPosts.length > 0 ? searchedPosts : storedPosts;

  const createComment = async () => {
    try {
      const response = await axios.post(
        `https://react-assignment-api.mallow-tech.com/api/posts/${selectedPost.id}/comments`,
        { comment: commentText },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const newComment = response.data;
      const updatedSelectedPost = {
        ...selectedPost,
        comments: [...selectedPost.comments, newComment],
      };

      setSelectedPost(updatedSelectedPost);
      setCommentText('');

     
      message.success('Comment created successfully');
    } catch (error) {
      setError('Failed to create a comment');
    }
  };

  const editComment = async (commentId) => {
    try {
      const response = await axios.patch(
        `https://react-assignment-api.mallow-tech.com/api/posts/comments/${commentId}`,
        { comment: editedComment },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const updatedComment = response.data;
      const updatedComments = selectedPost.comments.map((comment) =>
        comment.id === commentId ? updatedComment : comment
      );

      const updatedSelectedPost = {
        ...selectedPost,
        comments: updatedComments,
      };
      setSelectedPost(updatedSelectedPost);

      
      setProfile(selectedPost.user);

      setEditingCommentId(null);
      setEditedComment('');

      
      message.success('Comment edited successfully');
    } catch (error) {
      
      message.error('Failed to edit the comment (your comment alone can be edited)');
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await axios.delete(
        `https://react-assignment-api.mallow-tech.com/api/posts/comments/${commentId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const updatedComments = selectedPost.comments.filter(
        (comment) => comment.id !== commentId
      );
      const updatedSelectedPost = {
        ...selectedPost,
        comments: updatedComments,
      };
      setSelectedPost(updatedSelectedPost);

     
      setProfile(selectedPost.user);

      message.success('Comment deleted successfully');
    } catch (error) {
      message.error('Failed to delete the comment (It is not created by you)');
    }
  };

  return (
    <div className="dashboard-container">
      <TopBar />
      <div className="content-container">
        <div className="left-panel">
          <h2>Published Blogs</h2>
          <Input.Search
            placeholder="Search by post title"
            onSearch={(value) => handleSearch(value)}
            style={{ width: 200, marginBottom: 20 }}
          />
          {postsToDisplay &&
            postsToDisplay.length > 0 &&
            postsToDisplay.map((post) => (
              <div
                key={post.id}
                onClick={() => handlePostClick(post.id, post)}
                className={`post-item ${
                  selectedPost && selectedPost.id === post.id ? 'selected-post' : ''
                }`}
              >
                <div className="post-info">
                  <img src={post.image_url} alt={post.name} className="post-image" />
                  <div className="post-details">
                    <h3>{post.name}</h3>
                    <p className="created-date">{post.created_at}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="right-panel">
          {loading ? (
            <p>Loading data...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : selectedPost ? (
            <div>
              <div className="user-info">
                {profile ? (
                  <Avatar src={profile.profile_url} />
                ) : (
                  <Avatar icon="user" />
                )}
                <span className="user-name">{profile ? profile.first_name : ''}</span>
              </div>
              <div className="post-details">
                <img src={selectedPost.image_url} alt="Post" className="post-image" />
                <h2 className="post-title">{selectedPost.name}</h2>
                <p className="post-content">{selectedPost.content}</p>
              </div>
              <div className="comment-section">
                <h3>Comments</h3>
                <Input.TextArea
                  placeholder="Write a comment"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onPressEnter={createComment}
                />
                {selectedPost.comments && selectedPost.comments.length > 0 ? (
                  selectedPost.comments.map((comment) => (
                    <div key={comment.id} className="comment">
                      <div className="comment-content">
                        <div className="comment-header">
                          <div className="comment-user">
                            {comment.user && comment.user.profile_url ? (
                              <>
                                <img
                                  src={comment.user.profile_url}
                                  alt="Profile"
                                  className="user-avatar"
                                />
                                <span className="user-name">{comment.user.first_name}</span>
                              </>
                            ) : (
                              <>
                                <img
                                  src="placeholder_image_url"
                                  alt="Profile"
                                  className="user-avatar"
                                />
                                <span className="user-name">Unknown User</span>
                              </>
                            )}
                            <span className="comment-time">
                              {new Date(comment.created_at).toLocaleString()}
                            </span>
                          </div>
                          <div className="comment-actions">
                            {editingCommentId === comment.id ? (
                              <div>
                                <Input
                                  value={editedComment}
                                  onChange={(e) => setEditedComment(e.target.value)}
                                  onPressEnter={() => editComment(comment.id)}
                                />
                                <Button onClick={() => editComment(comment.id)}>Submit</Button>
                              </div>
                            ) : (
                              <div className="comment-text">
                                <p>{comment.comment}</p>
                                <div className="comment-buttons">
                                  <Tooltip title="Edit">
                                    <Button
                                      type="text"
                                      icon={<EditOutlined />}
                                      onClick={() => {
                                        setEditingCommentId(comment.id);
                                        setEditedComment(comment.comment);
                                      }}
                                    />
                                  </Tooltip>
                                  <Tooltip title="Delete">
                                    <Button
                                      type="text"
                                      icon={<DeleteOutlined />}
                                      onClick={() => deleteComment(comment.id)}
                                    />
                                  </Tooltip>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No comments available</p>
                )}
              </div>
            </div>
          ) : (
            <p>No post selected</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
