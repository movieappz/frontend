import { axiosPublic } from "../../utils/axiosConfig";
import { useNavigate, Link } from "react-router";
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
      const resp = await axiosPublic.post("/auth/signup", signupData);
      if (resp.data.insertedData) {
        setUser(resp.data.insertedData);
        navigate("/dashboard");
      } else {
        setError("Signup failed. Please try again.");
      }
    } catch (error: any) {
      console.error(error);
      setError(
        error.response?.data?.errors?.[0]?.message ||
          "Signup failed. Please try again."
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
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-[rgb(var(--text-primary))] mb-2">
                Create an account
              </h1>
              <p className="text-[rgb(var(--text-secondary))]">
                Please fill in the information below to create your account.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-[rgb(var(--text-primary))] mb-2"
                  >
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    placeholder="Username"
                    required
                    disabled={isLoading}
                    className="input w-full"
                  />
                </div>
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
                    placeholder="***********"
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
                    Loading...
                  </div>
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-[rgb(var(--text-secondary))] text-sm">
                you have already an Account?{" "}
                <Link
                  to="/login"
                  className="!text-[rgb(var(--accent-primary))] hover:text-[rgb(var(--accent-primary))]/80 font-medium !no-underline line-clamp-1"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
