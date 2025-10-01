import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const ProtectedRouteWrapper = ({ children }) => {
  const { user, loading } = useAuth();

  // while restoring, don't redirect yet
  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRouteWrapper;