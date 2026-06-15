import { Outlet } from "react-router";
import { Header } from "../components/common/Header";
import { Sidebar } from "../components/common/Sidebar";
import { useAuth } from "../context/AuthContext";

export const DashboardLayout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex">
      {/* Sidebar with Navigation */}
      <Sidebar />

      <div className="flex-1 main-h-screen bg-gray-100">
        {/* Header */}
        <Header user={user} logout={logout} />

        {/* Main Content Area */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
