import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { userService } from "../../services/userService";
import { Link } from "react-router";
import { ConfirmDialog } from "../../components/ui/ConfirmDialog";

export const UsersList = () => {
  const [users, setUsers] = useState();
  const { token } = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch Users
  const fetchUsers = async () => {
    const data = await userService.getUsers(token);
    setUsers(data.data);
  };

  // Delete User Function
  const deleteUser = (id) => {
    setSelectedUserId(id);
    setDialogOpen(true);
  };

  // Delete Confirmation
  const confirmDelete = async () => {
    try {
      // delete user function
      await userService.deleteUser(selectedUserId, token);

      // Refresh the users listing state
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== selectedUserId),
      );
    } catch (error) {
      console.error("Delete error", error);
    } finally {
      setDialogOpen(false);
      setSelectedUserId(null);
    }
  };

  // console.log("userid", selectedUserId);

  return (
    <>
      <div className="flex justify-end mb-4">
        <Link
          to="/dashboard/users/create"
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded"
        >
          Create User
        </Link>
      </div>
      <div className="bg-white shadow rounded p-6">
        <h2 className="text-xl font-semibold mb-4">Users List</h2>

        {/* Users Listing */}
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 p-2 text-left">ID</th>
              <th className="border border-gray-200 p-2 text-left">Name</th>
              <th className="border border-gray-200 p-2 text-left">email</th>
              <th className="border border-gray-200 p-2 text-left">
                Created At
              </th>
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

                  {/* Action Buttons */}
                  <td className="border border-gray-200 p-2 text-left">
                    <div className="flex gap-2">
                      <Link
                        to={`/dashboard/users/${user.id}/edit`}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded cursor-pointer"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Confirm Dialog Component */}
      <ConfirmDialog
        open={dialogOpen}
        onCancel={() => setDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
      />
    </>
  );
};
