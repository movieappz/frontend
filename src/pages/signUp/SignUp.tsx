import { axiosPublic } from "../../utils/axiosConfig";
import { useNavigate } from "react-router";
import { useUserStore } from "../../store/userStore";
import { useState } from "react";

export default function SignUp() {
  const { setUser } = useUserStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    const signupData = Object.fromEntries(formData.entries()) as {
      username: string;
      email: string;
      password: string;
    };

    try {
      const resp = await axiosPublic.post("/signup", signupData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      
      console.log(resp);
      if (resp.data.insertedData) {
        console.log(resp.data);
        setUser(resp.data.insertedData);
        navigate("/dashboard");
      } else {
        setError("Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.");
      }
    } catch (error: any) {
      console.error(error);
      setError(error.response?.data?.errors?.[0]?.message || "Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid w-full gap-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input 
          name="username" 
          placeholder="Name" 
          required 
          disabled={isLoading}
        />
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
        className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white py-2 px-4 rounded"
      >
        {isLoading ? "Wird registriert..." : "Registrieren"}
      </button>
    </form>
  );
}
