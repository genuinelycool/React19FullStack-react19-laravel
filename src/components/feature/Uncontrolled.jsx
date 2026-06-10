import { useRef } from "react";

export const Uncontrolled = () => {
  const fullNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(fullNameRef.current.value);

    const data = {
      fullName: fullNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Uncontrolled Component - Registration Form</h2>

      <input
        type="text"
        ref={fullNameRef}
        name="fullName"
        defaultValue=""
        placeholder="Enter full name"
      />
      <br />
      <br />

      <input
        type="email"
        ref={emailRef}
        name="email"
        placeholder="Enter email address"
      />
      <br />
      <br />

      <input
        type="password"
        ref={passwordRef}
        name="password"
        placeholder="Enter your password"
      />
      <br />
      <br />

      <button type="submit">Register</button>
    </form>
  );
};
