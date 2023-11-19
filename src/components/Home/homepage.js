import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopBar from './TopBar';
import Dashboard from './Dashboard'; 
import Post from './Post'; 
const homepage = () => {
  return (
    <Router>
      <TopBar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/post" element={<Post />} /> 
      </Routes>
    </Router>
  );
};

export default homepage;
