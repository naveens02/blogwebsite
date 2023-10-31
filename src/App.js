import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './components/Login/SignIn';
import SignUp from './components/Login/SignUp';
import Dashboard from './components/Home/Dashboard';
import Post from './components/Home/Post';
import PrivateRoutes from './Redux/PrivateRoutes';


import { Provider } from 'react-redux';
import store from './Redux/store';
import { message } from 'antd';

function App() {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <Provider store={store}>
      <Router>
        {contextHolder}
        <Routes>
          <Route path="/" element={<SignIn messageApi={messageApi} />} />
          <Route path="/signin" element={<SignIn messageApi={messageApi} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            element={<PrivateRoutes messageApi={messageApi} />}
          >
            <Route element={<Dashboard messageApi={messageApi} />} path="/dashboard" />
            <Route element={<Post messageApi={messageApi} />} path="/post" />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
