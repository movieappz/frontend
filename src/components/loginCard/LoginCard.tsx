import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useUserStore } from "../../store/userStore";
import { axiosPublic } from "../../utils/axiosConfig";

export default function LoginCard() {
  const { setUser } = useUserStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [signup, setSignup] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
      passwordRepeat?: string;
    };

    if (signup && data.password !== data.passwordRepeat) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const endpoint = signup ? "/auth/signup" : "/auth/login";
      const resp = await axiosPublic.post(
        endpoint,
        { email: data.email, password: data.password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (resp.data.loggingUser || resp.data.user) {
        setUser(resp.data.loggingUser || resp.data.user);
        navigate("/dashboard");
      } else {
        setError(signup ? "Sign up failed" : "Login failed");
      }
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.errors?.[0]?.message ||
          (signup
            ? "Sign up failed. Please try again."
            : "Login failed. Please try again.")
      );
    } finally {
      setLoading(false);
    }
  }

  const handleSignup = () => {
    setSignup(!signup);
    setError("");
  };

  return (
    <div className="w-[350px] bg-[rgb(var(--bg-secondary))] rounded-xl shadow-[0_5px_15px_rgba(0,0,0,0.35)] border border-[rgb(var(--border))] box-border p-6 flex flex-col">
      <h2 className="text-center font-extrabold text-[28px] mt-2 mb-8 text-[rgb(var(--accent-primary))]">
        {signup ? "Sign up" : "Login"}
      </h2>

      <form className="w-full flex flex-col gap-4 mb-4" onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          className="input rounded-full"
        />

        <input
          name="password"
          type="password"
          required
          placeholder="Password"
          className="input rounded-full"
        />

        {signup && (
          <input
            name="passwordRepeat"
            type="password"
            required
            placeholder="Repeat password"
            className="input rounded-full"
          />
        )}

        {!signup && (
          <div className="text-right">
            <button
              type="button"
              className="text-[10px] font-bold tracking-wide text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text-primary))] underline underline-offset-2"
            >
              Forgot Password?
            </button>
          </div>
        )}

        {error && (
          <p className="m-0 text-[10px] text-red-600 font-bold">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-primary rounded-full py-2.5 px-4"
        >
          {loading
            ? signup
              ? "Signing up..."
              : "Logging in…"
            : signup
            ? "Sign up"
            : "Log in"}
        </button>
      </form>

      <p className="m-0 text-[10px] text-[rgb(var(--text-muted))]">
        {signup ? "Already have an account?" : "Don't have an account?"}
        <button
          onClick={handleSignup}
          type="button"
          className="ml-1 text-[11px] underline decoration-[rgb(var(--accent-primary))] text-[rgb(var(--accent-primary))] font-extrabold hover:opacity-80"
        >
          {signup ? "Login" : "Sign up"}
        </button>
      </p>

      <div className="w-full flex flex-col justify-start mt-5 gap-4">
        <button
          type="button"
          disabled
          className="rounded-full py-2.5 px-4 shadow-sm cursor-not-allowed flex justify-center items-center text-[11px] gap-2 bg-[rgb(var(--bg-tertiary))] text-[rgb(var(--text-muted))] border-2 border-[rgb(var(--border-light))] opacity-60"
        >
          <AppleIcon className="text-xl" />
          <span>{signup ? "Sign up" : "Login"} with Apple</span>
        </button>

        <button
          type="button"
          disabled
          className="rounded-full py-2.5 px-4 shadow-sm cursor-not-allowed flex justify-center items-center text-[11px] gap-2 bg-[rgb(var(--bg-tertiary))] text-[rgb(var(--text-muted))] border-2 border-[rgb(var(--border-light))] opacity-60"
        >
          <GoogleIcon className="text-xl" />
          <span>{signup ? "Sign up" : "Login"} with Google</span>
        </button>
      </div>
    </div>
  );
}

function AppleIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      viewBox="0 0 1024 1024"
      className={className}
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M747.4 535.7c-.4-68.2 30.5-119.6 92.9-157.5-34.9-50-87.7-77.5-157.3-82.8-65.9-5.2-138 38.4-164.4 38.4-27.9 0-91.7-36.6-141.9-36.6C273.1 298.8 163 379.8 163 544.6c0 48.7 8.9 99 26.7 150.8 23.8 68.2 109.6 235.3 199.1 232.6 46.8-1.1 79.9-33.2 140.8-33.2 59.1 0 89.7 33.2 141.9 33.2 90.3-1.3 167.9-153.2 190.5-221.6-121.1-57.1-114.6-167.2-114.6-170.7zm-105.1-305c50.7-60.2 46.1-115 44.6-134.7-44.8 2.6-96.6 30.5-126.1 64.8-32.5 36.8-51.6 82.3-47.5 133.6 48.4 3.7 92.6-21.2 129-63.7z" />
    </svg>
  );
}

function GoogleIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      viewBox="0 0 48 48"
      className={className}
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#FFC107"
        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24 c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
      />
      <path
        fill="#FF3D00"
        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657 C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
      />
      <path
        fill="#1976D2"
        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
      />
    </svg>
  );
}
