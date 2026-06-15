import { Link } from "react-router";
import { getInitials } from "../../helpers/getInitials.js";
import { useState } from "react";

export const Header = ({ user, logout }) => {
  const [open, setOpen] = useState(false);

  return (
    <header className="flex justify-between items-center bg-white shadow px-6 py-3">
      <h1 className="text-lg font-semibold">Dashboard</h1>

      {/* Profile dropdown */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="cursor-pointer w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold"
        >
          {getInitials(user.name)}
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white shadow rounded border border-gray-100">
            <Link
              to="/dashboard/profile"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              My Profile
            </Link>

            {/* Logout */}
            <button
              onClick={logout}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 cursor-pointer"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
