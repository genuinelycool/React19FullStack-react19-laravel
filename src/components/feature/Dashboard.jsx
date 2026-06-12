import { useEffect, useState } from "react";

export const Dashboard = ({ setPage }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getProfile();
  }, []);

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
        setPage("login");

        return;
      }

      const response = await apiResponse.json();
      setUser(response.data);
    } catch (error) {
      console.error("Profile error", error);
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
          </>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>
    </div>
  );
};
