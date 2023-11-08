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
  const userData = useSelector((state) => state.auth); // Access user data from Redux state
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileData, setProfileData] = useState({}); // State to store user profile data

  useEffect(() => {
    if (userData.isAuthenticated) {
      // Set the profile data if the user is authenticated and user data is available
      setProfileData(userData);
    } else {
      // Retrieve UserData from localStorage
      const userDataString = localStorage.getItem('userData');

      if (userDataString) {
        // Parse the UserData string into an object
        const userDataFromLocalStorage = JSON.parse(userDataString);

        // Update the profile data with the retrieved data from localStorage
        setProfileData(userDataFromLocalStorage);
      } else {
        // If no user data found in local storage and user is not authenticated,
        // set an initial state for profileData
        setProfileData({});
      }
    }
  }, [userData]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token'); // Assuming 'token' is stored in localStorage
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

  const firstName = userData.first_name || profileData.first_name || 'Guest';

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
            <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>
              Dashboard
            </Link>
            <Link to="/post" className={location.pathname === '/post' ? 'active' : ''}>
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
