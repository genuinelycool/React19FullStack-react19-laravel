import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const Dashboard = ({ setPage }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getProfile();
  }, []);

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

      if (apiResponse.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");

        return;
      }

      const response = await apiResponse.json();
      setUser(response.data);
    } catch (error) {
      console.error("Profile error", error);
    }
  };

  // Logout
  const logout = async () => {
    try {
      const apiResponse = await fetch("http://localhost:8000/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // if (apiResponse.status === 401) {
      //   localStorage.removeItem("token");
      //   navigate("/login");

      //   return;
      // }

      await apiResponse.json();

      navigate("/login");
      localStorage.removeItem("token");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl text-center">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

        {user ? (
          <>
            <p>
              Welcome, <strong>{user.name} </strong>
            </p>
            <p>{user.email}</p>
            <button
              onClick={logout}
              className="mt-4 cursor-pointer bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>
    </div>
  );
};
