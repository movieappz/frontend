import { useNavigate, Link } from "react-router";
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
      const resp = await axiosPublic.post("/auth/login", LoginData, {
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
      setError(
        error.response?.data?.errors?.[0]?.message ||
          "Login fehlgeschlagen. Bitte versuchen Sie es erneut."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--bg-primary))] pt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="card p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[rgb(var(--accent-primary))] to-[rgb(var(--accent-secondary))] rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-[rgb(var(--text-primary))] mb-2">
                Welcome Back
              </h1>
              <p className="text-[rgb(var(--text-secondary))]">
                sign in to your account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[rgb(var(--text-primary))] mb-2"
                  >
                    E-Mail
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example@email.com"
                    required
                    disabled={isLoading}
                    className="input w-full"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-[rgb(var(--text-primary))] mb-2"
                  >
                    Passwort
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="*********"
                    required
                    disabled={isLoading}
                    className="input w-full"
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-red-600 dark:text-red-400 text-sm">
                      {error}
                    </p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full py-3 text-lg"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    loading...
                  </div>
                ) : (
                  "Login"
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-[rgb(var(--text-secondary))] text-sm">
                Don't have an account?
                <Link
                  to="/signup"
                  className="!text-[rgb(var(--accent-primary))] hover:text-[rgb(var(--accent-primary))]/80 font-medium !no-underline line-clamp-1"
                >
                  sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
