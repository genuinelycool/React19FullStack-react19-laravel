import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { userService } from "../../services/userService";
import { Link, useSearchParams } from "react-router";
import { ConfirmDialog } from "../../components/ui/ConfirmDialog";
import { Toast } from "../../components/ui/Toast";
import { useToast } from "../../context/ToastContext";
import { Pagination } from "../../components/ui/Pagination";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

export const UsersList = () => {
  const [users, setUsers] = useState();
  const { token } = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { showToast } = useToast();
  const [pagination, setPagination] = useState({});

  // console.log(useSearchParams());
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(searchParams.get("page") || 1);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "");
  const [order, setOrder] = useState(searchParams.get("order") || "desc");

  // console.log(
  //   "searchParams",
  //   searchParams.get("search"),
  //   searchParams.get("page"),
  // );

  // console.log("search", search);

  useEffect(() => {
    const params = {};

    // Search and Pagination
    if (search) params.search = search;
    if (page > 1) params.page = page;

    // Sort and Order
    if (sort) params.sort = sort;
    if (sort && order) params.order = order;

    setSearchParams(params);

    if (search) {
      const delay = setTimeout(() => {
        fetchUsers();
      }, 500);
      return () => clearTimeout(delay);
    } else {
      fetchUsers();
    }
  }, [page, search, sort, order]);

  // Fetch Users
  const fetchUsers = async () => {
    const res = await userService.getUsers(token, page, search, sort, order);
    setUsers(res.data);
    setPagination(res);
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
      const response = await userService.deleteUser(selectedUserId, token);

      // Use Toast
      showToast(response.message, response.success ? "success" : "error");

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

  // Render sort icons
  const renderSortIcons = (column) => {
    const isActive = sort == column;

    return (
      <span className="flex flex-col ml-1">
        <ChevronUpIcon
          className={`w-5 h-5 ${isActive && order === "asc" ? "text-gray-900" : "text-gray-400"}`}
        />
        <ChevronDownIcon
          className={`w-5 h-5 ${isActive && order === "desc" ? "text-gray-900" : "text-gray-400"}`}
        />
      </span>
    );
  };

  // Handle sort/order
  const handleSort = (column) => {
    if (sort === column) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setOrder("desc");
      setSort(column);
    }
  };

  console.log("sort", sort, "order", order);

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
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold mb-4">Users List</h2>

          <div className="flex items-center gap-3">
            {/* Search filter */}
            <input
              type="text"
              value={search}
              placeholder="Search users..."
              className="w-full max-w-sm px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />

            {/* Clear Button */}
            {search && (
              <button
                onClick={() => {
                  setSearch("");
                  setPage(1);
                }}
                className="px-3 py-2 bg-gray-600 text-white cursor-pointer hover:bg-gray-700 rounded"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Users Listing */}
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th
                onClick={() => handleSort("id")}
                className="cursor-pointer border border-gray-200 p-2 text-left"
              >
                <div className="flex items-center gap-1 group">
                  ID {renderSortIcons("id")}
                </div>
              </th>
              <th
                onClick={() => handleSort("name")}
                className="cursor-pointer border border-gray-200 p-2 text-left"
              >
                <div className="flex items-center gap-1 group">
                  Name {renderSortIcons("name")}
                </div>
              </th>
              <th
                onClick={() => handleSort("email")}
                className="cursor-pointer border border-gray-200 p-2 text-left"
              >
                <div className="flex items-center gap-1 group">
                  Email {renderSortIcons("email")}
                </div>
              </th>
              <th
                onClick={() => handleSort("created_at")}
                className="cursor-pointer border border-gray-200 p-2 text-left"
              >
                <div className="flex items-center gap-1 group">
                  Created At {renderSortIcons("created_at")}
                </div>
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
                        to={`/dashboard/users/${user.id}`}
                        className="bg-sky-600 hover:bg-sky-700 text-white px-3 py-1 rounded cursor-pointer"
                      >
                        View
                      </Link>

                      <Link
                        to={`/dashboard/users/${user.id}/edit`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded cursor-pointer"
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

        {/* Custom Pagination */}
        <Pagination
          currentPage={pagination.current_page}
          lastPage={pagination.last_page}
          onPageChange={(page) => setPage(page)}
          from={pagination.from}
          to={pagination.to}
          total={pagination.total}
        />
      </div>

      {/* Confirm Dialog Component */}
      <ConfirmDialog
        open={dialogOpen}
        onCancel={() => setDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
      />

      {/* Toast */}
      {/* <Toast /> */}
    </>
  );
};
