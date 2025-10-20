import { useNavigate } from "react-router";
import { useUserStore } from "../../store/userStore";
import { axiosPublic } from "../../utils/axiosConfig";
import { useState } from "react";

export default function Login() {
  const { setUser } = useUserStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    const LoginData = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    console.log(LoginData);

    try {
      const resp = await axiosPublic.post("/login", LoginData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      
      if (resp.data.loggingUser) {
        console.log(resp.data.loggingUser);
        setUser(resp.data.loggingUser);
        navigate("/dashboard");
      } else {
        setError("Login fehlgeschlagen. Bitte versuchen Sie es erneut.");
      }
    } catch (error: any) {
      console.error(error);
      setError(error.response?.data?.errors?.[0]?.message || "Login fehlgeschlagen. Bitte versuchen Sie es erneut.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid w-full gap-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input 
          name="email" 
          type="email" 
          placeholder="Email" 
          required 
          disabled={isLoading}
        />
        <input 
          name="password" 
          type="password"
          placeholder="Passwort" 
          required
          disabled={isLoading}
        />
      </div>
      {error && (
        <div className="text-red-500 text-sm text-center">
          {error}
        </div>
      )}
      <button 
        type="submit" 
        disabled={isLoading}
        className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white py-2 px-4 rounded"
      >
        {isLoading ? "Wird angemeldet..." : "Anmelden"}
      </button>
    </form>
  );
}
