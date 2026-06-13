import { Registration } from "./components/feature/Registration";
import { Login } from "./components/feature/Login";
import { Dashboard } from "./components/feature/Dashboard";
import { Route, Routes } from "react-router";
import { ProtectedRoutes } from "./routes/ProtectedRoutes";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoutes />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
