import { Registration } from "./pages/auth/Registration";
import { Login } from "./pages/auth/Login";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { Route, Routes } from "react-router";
import { ProtectedRoutes } from "./routes/ProtectedRoutes";
import { PublicRoutes } from "./routes/PublicRoutes";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { Profile } from "./pages/dashboard/Profile";
import { AuthProvider } from "./context/AuthContext";
import { UsersList } from "./pages/users/UsersList";
import { CreateUser } from "./pages/users/CreateUser";
import { ViewUser } from "./pages/users/ViewUser";
import { ToastProvider } from "./context/ToastContext";

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
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
              <Route path="/dashboard/Profile" element={<Profile />} />

              {/* Users Route */}
              <Route path="/dashboard/users" element={<UsersList />} />
              <Route path="/dashboard/users/create" element={<CreateUser />} />
              <Route
                path="/dashboard/users/:id/edit"
                element={<CreateUser />}
              />
              <Route path="/dashboard/users/:id" element={<ViewUser />} />
            </Route>
          </Route>
        </Routes>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
