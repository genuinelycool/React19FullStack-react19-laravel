import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { userService } from "../../services/userService";
import { Link, useSearchParams } from "react-router";
import { ConfirmDialog } from "../../components/ui/ConfirmDialog";
import { Toast } from "../../components/ui/Toast";
import { useToast } from "../../context/ToastContext";
import { Pagination } from "../../components/ui/Pagination";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

export const UsersList = () => {
  const [users, setUsers] = useState([]);
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
  const [status, setStatus] = useState(searchParams.get("status") || "");
  const [selectedUsers, setSelectedUsers] = useState([]);

  // Create ref
  const controllerRef = useRef(null);

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

    // Filter
    if (status) params.status = status;

    setSearchParams(params);

    // if (search) {
    //   const delay = setTimeout(() => {
    //     fetchUsers();
    //   }, 500);
    //   return () => clearTimeout(delay);
    // } else {
    //   fetchUsers();
    // }
    fetchUsers();
  }, [page, search, sort, order, status]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, []);

  // Fetch Users
  const fetchUsers = async () => {
    // Cancel the previous request
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    // Create new controller
    const controller = new AbortController();
    controllerRef.current = controller;

    console.log("controller", controller);

    try {
      const res = await userService.getUsers(
        token,
        page,
        search,
        sort,
        order,
        status,
        controller.signal,
      );
      setUsers(res.data);
      setPagination(res);
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Fetch users error: ", error);
      }
    }
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

  // console.log("sort", sort, "order", order);

  // Toggle Status
  const toggleUserStatus = async (id) => {
    try {
      const response = await userService.toggleStatus(id, token);

      // Use Toast
      showToast(response.message, response.success ? "success" : "error");

      // Refresh the users listing state
      fetchUsers();

      // setUsers((prevUsers) =>
      //   prevUsers.map((user) =>
      //     user.id === id ? { ...user, status: response.data.status } : user,
      //   ),
      // );
    } catch (error) {
      console.error("Toggle status error", error);
    }
  };

  // Handle Select All
  const handleSelectAll = (checked) => {
    // console.log("checked", checked);

    if (checked) {
      // console.log(users.map((user) => user.id));

      setSelectedUsers(users.map((user) => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  // Handle Single Select User
  const handleSelectUser = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((userId) => userId != id) : [...prev, id],
    );
  };

  // Bulk delete users
  const bulkDeleteUsers = async () => {
    try {
      const response = await userService.bulkDeleteUser(selectedUsers, token);

      // Use Toast
      showToast(response.message, response.success ? "success" : "error");

      // Refresh the users listing state
      fetchUsers();
      setSelectedUsers([]);
    } catch (error) {
      console.error("Toggle status error", error);
    }
  };

  console.log("selected users", selectedUsers);

  return (
    <>
      <div className="flex justify-end mb-4">
        <Link
          to="/dashboard/users/create"
          className="cursor-pointer bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded"
        >
          Create User
        </Link>
      </div>
      <div className="bg-white shadow rounded p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold mb-4">Users List</h2>

          <div className="flex items-center gap-3">
            {/* Bulk Delete Action Button */}
            {selectedUsers.length > 0 && (
              <button
                onClick={bulkDeleteUsers}
                className="cursor-pointer h-[40px] w-full bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete Users ({selectedUsers.length})
              </button>
            )}

            {/* Dropdown for Status filter */}
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">All</option>
              <option value="1">Active</option>
              <option value="0">In-active</option>
            </select>

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
                  setStatus("");
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
              {/* Select All */}
              <th className="border border-gray-200 p-2 text-left">
                <div className="flex items-center gap-1 group">
                  <input
                    type="checkbox"
                    className="w-5 h-5 cursor-pointer accent-blue-500"
                    checked={selectedUsers.length === users.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </div>
              </th>

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

              <th
                onClick={() => handleSort("status")}
                className="cursor-pointer border border-gray-200 p-2 text-left"
              >
                <div className="flex items-center gap-1 group">
                  Status {renderSortIcons("status")}
                </div>
              </th>

              <th className="border border-gray-200 p-2 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {users &&
              users.map((user) => (
                <tr key={user.id}>
                  {/* Checkbox - Select User */}
                  <td className="border border-gray-200 p-2 text-left">
                    <div className="flex items-center gap-1 group">
                      <input
                        type="checkbox"
                        className="w-5 h-5 cursor-pointer accent-blue-500"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleSelectUser(user.id)}
                      />
                    </div>
                  </td>

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

                  {/* Status */}
                  <td className="border border-gray-200 p-2 text-left">
                    <span
                      className={`px-2 py-1 rounded ${user.status === 1 ? "bg-green-200 text-green-700" : "bg-gray-200 text-gray-600"}`}
                    >
                      {user.status === 1 ? "Active" : "In-active"}
                    </span>
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

                      {/* Status Action */}
                      <button
                        onClick={() => toggleUserStatus(user.id)}
                        className={`${user.status === 1 ? "bg-yellow-600 hover:bg-yellow-700" : "bg-green-600 hover:bg-green-700"} text-white px-3 py-1 rounded cursor-pointer`}
                      >
                        {user.status === 1 ? "Deactivate" : "Activate"}
                      </button>

                      {/* Delete user */}
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded cursor-pointer"
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
