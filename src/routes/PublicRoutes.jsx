import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

export const PublicRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) return null;

  return user ? <Navigate to="/dashboard" replace /> : <Outlet />;
};
