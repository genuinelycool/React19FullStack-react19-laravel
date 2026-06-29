import { useNavigate } from "react-router";

export const BackButton = ({ label = "Back" }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="px-3 py-1.5 border border-gray-300 hover:bg-gray-100 rounded cursor-pointer"
    >
      {label}
    </button>
  );
};
