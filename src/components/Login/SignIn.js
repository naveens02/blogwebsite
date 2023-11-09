import React, { useState } from 'react';
import { Form, Input, Button, message, Spin } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../Redux/authSlice';
import axios from 'axios';
import RightSVG from './Right.svg';
import './SignIn.css';

const SignIn = ({ messageApi }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [errorData, setErrorData] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const apiUrl = 'https://react-assignment-api.mallow-tech.com/api/login';

      const requestData = {
        email: values.email,
        password: values.password,
      };

      const response = await axios.post(apiUrl, requestData, {
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
      });
      console.log(response);
      if (response.status === 200) {
        const userData = {
          token: response.headers.authorization,
          isAuthenticated: true,
          firstName: response.data.first_name,
          lastName: response.data.last_name,
          profile_Pic: response.data.profile_url,
          // Add any other user data you want to store
        };

        dispatch(loginSuccess(userData));

        const token=response.headers.get('Authorization');
        localStorage.setItem('token',token);// Save user data in local storage
        localStorage.setItem('UserData', JSON.stringify(userData));
           
        message.success('Login successful');
        navigate('/dashboard');
      } else {
        message.error('Login Failed');
        console.error('Login failed');
      }
    } catch (error) {
      message.error('Login Failed');
      setErrorData('Wrong email/password');
      console.error('Error during login', error);
    } finally {
      setLoading(false);
    }
  };

  const onFinish = (values) => {
    handleLogin(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="container">
      <Form
        name="signin"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="signin-form"
      >
        <div className="form-content">
          <h1>Sign in to your account</h1>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          {loading && <Spin />}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </Form.Item>

          <Form.Item>
            <span className="">Don't have an account? </span>
            <Link to="/signup">Sign Up</Link>
          </Form.Item>

          <span
            type="danger"
            style={{ textAlign: 'center', fontSize: '14px', fontWeight: '400' }}
          >
            {errorData}
          </span>
        </div>
      </Form>
      <div className="right-svg" style={{ backgroundImage: `url(${RightSVG})` }}></div>
    </div>
  );
};

export default SignIn;
