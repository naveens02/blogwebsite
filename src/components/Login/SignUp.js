import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './SignIn.css';
import RightSVG from './Right.svg';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [validationErrors, setValidationErrors] = useState({});

  const onFinish = async (values) => {
    try {
      const apiUrl = "https://react-assignment-api.mallow-tech.com/api/register";

      const requestData = {
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        password: values.password,
        password_confirmation: values.confirmPassword,
      };

      const response = await axios.post(apiUrl, requestData, {
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
      });

      if (response.status === 200) {
        message.success('Registration successful. You can now sign in.');
        console.log("Registration successful", response.data);

        
        navigate('/signin');
      } else {
        message.error('Registration failed. Please try again.');
        console.error("Registration failed", response.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        if (error.response.data && error.response.data.errors) {
          const validationErrors = error.response.data.errors;
          setValidationErrors(validationErrors);
        }
      } else {
        message.error('Error during registration. Please try again.');
        console.error("Error during registration", error);
      }
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <Form
          form={form}
          name="signup"
          onFinish={onFinish}
          className="signin-form"
        >
          <div className="form-content">
            <h1>Create an Account</h1>
            <Form.Item
              name="firstName"
              rules={[{ required: true, message: 'Please input your first name!' }]}
            >
              <Input placeholder="First Name" />
            </Form.Item>
            <Form.Item
              name="lastName"
              rules={[{ required: true, message: 'Please input your last name!' }]}
            >
              <Input placeholder="Last Name" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]
            }>
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]
            }>
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              dependencies={['password']}
              hasFeedback
              rules={[
                { required: true, message: 'Please confirm your password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject('The two passwords do not match!');
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm Password" />
            </Form.Item>
            {Object.keys(validationErrors).map(field => (
              <p key={field} style={{ color: 'red' }}>{validationErrors[field]}</p>
            ))}
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Sign Up
              </Button>
            </Form.Item>
            <Form.Item>
              <span>Already have an account? </span>
              <Link to="/signin">
                <Button type="link">Sign In</Button>
              </Link>
            </Form.Item>
          </div>
        </Form>
        <div className="right-svg" style={{ backgroundImage: `url(${RightSVG})` }}></div>
      </div>
    </div>
  );
};

export default Signup;
