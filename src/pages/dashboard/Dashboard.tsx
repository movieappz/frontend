import { useEffect } from "react";
import { useUserStore } from "../../store/userStore";

export default function Dashboard() {
  const { user, isLoading, reloadUser } = useUserStore();

  useEffect(() => {
    if (!user && !isLoading) {
      reloadUser();
    }
  }, [user, isLoading, reloadUser]);

  console.log(user);

  if (isLoading) {
    return <div>Loading user data...</div>;
  }

  if (!user) {
    return <div>No user found. Please log in.</div>;
  }

  return (
    <div>
      <h3>Dashboard</h3>
      <p>Welcome {user.username}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}
