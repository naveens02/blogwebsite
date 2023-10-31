import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Spin } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import RightSVG from './Right.svg';
import './SignIn.css';
import { loginSuccess } from '../../Redux/authSlice';

const SignIn = ({ messageApi }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [errorData, setErrorData] = useState('');
  const [loading, setLoading] = useState(false); 

  const apiUrl = 'https://react-assignment-api.mallow-tech.com/api/login';

  const handleLogin = async (values) => {
    setLoading(true); 
    const requestData = {
      email: values.email,
      password: values.password,
    };
    try {
      const response = await axios.post(apiUrl, requestData, {
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
      });

      if (response.status === 200) {
        if (messageApi) messageApi.info('Login successful');
        dispatch(loginSuccess({ token: response.data }));
        sessionStorage.setItem('login', JSON.stringify(response.data));
        navigate('/dashboard');
      } else {
        if (messageApi) messageApi.error('Login Failed');
        console.error('Login failed');
      }
    } catch (error) {
      if (messageApi) messageApi.error('Login Failed');
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

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
           
          </Form.Item>
          {loading && <Spin />}
          <Form.Item>
            <Button type="primary" htmlType="submit" >
              {loading ?<>Signing In... </>  : 'Sign In'}
             
            </Button>
          </Form.Item>

          <Form.Item>
            <span className="">Don't have an account? </span>
            <Link to="/signup">Sign Up</Link>
          </Form.Item>
        </div>
        <span
          type="danger"
          style={{ textAlign: 'center', fontSize: '14px', fontWeight: '400' }}
        >
          {errorData}
        </span>
      </Form>

      <div className="right-svg" style={{ backgroundImage: `url(${RightSVG})` }}>
       
       
      </div>
    </div>
  );
};

export default SignIn;
