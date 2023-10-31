import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../Redux/authSlice";
import { Layout, Avatar, Menu, Dropdown, Space, Spin } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";

import Logo from "./Logo.svg";
import "./TopBar.css"; 

const { Header } = Layout;

const TopBar = () => {
  const userData = JSON.parse(sessionStorage.getItem("login"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

    const handleLogout = () => {
    dispatch(logout());
    sessionStorage.removeItem("login");
    navigate("/signin");
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

  return (
    <Layout>
      <Header className="top-bar">
        <div className="logo-section">
          <div className="logo">
            <img
              src={Logo}
              alt="Logo"
              style={{
                width: "88px",
                height: "24px",
                transform: "rotate(0deg)",
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
        {userData && (
          <Dropdown overlay={menu} trigger={["hover"]}>
            <Link to="#" className="user-profile">
              <Space size="small">
                {userData.profile_Pic ? (
                  <Avatar src={userData.profile_Pic} />
                ) : (
                  <Avatar style={{ backgroundColor: "#87d068" }} icon={<UserOutlined />} />
                )}
                <span style={{ color: "white" }}>{userData.first_name}</span>
              </Space>
            </Link>
          </Dropdown>
        )}
      </Header>
      {loading && (
        <div style={{ textAlign: "center", marginTop: 50 }}>
          <Spin size="large" />
        </div>
      )}
    </Layout>
  );
};

export default TopBar;
