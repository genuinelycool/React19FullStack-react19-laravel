import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoutes = () => {
  // console.log(useAuth());
  const { user, loading } = useAuth();

  if (loading) {
    return <p className="text-center mt-10">Checking authentication...</p>;
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};
