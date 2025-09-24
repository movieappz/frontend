import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import SkeletonCard from "./SkeletonCard";

export default function SkeletonGrid({ count = 10 }: { count?: number }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!gridRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set("[data-skel]", { opacity: 0, y: 12 });
      gsap.to("[data-skel]", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: "power2.out",
      });
    }, gridRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} data-skel>
          <SkeletonCard />
        </div>
      ))}
    </div>
  );
}


