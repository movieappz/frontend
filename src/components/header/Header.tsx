import { useState } from "react";
import Search from "../search/Search";
import CategoriesBtn from "../categories/CategoriesBtn";
import ThemeToggle from "../themeToggle/ThemeToggle";
import { Link, useNavigate } from "react-router";
import { useUserStore } from "../../store/userStore";
import { axiosPublic } from "../../utils/axiosConfig";
import {
  EnterIcon,
  PersonIcon,
  HomeIcon,
  ExitIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@radix-ui/react-icons";

export default function Header() {
  const { user, logout } = useUserStore();
  const navigate = useNavigate();
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

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
    <>
      <header
        data-app-header
        className={`fixed inset-x-0 z-50 bg-[rgb(var(--bg-secondary))]/95 backdrop-blur-md border-b-2 border-[rgb(var(--border))] shadow-md transition-all duration-500 ease-in-out ${
          isHeaderVisible ? "top-0" : "-top-full"
        }`}
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          {/* Main Row - Logo, Categories, Search, Actions */}
          <div className="flex items-center gap-4 justify-between">
            {/* Logo */}
            <Link
              to={"/"}
              className="inline-flex items-center gap-2 !no-underline group shrink-0"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-[rgb(var(--accent-primary))] to-[rgb(var(--accent-secondary))] rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200">
                <span className="text-white font-bold text-lg">M</span>
              </div>
            </Link>

            {/* Desktop: Categories + Search */}
            <div className="hidden md:flex items-center gap-4 flex-1 max-w-3xl">
              <div className="shrink-0">
                <CategoriesBtn />
              </div>
              <div className="flex-1 max-w-lg">
                <Search />
              </div>
            </div>

            {/* Right Side - Actions */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              {/* Theme Toggle */}
              <ThemeToggle />

              {!user ? (
                <div className="flex items-center gap-2">
                  <Link
                    to={"/login"}
                    className="p-2 rounded-lg bg-[rgb(var(--bg-secondary))] border-2 border-[rgb(var(--border))] hover:bg-[rgb(var(--bg-tertiary))] transition-all duration-200 shadow-sm hover:shadow-md !text-[rgb(var(--text-primary))] !no-underline"
                    aria-label="login"
                  >
                    <EnterIcon className="w-6 h-6" />
                  </Link>
                  <Link
                    to={"/signup"}
                    className="p-2 rounded-lg bg-[rgb(var(--bg-secondary))] border-2 border-[rgb(var(--border))] hover:bg-[rgb(var(--bg-tertiary))] transition-all duration-200 shadow-sm hover:shadow-md !text-[rgb(var(--text-primary))] !no-underline"
                    aria-label="signup"
                  >
                    <PersonIcon className="w-6 h-6" />
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/dashboard"
                    className="p-2 rounded-lg bg-[rgb(var(--bg-secondary))] border-2 border-[rgb(var(--border))] hover:bg-[rgb(var(--bg-tertiary))] transition-all duration-200 shadow-sm hover:shadow-md !text-[rgb(var(--text-primary))] !no-underline"
                    aria-label="dashboard"
                  >
                    <HomeIcon className="w-6 h-6" />
                  </Link>

                  <button
                    onClick={handleLogout}
                    aria-label="logout"
                    className="p-2 rounded-lg bg-[rgb(var(--bg-secondary))] border-2 border-[rgb(var(--border))] hover:bg-[rgb(var(--bg-tertiary))] transition-all duration-200 shadow-sm hover:shadow-md !text-[rgb(var(--text-primary))]"
                  >
                    <ExitIcon className="w-6 h-6" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile: Categories + Search in second row */}
          <div className="md:hidden mt-4 space-y-3">
            <div className="flex items-center justify-center">
              <CategoriesBtn />
            </div>
            <Search />
          </div>
        </div>
      </header>

      {/* Toggle Button */}
      <button
        onClick={() => setIsHeaderVisible(!isHeaderVisible)}
        className={`fixed z-50 left-1/2 -translate-x-1/2 p-2 rounded-b-xl bg-[rgb(var(--bg-secondary))] border-2 border-t-0 border-[rgb(var(--border))] shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out ${
          isHeaderVisible ? "top-[72px] md:top-[88px]" : "top-0"
        }`}
        aria-label={isHeaderVisible ? "Header ausblenden" : "Header einblenden"}
      >
        {isHeaderVisible ? (
          <ChevronUpIcon className="w-6 h-6 !text-[rgb(var(--text-primary))]" />
        ) : (
          <ChevronDownIcon className="w-6 h-6 !text-[rgb(var(--text-primary))]" />
        )}
      </button>
    </>
  );
}
