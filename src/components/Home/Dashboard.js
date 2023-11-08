// Dashboard.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, fetchSinglePost } from '../../Redux/posts/postsActions';
import TopBar from './TopBar';
import axios from 'axios';
import './Dashboard.css';
import { Input, Avatar } from 'antd';

const Dashboard = () => {
  const dispatch = useDispatch();
  const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchedPosts, setSearchedPosts] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (storedPosts.length > 0) {
      dispatch(fetchPosts.fulfilled(storedPosts));
      setLoading(false);
    } else {
      if (token) {
        axios.get('https://react-assignment-api.mallow-tech.com/api/public/posts', {
          headers: {
            'Authorization': token,
          },
        })
          .then((response) => {
            setLoading(false);
            localStorage.setItem('posts', JSON.stringify(response.data));
            dispatch(fetchPosts.fulfilled(response.data));
          })
          .catch((error) => {
            setError('Failed to fetch data');
            setLoading(false);
          });
      } else {
        setError('Token not found');
        setLoading(false);
      }
    }
  }, [dispatch, token, storedPosts.length]);

  const handlePostClick = (postId) => {
    if (token) {
      axios.get(`https://react-assignment-api.mallow-tech.com/api/public/posts/${postId}`, {
        headers: {
          'Authorization': token,
        },
      })
        .then((response) => {
          setSelectedPost(response.data);
          dispatch(fetchSinglePost(postId));
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
    const filteredPosts = storedPosts.filter(post =>
      post.name.toLowerCase().includes(value.toLowerCase())
    );
    setSearchedPosts(filteredPosts);
  };

  const postsToDisplay = searchedPosts.length > 0 ? searchedPosts : storedPosts;

  return (
    <div className="dashboard-container">
      <TopBar />
      <div className="content-container">
        <div className="left-panel">
          <h2>DashboardBlogs</h2>
          <Input.Search
            placeholder="Search by post title"
            onSearch={(value) => handleSearch(value)}
            style={{ width: 200, marginBottom: 20 }}
          />
          {postsToDisplay && postsToDisplay.length > 0 && postsToDisplay.map((post) => (
            <div key={post.id} onClick={() => handlePostClick(post.id)} className="post-item">
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
          ) : (
            error ? (
              <p>Error: {error}</p>
            ) : selectedPost ? (
              <div>
                <div className="user-info">
                  {selectedPost.user && selectedPost.user.profile_url ? (
                    <Avatar src={selectedPost.user.profile_url} />
                  ) : (
                    <Avatar icon="user" />
                  )}
                  <span className="user-name">{selectedPost.user?.first_name || 'Anonymous'}</span>
                </div>
                <div className="post-details">
                 
                  <img src={selectedPost.image_url} alt="Post" className="post-image" />
                  <h2 className="post-title">{selectedPost.name}</h2>
                  <p className="post-content">{selectedPost.content}</p>
                </div>
              </div>
            ) : (
              <p>No post selected</p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
