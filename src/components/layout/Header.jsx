import { Navigation } from "./Navigation"; // export const Navigation = () => {}
// import Navigation from "./Navigation"; // export default Navigation; hunda matra kaam garcha.
import { Button } from "../ui/Button";

function Header() {
  return (
    <>
      <h1>This is a header component in React</h1>
      <Navigation />
      <Button />
      <Button label="Submit" />
    </>
  );
}

export default Header;
