import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Redux/authSlice';
import { Layout, Avatar, Menu, Dropdown, Space } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import Logo from './Logo.svg';
import EditProfile from './EditProfile';
import './TopBar.css';

const { Header } = Layout;

const TopBar = () => {
  const userData = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileData, setProfileData] = useState({});
  const UserData = localStorage.getItem('UserData');

  useEffect(() => {
    if (UserData.isAuthenticated) {
      setProfileData(UserData);
    } else {
      const userDataString = localStorage.getItem('UserData');

      if (userDataString) {
        const userDataFromLocalStorage = JSON.parse(userDataString);
        setProfileData(userDataFromLocalStorage);
      } else {
        setProfileData({});
      }
    }
  }, [UserData]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/signin');
  };

  const updateProfileInContainer = (first_name, lastName, image) => {
    const updatedProfile = {
      ...profileData,
      firstName: first_name,
      last_name: lastName,
      profile_Pic: image,
    };
    setProfileData(updatedProfile);
  };

  const menu = (
    <Menu>
      <Menu.Item
        key="Profile"
        onClick={() => {
          isModalOpen ? setIsModalOpen(false) : setIsModalOpen(true);
        }}
        icon={<UserOutlined />}
      >
        Profile
      </Menu.Item>
      <Menu.Item key="Logout" onClick={handleLogout} icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );

  const profilePic = profileData.profile_Pic ? (
    <Avatar src={profileData.profile_Pic} />
  ) : (
    <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
  );

  const firstName = UserData.firstName || profileData.firstName || 'Guest';

  return (
    <Layout>
      <Header className="top-bar">
        <div className="logo-section">
          <div className="logo">
            <img
              src={Logo}
              alt="Logo"
              style={{
                width: '88px',
                height: '24px',
                transform: 'rotate(0deg)',
              }}
            />
          </div>
          <div className="menu-links">
            <Link
              to="/dashboard"
              className={`menu-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
            >
              Dashboard
            </Link>
            <Link
              to="/post"
              className={`menu-link ${location.pathname === '/post' ? 'active' : ''}`}
            >
              Post
            </Link>
          </div>
        </div>
        {userData.isAuthenticated && (
          <Dropdown overlay={menu} trigger={['hover']}>
            <Link to="#" className="user-profile">
              <Space size="small">
                {profilePic}
                <span style={{ color: 'white' }}>{firstName}</span>
              </Space>
            </Link>
          </Dropdown>
        )}
      </Header>
      <EditProfile
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        updateProfileInContainer={updateProfileInContainer}
        userData={userData}
      />
    </Layout>
  );
};

export default TopBar;
