import Search from "../search/Search";
import CategoriesBtn from "../categories/CategoriesBtn";
import { Link } from "react-router";

export default function Header() {
  return (
    <header
      data-app-header
      className="fixed top-0 inset-x-0 z-50 bg-[var(--color-brand-bg)]/85 backdrop-blur border-b border-[--color-brand-border]/40"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center gap-3 sm:gap-4 justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to={"/"}
              className="inline-flex items-center gap-2 !no-underline"
            >
              <span className="text-base sm:text-lg font-semibold tracking-tight text-[--color-brand-border]">
                <img src="/home_two.png" alt="" className="w-8" />
              </span>
            </Link>
          </div>

          <div className="flex-1 hidden sm:block max-w-lg mx-4">
            <Search />
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to={"/login"}
              className="px-3 py-1.5 rounded-md text-[--color-brand-text] hover:bg-[--color-brand-border]/30 transition-colors !no-underline"
              aria-label="Sign In"
            >
              <img src="/signin_two.png" className="w-6" />
            </Link>
            <Link
              to={"/signup"}
              className="px-3 py-1.5 rounded-md bg-[--color-brand-border]/20 text-[--color-brand-text] hover:bg-[--color-brand-border]/40 transition-colors !no-underline"
              aria-label="Sign Up"
            >
              <img src="/signup_two.png" alt="" className="w-5" />
            </Link>
          </div>
        </div>

        <div className="sm:hidden mt-2">
          <Search />
        </div>

        <div className="mt-3 -mx-1">
          <div className="overflow-x-auto no-scrollbar px-1">
            <CategoriesBtn />
          </div>
        </div>
      </div>
    </header>
  );
}
