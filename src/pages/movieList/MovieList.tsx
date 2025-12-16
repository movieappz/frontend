import { useContext, useEffect, useRef } from "react";
import { mainContext, type MainContextProps } from "../../context/MainProvider";

import MovieItem from "../../components/movieItem/MovieItem";
import { useNavigate } from "react-router";
import SkeletonGrid from "../../components/SkeletonCard/SkeletonGrid";
import { useTheme } from "../../context/ThemeProvider";
import gsap from "gsap";

export default function MoviePage() {
  const { states, nextPage, prevPage } = useContext(
    mainContext
  ) as MainContextProps;
  const navigate = useNavigate();

  const { theme } = useTheme();
  const moviesGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    params.set("page", String(states.page));
    navigate({ search: params.toString() }, { replace: true });
  }, [states.page]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [states.page]);

  // GSAP Animation when movies load
  useEffect(() => {
    if (
      !states.loading &&
      states.movies &&
      states.movies.length > 0 &&
      moviesGridRef.current
    ) {
      const movieCards = moviesGridRef.current.querySelectorAll(".movie-card");

      gsap.fromTo(
        movieCards,
        {
          opacity: 0,
          y: 60,
          scale: 0.85,
          rotationY: -15,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationY: 0,
          duration: 0.7,
          stagger: {
            amount: 0.8,
            from: "start",
            ease: "power2.out",
          },
          ease: "back.out(1.4)",
        }
      );
    }
  }, [states.movies, states.loading]);

  if (states.error) {
    return (
      <>
        <p>Something is wrong</p>
      </>
    );
  }

  return (
    <div className="container-responsive">
      {states.loading ? (
        <SkeletonGrid count={10} />
      ) : (
        <>
          {states?.movies && states.movies.length > 0 ? (
            <div
              ref={moviesGridRef}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
            >
              {states.movies.map((movie) => (
                <div key={movie.id} className="movie-card">
                  <MovieItem movie={movie} />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-[rgb(var(--text-secondary))]">
              No results found.
            </div>
          )}
        </>
      )}
      <div className="flex justify-between mt-4">
        <button
          disabled={states.page === 1}
          onClick={prevPage}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          <img
            src={
              theme === "light"
                ? "/previous-page-light-mode.png"
                : "/previous-page-dark-mode.png"
            }
            alt="back page"
            className="w-5 h-5"
          />
        </button>
        <span className="px-4 py-2">{states.page}</span>
        <button onClick={nextPage} className="px-4 py-2 bg-gray-300 rounded">
          <img
            src={
              theme === "light"
                ? "/next-page-light-mode.png"
                : "/next-page-dark-mode.png"
            }
            alt="next page"
            className="w-5 h-5"
          />
        </button>
      </div>
    </div>
  );
}
