import { useUserStore } from "../../store/userStore";
import LoginCard from "../../components/loginCard/LoginCard";

export default function SignUp() {
  const { user, isLoggedIn } = useUserStore();

  return (
    <div className="h-[calc(100vh-72px)] md:h-[calc(100vh-112px)] grid place-items-center">
      {isLoggedIn && user ? (
        <p className="text-center w-full text-[clamp(32px,6vw,72px)] font-extrabold leading-[1.05] text-[rgb(var(--text-primary))]">
          Hello {user.username}, you are already signed up!
        </p>
      ) : (
        <LoginCard />
      )}
    </div>
  );
}
