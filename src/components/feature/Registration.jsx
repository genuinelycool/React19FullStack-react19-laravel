import { useState } from "react";

export const Registration = () => {
  // Initial values from form inputs
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  // Handle change function
  const handleChange = (e) => {
    const { name, value } = e.target;

    console.log(name, value);

    setFormData({ ...formData, [name]: value });
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Registration Form</h2>

        <input
          type="text"
          onChange={handleChange}
          name="fullName"
          value={formData.fullName}
          placeholder="Enter full name"
        />
        <br />
        <br />

        <input
          type="email"
          onChange={handleChange}
          name="email"
          value={formData.email}
          placeholder="Enter email address"
        />
        <br />
        <br />

        <input
          type="password"
          onChange={handleChange}
          name="password"
          value={formData.password}
          placeholder="Enter your password"
        />
        <br />
        <br />

        <button type="submit">Register</button>
      </form>

      <br />
      <br />

      <div>
        <h3>Form Preview</h3>
        <h4>Full Name: {formData.fullName}</h4>
        <h4>Email: {formData.email}</h4>
      </div>
    </div>
  );
};
