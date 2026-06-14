import { useParams } from "react-router";

export const Profile = () => {
  const { id } = useParams();

  console.log(id);

  return <h3>User Profile</h3>;
};
