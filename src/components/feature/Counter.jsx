import { useState } from "react";

export const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);

    console.log(count);
  };
  //   console.log(count);

  return (
    <>
      <h1>Counter: {count}</h1>
      <button onClick={increment}>Increment</button>
    </>
  );
};
