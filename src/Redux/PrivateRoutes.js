import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = ({ messageApi }) => {
  const loginData = sessionStorage.getItem('login');
  const isAuthenticated = useSelector(state => {

    return state.auth ? state.auth.isAuthenticated : false;
  });

  
  const isLoggedIn = loginData || isAuthenticated;

  return isLoggedIn ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoutes;
