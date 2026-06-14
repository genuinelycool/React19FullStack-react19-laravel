export const Header = ({ user, logout }) => {
  return (
    <header className="flex justify-between items-center bg-white shadow px-6 py-3">
      <h1 className="text-lg font-semibold">Dashboard</h1>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <p>
              Welcome, <strong>{user.name} </strong>
            </p>

            <button
              onClick={logout}
              className="cursor-pointer bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>
    </header>
  );
};
