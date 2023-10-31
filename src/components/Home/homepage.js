import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopBar from './TopBar';
import Dashboard from './Dashboard'; // Your Dashboard component
import Post from './Post'; // Your Post component

const homepage = () => {
  return (
    <Router>
      <TopBar /> {/* Render the TopBar component */}
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} /> {/* Dashboard route */}
        <Route path="/post" element={<Post />} /> {/* Post route */}
      </Routes>
    </Router>
  );
};

export default homepage;
