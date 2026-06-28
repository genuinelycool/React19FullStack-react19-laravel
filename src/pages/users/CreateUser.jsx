import { useForm } from "react-hook-form";
import { userService } from "../../services/userService";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";

export const CreateUser = () => {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm();
  const { token } = useAuth();
  const navigate = useNavigate();

  // console.log(watch("password"));

  //   Form submit
  const submitForm = async (data) => {
    try {
      await userService.createUser(data, token);
      navigate("/dashboard/users");
    } catch (error) {
      // console.error(error.errors);

      if (error.errors) {
        Object.entries(error.errors).forEach(([field, messages]) => {
          // console.log("field", field, messages);
          setError(field, {
            type: "server",
            message: messages[0],
          });
        });
      }
    }
  };

  console.log("errors", errors);

  return (
    <div className="flex justify-center">
      <div className="bg-white shadow rounded p-6 w-full max-w-xl">
        <h2 className="text-xl font-semibold mb-4">Create User</h2>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit(submitForm)}>
          <div>
            <input
              {...register("fullName", {
                // required: true,
                required: "Full name is required",
                minLength: {
                  value: 5,
                  message: "Full name must be at least 5 chars long",
                },
              })}
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />

            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              {...register("email", {
                required: "Email address is required",
                pattern: {
                  value: /.+@.+\..+/,
                  message: "Please enter a valid email address",
                },
              })}
              type="text"
              placeholder="Email Address"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              {...register("password", {
                required: "Please enter your password",
                minLength: {
                  value: 6,
                  message: "The password must be 6 chars long",
                },
              })}
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <input
              {...register("password_confirmation", {
                required: "Please re-enter your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.password_confirmation && (
              <p className="text-red-500 text-sm">
                {errors.password_confirmation.message}
              </p>
            )}
          </div>

          {/* Submit button */}
          <div className="pt-4 flex justify-end">
            <button
              className="px-3 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
              type="submit"
            >
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
