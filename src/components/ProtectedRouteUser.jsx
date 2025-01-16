import { Navigate } from "react-router-dom";

const ProtectedRouteUser = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRouteUser;
