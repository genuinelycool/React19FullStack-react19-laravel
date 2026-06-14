import { NavLink } from "react-router";

export const Sidebar = () => {
  return (
    <aside className="w-60 bg-gray-900 text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>

      <nav>
        <NavLink to="/dashboard" className="block hover:text-blue-400 p-2 my-1">
          Dashboard
        </NavLink>
        <NavLink className="block hover:text-blue-400 p-2 my-1">
          Users (coming soon)
        </NavLink>
        <NavLink className="block hover:text-blue-400 p-2 my-1">
          Posts (coming soon)
        </NavLink>
      </nav>
    </aside>
  );
};
