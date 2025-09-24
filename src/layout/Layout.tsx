import { Outlet } from "react-router";
import Header from "../components/header/Header";
import PageWrapper from "../components/pageWrapper/PageWrapper";
import { useEffect, useState } from "react";

export default function Layout() {
  const [headerHeight, setHeaderHeight] = useState<number>(96);

  useEffect(() => {
    const el = document.querySelector<HTMLElement>("header[data-app-header]");
    if (!el) return;
    const update = () => setHeaderHeight(el.getBoundingClientRect().height);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[--color-brand-bg] text-[--color-brand-text]">
      <Header />
      <div
        className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-6 lg:pb-8"
        style={{ paddingTop: headerHeight + 16 }}
      >
        <PageWrapper>
          <Outlet />
        </PageWrapper>
      </div>
    </div>
  );
}
