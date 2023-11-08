import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, fetchSinglePost } from '../../Redux/posts/postsActions';
import TopBar from './TopBar';
import axios from 'axios';

const getToken = () => {
  return localStorage.getItem('Token');
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const selectedPost = useSelector((state) => state.posts.selectedPost);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts'));
    if (storedPosts) {
      dispatch(fetchPosts.fulfilled(storedPosts));
    } else {
      const token = getToken();
      axios.get('https://react-assignment-api.mallow-tech.com/api/public/posts', {
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': token,
          }
        })
        .then((response) => {
          console.log(response);
          dispatch(fetchPosts.fulfilled(response.data));
          setLoading(false);
          localStorage.setItem('posts', JSON.stringify(response.data));
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    }
  }, [dispatch]);

  const handlePostClick = (postId) => {
    dispatch(fetchSinglePost(postId));
  };

  return (
    <div>
      <TopBar />
      <div className="left-panel">
        <h2>DashboardBlogs</h2>
        {posts && posts.length > 0 && posts.map((post) => (
          <div key={post.id} onClick={() => handlePostClick(post.id)}>
            {post.name}
          </div>
        ))}
      </div>
      <div className="right-panel">
        {loading ? (
          <p>Loading data...</p>
        ) : (
          selectedPost && (
            <div>
              <h2>{selectedPost.name}</h2>
              <p>{selectedPost.content}</p>
              {/* Display image and other details */}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Dashboard;
