import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { useLocation } from "react-router";

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pageRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    if (!pageRef.current) return;
    const ctx = gsap.context(() => {
      // Smooth scroll to top on route change
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      gsap.set(pageRef.current, {
        opacity: 0,
        y: 100,
        willChange: "opacity, transform",
      });
      gsap.to(pageRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        clearProps: "willChange",
      });
    }, pageRef);
    return () => ctx.revert();
  }, [pathname]);

  return <div ref={pageRef}>{children}</div>;
}
