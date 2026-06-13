import { Navigate, Outlet } from "react-router";

export const PublicRoutes = () => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};
