import { axiosPublic } from "../../utils/axiosConfig";
import { useNavigate } from "react-router";
import { useUserStore } from "../../store/userStore";

export default function SignUp() {
  const { setUser, reloadUser } = useUserStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const signupData = Object.fromEntries(formData.entries()) as {
      username: string;
      email: string;
      password: string;
    };

    console.log(signupData);
    try {
      const resp = await axiosPublic.post("/signup", signupData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (resp.data.user) {
        setUser(resp.data.user);
        await reloadUser();
        if (resp.data.existingUser) {
          console.log("User ist Daaa");
        } else {
          navigate("/login");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid w-full gap-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input name="username" placeholder="Name" required />
        <input name="email" type="email" placeholder="Email" required />
        <input
          name="password"
          type="current-password"
          placeholder="Password"
          required
        />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
}
