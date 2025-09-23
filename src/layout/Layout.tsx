import { Outlet } from "react-router";
import Header from "../components/header/Header";

export default function Layout() {
  return (
    <div className="min-h-screen bg-[--color-brand-bg] text-[--color-brand-text]">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <Header />
        <div className="mt-4 sm:mt-6 lg:mt-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
