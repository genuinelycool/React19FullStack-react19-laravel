import { Counter } from "./components/feature/Counter";
import { UserCard } from "./components/feature/UserCard";
import Header from "./components/layout/Header";
import { Button } from "./components/ui/Button";
import { Posts } from "./components/feature/Posts";
import { Registration } from "./components/feature/Registration";
import { Uncontrolled } from "./components/feature/Uncontrolled";
import { Login } from "./components/feature/Login";
import { useState } from "react";
import { Dashboard } from "./components/feature/Dashboard";
import { Route, Routes } from "react-router";

function App() {
  const [page, setPage] = useState(
    localStorage.getItem("token") ? "dashboard" : "login",
  );

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

      {/* <div>

        {page === "register" && <Registration setPage={setPage} />}
        {page === "login" && <Login setPage={setPage} />}
        {page === "dashboard" && <Dashboard setPage={setPage} />}

        {(page === "register" || page === "login") && (
          <div className="text-center">
            {page === "login" ? (
              <p>
                Don't have an account?{" "}
                <button
                  className="text-blue-600 underline cursor-pointer"
                  onClick={() => setPage("register")}
                >
                  Register
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button
                  className="text-blue-600 underline cursor-pointer"
                  onClick={() => setPage("login")}
                >
                  Login
                </button>
              </p>
            )}
          </div>
        )}
      </div> */}
    </>
  );
}

export default App;
