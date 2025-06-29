import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const isLoggedIn = localStorage.getItem("token"); // adjust based on your auth logic

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default RequireAuth;
