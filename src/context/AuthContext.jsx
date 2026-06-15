import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  //   const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile();
  }, []);

  // Profile
  const getProfile = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

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
        setUser(null);
        navigate("/login");
        setLoading(false);
        return;
      }

      const response = await apiResponse.json();

      setUser(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Profile error", error);
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    try {
      const apiResponse = await fetch("http://localhost:8000/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          accept: "application/json",
        },
      });

      await apiResponse.json();

      setUser(null);
      navigate("/login");
      localStorage.removeItem("token");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, getProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
