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

function App() {
  // const [showLogin, setShowLogin] = useState(false);

  const [page, setPage] = useState(
    localStorage.getItem("token") ? "dashboard" : "login",
  );

  // const firstName = "Programming Fields";
  // const technology = "React";

  // const user = {
  //   firstName: "Programming Fields",
  //   technology: "Full stack Devs.",
  // };

  // function showAlert() {
  //   alert("Alert from Parent");
  // }

  return (
    <>
      {/* <Header />
      <h1>Hey this is App component!</h1> */}

      {/* Passing STATIC PROPS */}
      {/* <UserCard firstname="Programming Fields" technology="React" /> */}

      {/* Passing DYNAMIC PROPS */}
      {/* <UserCard firstname={firstName} technology={technology} />
      <UserCard firstname={user.firstName} technology={user.technology} />
      <UserCard /> */}

      {/* <Button clickHandle={ () => alert('Alert from Parent') } /> */}
      {/* <Button clickHandle={showAlert} /> */}

      {/* <Counter /> */}

      {/* <Posts /> */}

      {/* <Registration /> */}
      {/* <Uncontrolled /> */}

      {/* <Login /> */}

      <div>
        {/* {showLogin ? <Login /> : <Registration />} */}

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
      </div>
    </>
  );
}

export default App;
