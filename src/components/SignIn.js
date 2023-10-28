import { Form, Input, Button, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import RightSVG from '../Right.svg';
import './SignIn.css';

const SignIn = () => {
  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  return (
    <div className="container">
      <Form
        name="signin"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        className="signin-form"
      >
        <div className="form-content">
          <h1>Sign in to your account</h1>

          <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Link to="/forgot-password">Forgot password?</Link>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Sign In
            </Button>
          </Form.Item>

          <Form.Item>
            <span className=''>Don't have an account? </span>
            <Link to="/signup">Sign Up</Link>
          </Form.Item>
        </div>
      </Form>

      <div className="right-svg" style={{ backgroundImage: `url(${RightSVG})` }}></div>
    </div>
  );
};

export default SignIn;
