import { Counter } from "./components/feature/Counter";
import { UserCard } from "./components/feature/UserCard";
import Header from "./components/layout/Header";
import { Button } from "./components/ui/Button";
import { Posts } from "./components/feature/Posts";
import { Registration } from "./components/feature/Registration";
import { Uncontrolled } from "./components/feature/Uncontrolled";

function App() {
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

      <Registration />
      {/* <Uncontrolled /> */}
    </>
  );
}

export default App;
