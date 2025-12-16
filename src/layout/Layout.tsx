import { Outlet } from "react-router";
import Header from "../components/header/Header";
import PageWrapper from "../components/pageWrapper/PageWrapper";
import { useEffect, useState } from "react";
import Footer from "../components/footer/Footer";

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
    <div
      className={`min-h-screen bg-[rgb(var(--bg-primary))] text-[rgb(var(--text-primary))]`}
    >
      <Header />
      <div
        className="mx-auto w-full max-w-7xl px-2 sm:px-4 lg:px-8 pb-4 sm:pb-6 lg:pb-8"
        style={{ paddingTop: headerHeight + 8 }}
      >
        <PageWrapper>
          <main className="flex flex-col">
            <Outlet />
          </main>
        </PageWrapper>
      </div>
      <Footer />
    </div>
  );
}
