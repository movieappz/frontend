import { useEffect, useState, useRef } from "react";
import { AUTH_HEADER } from "../../context/MainProvider";
import { NavLink } from "react-router";
import axios from "axios";
import type { IMovieDetail } from "../../interfaces/IMovieDetail";
import { PlayIcon, ClockIcon, PlusIcon } from "@radix-ui/react-icons";
import { useUserStore } from "../../store/userStore";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Home() {
  const { user, toggleFavorite } = useUserStore();
  const [heroMovie, setHeroMovie] = useState<IMovieDetail | null>(null);
  const [topRated, setTopRated] = useState<IMovieDetail[]>([]);
  const [popular, setPopular] = useState<IMovieDetail[]>([]);
  const [upcoming, setUpcoming] = useState<IMovieDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);
  const topRatedRef = useRef<HTMLDivElement>(null);
  const popularRef = useRef<HTMLDivElement>(null);
  const upcomingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [trendingRes, topRatedRes, popularRes, upcomingRes] =
          await Promise.all([
            axios.get(
              `https://api.themoviedb.org/3/trending/movie/week?language=de-DE`,
              { headers: AUTH_HEADER }
            ),
            axios.get(
              `https://api.themoviedb.org/3/movie/top_rated?language=de-DE&page=1`,
              { headers: AUTH_HEADER }
            ),
            axios.get(
              `https://api.themoviedb.org/3/movie/popular?language=de-DE&page=1`,
              { headers: AUTH_HEADER }
            ),
            axios.get(
              `https://api.themoviedb.org/3/movie/upcoming?language=de-DE&page=1`,
              { headers: AUTH_HEADER }
            ),
          ]);

        setHeroMovie(trendingRes.data.results[0]);
        setTopRated(topRatedRes.data.results.slice(0, 10));
        setPopular(popularRes.data.results.slice(0, 10));
        setUpcoming(upcomingRes.data.results.slice(0, 10));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching home data:", error);
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  useGSAP(
    () => {
      if (heroMovie && heroRef.current) {
        gsap.fromTo(
          heroRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        );
      }
    },
    { dependencies: [heroMovie] }
  );

  useGSAP(
    () => {
      if (topRated.length > 0 && topRatedRef.current) {
        const cards = topRatedRef.current.querySelectorAll(
          ".movie-carousel-card"
        );
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
          }
        );
      }
    },
    { dependencies: [topRated], scope: topRatedRef }
  );

  useGSAP(
    () => {
      if (popular.length > 0 && popularRef.current) {
        const cards = popularRef.current.querySelectorAll(
          ".movie-carousel-card"
        );
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
          }
        );
      }
    },
    { dependencies: [popular], scope: popularRef }
  );

  useGSAP(
    () => {
      if (upcoming.length > 0 && upcomingRef.current) {
        const cards = upcomingRef.current.querySelectorAll(
          ".movie-carousel-card"
        );
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
          }
        );
      }
    },
    { dependencies: [upcoming], scope: upcomingRef }
  );

  const scrollCarousel = (direction: "left" | "right", containerId: string) => {
    const container = document.getElementById(containerId);
    if (container) {
      const scrollAmount = 400;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const MovieCarousel = ({
    title,
    movies,
    id,
    viewAllLink,
    carouselRef,
  }: {
    title: string;
    movies: IMovieDetail[];
    id: string;
    viewAllLink?: string;
    carouselRef: React.RefObject<HTMLDivElement | null>;
  }) => (
    <section className="mb-8 sm:mb-10 md:mb-12" ref={carouselRef}>
      <div className="flex items-center justify-between mb-4 sm:mb-5 md:mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold !text-[rgb(var(--text-primary))]">
          {title}
        </h2>
        {viewAllLink && (
          <NavLink
            to={viewAllLink}
            className="text-sm sm:text-base !text-[rgb(var(--accent-primary))] hover:!text-[rgb(var(--accent-secondary))] transition-colors !no-underline"
          >
            <span className="hidden sm:inline">Alle ansehen →</span>
            <span className="sm:hidden">Alle →</span>
          </NavLink>
        )}
      </div>
      <div className="relative group">
        <button
          onClick={() => scrollCarousel("left", id)}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-black/70 hover:bg-black/90 text-white rounded-full items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          ‹
        </button>
        <div
          id={id}
          className="flex gap-2 sm:gap-3 md:gap-4 overflow-x-auto scrollbar-hide scroll-smooth -mx-1 px-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {movies.map((movie) => (
            <NavLink
              key={movie.id}
              to={`/detail/${movie.id}`}
              className="flex-shrink-0 w-[140px] sm:w-[160px] md:w-[200px] lg:w-[220px] group/card movie-carousel-card !no-underline"
            >
              <div className="relative overflow-hidden rounded-md sm:rounded-lg shadow-md sm:shadow-lg transition-transform duration-300 group-hover/card:scale-105">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title || movie.name}
                  className="w-full h-[210px] sm:h-[240px] md:h-[300px] lg:h-[330px] object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
                    <h3 className="text-white font-semibold text-xs sm:text-sm mb-1 line-clamp-2">
                      {movie.title || movie.name}
                    </h3>
                    {movie.vote_average > 0 && (
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400 text-sm">★</span>
                        <span className="text-white text-xs">
                          {movie.vote_average.toFixed(1)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
        <button
          onClick={() => scrollCarousel("right", id)}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-black/70 hover:bg-black/90 text-white rounded-full items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          ›
        </button>
      </div>
    </section>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[rgb(var(--bg-primary))] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-[rgb(var(--accent-primary))] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[rgb(var(--bg-primary))]">
      {/* Hero Banner */}
      {heroMovie && (
        <div
          ref={heroRef}
          className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden"
        >
          <div className="absolute inset-0">
            <img
              src={`https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`}
              alt={heroMovie.title || heroMovie.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--bg-primary))] via-transparent to-transparent"></div>
          </div>

          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
              <div className="max-w-2xl">
                <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4 drop-shadow-lg">
                  {heroMovie.title || heroMovie.name}
                </h1>
                {heroMovie.overview && (
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-4 md:mb-6 line-clamp-2 md:line-clamp-3 drop-shadow-lg">
                    {heroMovie.overview}
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 mb-4 md:mb-8">
                  {heroMovie.vote_average > 0 && (
                    <div className="flex items-center gap-1 sm:gap-2 text-white">
                      <span className="text-yellow-400 text-lg sm:text-xl md:text-2xl">
                        ★
                      </span>
                      <span className="text-base sm:text-lg md:text-xl font-semibold">
                        {heroMovie.vote_average.toFixed(1)}
                      </span>
                    </div>
                  )}
                  {heroMovie.release_date && (
                    <div className="flex items-center gap-1 sm:gap-2 text-white/80">
                      <ClockIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-sm sm:text-base">
                        {new Date(heroMovie.release_date).getFullYear()}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
                  <NavLink
                    to={`/detail/${heroMovie.id}`}
                    className="flex items-center gap-2 px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 bg-white text-black text-sm sm:text-base font-semibold rounded-lg hover:bg-white/90 transition-all shadow-lg !no-underline"
                  >
                    <PlayIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    <span className="hidden sm:inline">Details ansehen</span>
                    <span className="sm:hidden">Details</span>
                  </NavLink>
                  {user && (
                    <button
                      onClick={() => toggleFavorite(heroMovie.id)}
                      className="flex items-center gap-2 px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 bg-white/20 backdrop-blur-sm text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-white/30 transition-all"
                    >
                      <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                      <span className="hidden sm:inline">
                        {user.favorites?.includes(heroMovie.id)
                          ? "In Favoriten"
                          : "Zu Favoriten"}
                      </span>
                      <span className="sm:hidden">Favorit</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Movie Carousels */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12 max-w-7xl">
        <MovieCarousel
          title="Top Bewertet"
          movies={topRated}
          id="top-rated"
          carouselRef={topRatedRef}
        />
        <MovieCarousel
          title="Beliebt"
          movies={popular}
          id="popular"
          carouselRef={popularRef}
        />
        <MovieCarousel
          title="Demnächst"
          movies={upcoming}
          id="upcoming"
          carouselRef={upcomingRef}
        />
      </div>
    </div>
  );
}
