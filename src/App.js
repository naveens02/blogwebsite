// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './components/Login/SignIn';
import SignUp from './components/Login/SignUp';
import Dashboard from './components/Home/Dashboard';
import Post from './components/Home/Post';
import PrivateRoutes from './Redux/PrivateRoutes';
import { Provider } from 'react-redux';
import store from './Redux/store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<PrivateRoutes />}>
            <Route element={<Dashboard />} path="/dashboard" />
            <Route element={<Post />} path="/post" />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
