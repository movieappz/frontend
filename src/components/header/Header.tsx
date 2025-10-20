import Search from "../search/Search";
import CategoriesBtn from "../categories/CategoriesBtn";
import ThemeToggle from "../themeToggle/ThemeToggle";
import { Link, useNavigate } from "react-router";
import { useUserStore } from "../../store/userStore";
import { axiosPublic } from "../../utils/axiosConfig";

export default function Header() {
  const { user, logout } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Optional: Server-seitigen Logout aufrufen
      await axiosPublic.post("/logout", {}, { withCredentials: true });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Lokalen Zustand zurücksetzen
      logout();
      navigate("/");
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[rgb(var(--bg-secondary))]/95 backdrop-blur-md border-b border-[rgb(var(--border))] shadow-sm">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-4 justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link
              to={"/"}
              className="inline-flex items-center gap-2 !no-underline group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-[rgb(var(--accent-primary))] to-[rgb(var(--accent-secondary))] rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-xl font-bold text-[rgb(var(--text-primary))] hidden sm:block">
                MovieApp
              </span>
            </Link>
          </div>

          {/* Search - Desktop */}
          <div className="flex-1 hidden md:block max-w-lg mx-8">
            <Search />
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <ThemeToggle />

            {!user ? (
              <div className="flex items-center gap-2">
                <Link
                  to={"/login"}
                  className="btn-secondary text-sm"
                  aria-label="Anmelden"
                >
                  Anmelden
                </Link>
                <Link
                  to={"/signup"}
                  className="btn-primary text-sm"
                  aria-label="Registrieren"
                >
                  Registrieren
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-sm text-[rgb(var(--text-secondary))] hidden lg:block">
                  Hallo, <span className="font-medium text-[rgb(var(--text-primary))]">{user.username}</span>
                </span>
                <Link
                  to={"/dashboard"}
                  className="btn-secondary text-sm"
                  aria-label="Dashboard"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn-secondary text-sm hover:bg-red-50 hover:border-red-200 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:border-red-800 dark:hover:text-red-400"
                  aria-label="Abmelden"
                >
                  Abmelden
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Search - Mobile */}
        <div className="md:hidden mt-4">
          <Search />
        </div>

        {/* Categories */}
        <div className="mt-4 -mx-1">
          <div className="overflow-x-auto no-scrollbar px-1">
            <CategoriesBtn />
          </div>
        </div>
      </div>
    </header>
  );
}
