import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { DotLoader } from 'react-spinners';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <DotLoader color="#0369a1" size={60} />
      </div>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute; 