import { NavLink } from "react-router";

export const Sidebar = () => {
  return (
    <aside className="w-60 bg-gray-900 text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-3">Admin Dashboard</h2>

      {/* Divider */}
      <div className="border-b border-gray-700 mb-4"></div>

      <nav>
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `block rounded m-1 px-3 py-2 ${isActive ? "bg-gray-700" : "hover:bg-gray-700"} `
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/dashboard/users"
          className={({ isActive }) =>
            `block rounded m-1 px-3 py-2 ${isActive ? "bg-gray-700" : "hover:bg-gray-700"} `
          }
        >
          Users
        </NavLink>
        <NavLink
          to="/dashboard/posts"
          className={({ isActive }) =>
            `block rounded m-1 px-3 py-2 ${isActive ? "bg-gray-700" : "hover:bg-gray-700"} `
          }
        >
          Posts (coming soon)
        </NavLink>
      </nav>
    </aside>
  );
};
