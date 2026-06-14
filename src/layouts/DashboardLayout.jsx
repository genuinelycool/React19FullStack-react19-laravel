import { Outlet, useNavigate } from "react-router";
import { Header } from "../components/common/Header";
import { Sidebar } from "../components/common/Sidebar";
import { useEffect, useState } from "react";

export const DashboardLayout = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getProfile();
  }, []);

  // Logout
  const logout = async () => {
    try {
      const apiResponse = await fetch("http://localhost:8000/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      await apiResponse.json();

      navigate("/login");
      localStorage.removeItem("token");
    } catch (error) {
      console.error(error);
    }
  };

  // Profile
  const getProfile = async () => {
    const token = localStorage.getItem("token");

    try {
      const apiResponse = await fetch("http://localhost:8000/api/profile", {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const response = await apiResponse.json();
      setUser(response.data);
    } catch (error) {
      console.error("Profile error", error);
    }
  };

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
