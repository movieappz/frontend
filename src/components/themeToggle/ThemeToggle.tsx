import { useTheme } from "../../context/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-lg bg-[rgb(var(--bg-secondary))] border-2 border-[rgb(var(--border))] hover:bg-[rgb(var(--bg-tertiary))] transition-all duration-200 shadow-sm hover:shadow-md"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <div className="relative w-6 h-6">
        <svg
          className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
            theme === "light"
              ? "opacity-100 rotate-0 scale-100 !text-[rgb(var(--text-primary))]"
              : "opacity-0 rotate-90 scale-75"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>

        <svg
          className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
            theme === "dark"
              ? "opacity-100 rotate-0 scale-100 !text-white"
              : "opacity-0 -rotate-90 scale-75"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </div>
    </button>
  );
}
