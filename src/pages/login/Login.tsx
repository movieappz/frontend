import { useUserStore } from "../../store/userStore";
import LoginCard from "../../components/loginCard/LoginCard";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export default function Login() {
  const { user, isLoggedIn } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn && user) {
      navigate("/dashboard", { replace: true });
    }
  }, [isLoggedIn, user, navigate]);

  return (
    <div className="h-[calc(100vh-72px)] md:h-[calc(100vh-112px)] grid place-items-center">
      <LoginCard />
    </div>
  );
}
