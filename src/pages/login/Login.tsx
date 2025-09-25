// import axios from "axios";
// import { useUserStore } from "../../store/userStore";

export default function Login() {
  //   const { setUser, reloadUser } = useUserStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const LoginData = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    console.log(LoginData);
    // setUser(LoginData)
    try {
      //   const resp = await axios.post("/login", LoginData, {
      //     headers: { "Content-Type": "application/json" },
      //     withCredentials: true,
      //   });
      //   if (resp.data.user) {
      //     setUser(resp.data.user);
      //     await reloadUser();
      //   }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid w-full gap-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input name="email" type="email" placeholder="Email" />
        <input name="password" placeholder="password" />
      </div>
      <button type="submit">Log In</button>
    </form>
  );
}
