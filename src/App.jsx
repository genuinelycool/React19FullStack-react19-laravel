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
    </>
  );
}

export default App;
