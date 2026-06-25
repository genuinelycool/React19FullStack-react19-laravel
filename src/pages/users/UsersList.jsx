import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { userService } from "../../services/userService";

export const UsersList = () => {
  const [users, setUsers] = useState();
  const { token } = useAuth();
  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    const data = await userService.getUsers(token);
    setUsers(data.data);
  };

  //   console.log(users);

  return (
    <div className="bg-white shadow rounded p-6">
      <h2 className="text-xl font-semibold mb-4">Users List</h2>

      {/* Users Listing */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 p-2 text-left">ID</th>
            <th className="border border-gray-200 p-2 text-left">Name</th>
            <th className="border border-gray-200 p-2 text-left">email</th>
            <th className="border border-gray-200 p-2 text-left">Created At</th>
            <th className="border border-gray-200 p-2 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user.id}>
                <td className="border border-gray-200 p-2 text-left">
                  {user.id}
                </td>
                <td className="border border-gray-200 p-2 text-left">
                  {user.name}
                </td>
                <td className="border border-gray-200 p-2 text-left">
                  {user.email}
                </td>
                <td className="border border-gray-200 p-2 text-left">
                  {new Date(user.created_at).toLocaleDateString()}
                </td>
                <td className="border border-gray-200 p-2 text-left">
                  <div className="flex gap-2">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded cursor-pointer">
                      Edit
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded cursor-pointer">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
