import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";


const PrivateRoutes = ({messageApi}) => {
  const login_data = sessionStorage.getItem("login");
  const auth_state = useSelector((state) => state.auth.isAuthenticated);
  const isAuthenticated = login_data ? true : auth_state;

  return isAuthenticated ? (
    <>
    
      <Outlet />
    </>
  ) : (
    <Navigate to="/signin" />
  );
};

export default PrivateRoutes;
