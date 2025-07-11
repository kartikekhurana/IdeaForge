import { useAuth } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const ProctectedRoute = ({ children }) => {
  const { currentUser, authLoading } = useAuth();
  const location = useLocation();
  if (authLoading) {
    return <div className='text-center mt-20'>Checking Auth...</div>;
  }
  if (!currentUser) {
    return <Navigate to='/login' />;
  }
  const isadminRoute = location.pathname.startsWith("/admin");
  if (isadminRoute && !currentUser.isAdmin) {
    return <Navigate to='/dashboard' />;
  }
  return children;
};

export default ProctectedRoute;
