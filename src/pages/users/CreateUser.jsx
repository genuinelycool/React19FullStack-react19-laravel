import { useForm } from "react-hook-form";
import { userService } from "../../services/userService";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";

export const CreateUser = () => {
  const { register, handleSubmit } = useForm();
  const { token } = useAuth();
  const navigate = useNavigate();

  //   Form submit
  const submitForm = async (data) => {
    try {
      await userService.createUser(data, token);
      navigate("/dashboard/users");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="bg-white shadow rounded p-6 w-full max-w-xl">
        <h2 className="text-xl font-semibold mb-4">Create User</h2>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit(submitForm)}>
          <div>
            <input
              {...register("fullName")}
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <input
              {...register("email")}
              type="text"
              placeholder="Email Address"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <input
              {...register("password_confirmation")}
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
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
