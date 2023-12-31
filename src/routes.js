
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from './components/Login/SignIn';
import SignUp from './components/Login/SignUp';
import Dashboard from './components/Home/Dashboard';
import Post from './components/Home/Post';
import PostPreview from './components/Home/PostPreview';
import PostEdit from './components/Home/PostEdit';
import PrivateRoutes from './Redux/PrivateRoutes';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route element={<PrivateRoutes />}>
        <Route element={<Dashboard />} path="/dashboard" />
        <Route element={<Post />} path="/post" />
        <Route path="/preview/:postId" element={<PostPreview />} />
        <Route path="/edit/:postId"  element={<PostEdit/>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
