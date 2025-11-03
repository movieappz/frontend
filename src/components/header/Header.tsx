import Search from "../search/Search";
import CategoriesBtn from "../categories/CategoriesBtn";
import ThemeToggle from "../themeToggle/ThemeToggle";
import { Link, useNavigate } from "react-router";
import { useUserStore } from "../../store/userStore";
import { axiosPublic } from "../../utils/axiosConfig";
import { useTheme } from "../../context/ThemeProvider";

export default function Header() {
  const { user, logout } = useUserStore();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleLogout = async () => {
    try {
      await axiosPublic.post("/auth/logout", {}, { withCredentials: true });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      logout();
      navigate("/");
    }
  };

  return (
    <header
      data-app-header
      className="fixed top-0 inset-x-0 z-50 bg-[rgb(var(--bg-secondary))]/95 backdrop-blur-md border-b-2 border-[rgb(var(--border))] shadow-md"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-4 justify-between">
          <div className="flex items-center gap-3">
            <Link
              to={"/"}
              className="inline-flex items-center gap-2 !no-underline group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-[rgb(var(--accent-primary))] to-[rgb(var(--accent-secondary))] rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200">
                <span className="text-white font-bold text-lg">M</span>
              </div>
            </Link>
          </div>

          {/* Search - Desktop */}
          <div className="flex-1 hidden md:block max-w-lg mx-8">
            <Search />
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Theme Toggle */}
            <ThemeToggle />

            {!user ? (
              <div className="flex items-center gap-2">
                <Link
                  to={"/login"}
                  className="h-8 w-8 flex items-center justify-center"
                  aria-label="login"
                >
                  <img
                    src={theme === "light" ? "/signin_l.png" : "/signin.png"}
                    alt="Abmelden"
                    className="w-5 h-5"
                  />
                </Link>
                <Link
                  to={"/signup"}
                  className="h-8 w-8 flex items-center justify-center"
                  aria-label="signup"
                >
                  <img
                    src={theme === "light" ? "/signup_d.png" : "/signup.png"}
                    alt="signup"
                    className="w-5 h-5"
                  />
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/dashboard"
                  className="text-[#344e41] dark:!text-[#70012b] !no-underline"
                >
                  <img
                    src={theme === "light" ? "/home.png" : "/home_two.png"}
                    alt="Abmelden"
                    className="w-5 h-5"
                  />
                </Link>

                <button onClick={handleLogout} aria-label="Abmelden">
                  <img
                    src={theme === "light" ? "/logout.png" : "/logout_d.png"}
                    alt="Abmelden"
                    className="w-5 h-5"
                  />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Categories */}
        <div className="mt-2">
          <div className="overflow-x-auto no-scrollbar px-1">
            <CategoriesBtn />
          </div>
        </div>

        {/* Search - Mobile */}
        <div className="md:hidden mt-4">
          <Search />
        </div>
      </div>
    </header>
  );
}
