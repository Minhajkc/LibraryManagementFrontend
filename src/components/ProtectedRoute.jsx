import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/Admin" replace />;
  }
  return children;
};

export default ProtectedRoute;
