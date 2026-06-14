import { Registration } from "./pages/auth/Registration";
import { Login } from "./pages/auth/Login";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { Route, Routes } from "react-router";
import { ProtectedRoutes } from "./routes/ProtectedRoutes";
import { PublicRoutes } from "./routes/PublicRoutes";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { Profile } from "./pages/dashboard/Profile";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicRoutes />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoutes />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/Profile/:id" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
