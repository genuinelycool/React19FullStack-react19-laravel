import { useEffect, useState } from "react";

export const Login = () => {
  const [errors, setErrors] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [serverResponse, setServerResponse] = useState({
    type: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Initial values from form inputs
  const [formData, setFormData] = useState({
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
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const isValid = validateForm();

    if (!isValid) return;

    // ------------

    setIsLoading(true);

    setIsFormSubmitted(true);

    console.log(formData);

    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        setErrors((prev) => ({
          ...prev,
          ...data.errors,
        }));

        // set toast message
        setServerResponse({
          type: "error",
          message: data.message,
        });

        setIsLoading(false);
        return;
      }

      // Reset errors
      setErrors({});

      // Token in local storage
      localStorage.setItem("token", data.token);

      //Success API Response
      setServerResponse({
        type: "success",
        message: data.message,
      });

      setIsLoading(false);
    } catch (error) {
      console.log("API Error: ", error);
      setIsLoading(false);
    }
  };

  // Hide Toaster
  useEffect(() => {
    if (!serverResponse.message) return;

    const timer = setTimeout(() => {
      setServerResponse({
        type: "",
        message: "",
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [serverResponse.message]);

  const validateForm = () => {
    let newErrors = {};

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

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-8 border-b pb-4 border-gray-300 text-center">
          Login Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
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

          {/* Submit button */}
          <div className="pt-4">
            <button
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>

        {/* Server Response */}
        {serverResponse.message && (
          <p
            className={`mt-4 text-center rounded p-1 border ${
              serverResponse.type === "error"
                ? "text-red-800 bg-red-200 border-red-300"
                : "text-green-800 bg-green-200 border-green-300"
            }`}
          >
            {serverResponse.message}
          </p>
        )}
      </div>
    </div>
  );
};
