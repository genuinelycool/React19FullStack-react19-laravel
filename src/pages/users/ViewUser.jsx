import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { userService } from "../../services/userService";
import { useAuth } from "../../context/AuthContext";
import { BackButton } from "../../components/ui/BackButton";

export const ViewUser = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    userService.getUser(id, token).then((user) => {
      setUser(user);
    });
  }, [id]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="flex justify-center">
      <div className="bg-white shadow rounded p-6 w-full max-w-xl">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold">User Details</h2>
          <BackButton />
        </div>

        <div className="space-y-3">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {user.created_at
              ? new Date(user.created_at).toLocaleDateString()
              : ""}
          </p>
        </div>
      </div>
    </div>
  );
};
