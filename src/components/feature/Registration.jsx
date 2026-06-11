import { useState } from "react";

export const Registration = () => {
  const [errors, setErrors] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [serverResponse, setServerResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Initial values from form inputs
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handle change function
  const handleChange = (e) => {
    const { name, value } = e.target;

    console.log(name, value);

    setFormData({ ...formData, [name]: value });
  };

  // Handle submit
  // const handleSubmit = (e) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const isValid = validateForm();

    console.log(errors);

    if (!isValid) return;

    // ------------

    setIsLoading(true);

    setIsFormSubmitted(true);

    console.log(formData);

    try {
      // fetch("https://jsonplaceholder.typicode.com/users", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(formData),
      // })
      //   .then((response) => response.json())
      //   .then((data) => console.log(data));

      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword
      }

      const response = await fetch(
        "http://localhost:8000/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );
      const data = await response.json();
      console.log(data);

      // setServerResponse("User Registered successfully!");
      setServerResponse(data.message);
      setIsLoading(false);
    } catch (error) {
      console.log("API Error: ", error);
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    let newErrors = {};

    // Full name - Required
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter your full name";
    }

    // Email - Required + Email Format
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password - Required + Min length
    if (!formData.password.trim()) {
      newErrors.password = "Please enter your password";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 chars long";
    }

    // Confirm Password - Required + Confirm
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password != formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-8 border-b pb-4 border-gray-300 text-center">
          Registration Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full name */}
          <div>
            <label
              htmlFor="full-name"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              id="full-name"
              type="text"
              onChange={handleChange}
              name="fullName"
              value={formData.fullName}
              placeholder="Enter full name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />

            {/* Validation errors */}
            {errors.fullName && (
              <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              // type="email"
              type="text"
              onChange={handleChange}
              name="email"
              value={formData.email}
              placeholder="Enter email address"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />

            {/* Validation errors */}
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              onChange={handleChange}
              name="password"
              value={formData.password}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />

            {/* Validation errors */}
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm password */}
          <div>
            <label
              htmlFor="confirm-password"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="confirm-password"
              type="password"
              onChange={handleChange}
              name="confirmPassword"
              value={formData.confirmPassword}
              placeholder="Re-enter your password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />

            {/* Validation errors */}
            {errors.confirmPassword && (
              <p className="text-red-600 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit button */}
          <div className="pt-4">
            <button
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>

        {/* Server Response */}
        {serverResponse && (
          <p className="mt-4 text-center text-green-800 bg-green-400 rounded p-1">
            {serverResponse}
          </p>
        )}

        {/* Form preview */}
        {isFormSubmitted && (
          <div className="mt-6 bg-gray-50 p-4 rounded-md border border-gray-300 space-y-4">
            <h3 className="font-semibold mb-5 border-b border-gray-300 pb-2">
              Form Preview
            </h3>
            <h4>Full Name: {formData.fullName}</h4>
            <h4>Email: {formData.email}</h4>
          </div>
        )}
      </div>
    </div>
  );
};
