import { Form, Input, Button, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import './SignIn.css'; // Ensure SignIn's CSS file is imported in the Signup component
import RightSVG from '../Right.svg';

const Signup = () => {
  const onFinish = (values) => {
    console.log('Received values:', values);
    // Add logic here to handle form submission, like sending the data to a server
  };

  return (
    <div className="container">
      <Form
        name="signup"
        onFinish={onFinish}
        className="signin-form" // Reusing the SignIn CSS class for consistent styling
      >
        <div className="form-content">
          <h1>Create an Account</h1>

          <Row gutter={16} className="signup-form-row">
            <Col span={12} className="signup-form-col">
              <Form.Item
                name="firstName"
                rules={[{ required: true, message: 'Please input your first name!' }]}
              >
                <Input placeholder="First Name" />
              </Form.Item>
            </Col>
            <Col span={12} className="signup-form-col">
              <Form.Item
                name="lastName"
                rules={[{ required: true, message: 'Please input your last name!' }]}
              >
                <Input placeholder="Last Name" />
              </Form.Item>
            </Col>
          </Row>

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

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Sign Up
            </Button>
          </Form.Item>

          <Form.Item>
            <span>Already have an account? </span>
            <Link to="/signin">Sign In</Link>
          </Form.Item>
        </div>
      </Form>
      <div className="right-svg" style={{ backgroundImage: `url(${RightSVG})` }}></div>
    </div>
  );
};

export default Signup;
