import { useEffect, useState, useRef } from "react";
import { useUserStore } from "../../store/userStore";
import type { IMovieDetail } from "../../interfaces/IMovieDetail";
import { NavLink, useNavigate } from "react-router";
import axios from "axios";
import MovieItem from "../../components/movieItem/MovieItem";
import gsap from "gsap";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

const AUTH_HEADER = {
  Authorization: "Bearer " + String(import.meta.env.VITE_KEY_BAREAR),
};

export default function Watched() {
  const { user } = useUserStore();
  const navigate = useNavigate();
  const [watchedMovies, setWatchedMovies] = useState<IMovieDetail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const moviesGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchWatchedMovies = async () => {
      if (!user?.watchedMovies || user.watchedMovies.length === 0) {
        setWatchedMovies([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const moviePromises = user.watchedMovies.map(async (movieId) => {
          try {
            const response = await axios.get(
              `https://api.themoviedb.org/3/movie/${movieId}?language=de-DE`,
              { headers: AUTH_HEADER }
            );
            return response.data;
          } catch (error) {
            console.error(`Failed to fetch movie with ID ${movieId}`, error);
            return null;
          }
        });

        const movies = await Promise.all(moviePromises);
        const validMovies = movies.filter(
          (movie): movie is IMovieDetail => movie !== null
        );

        setWatchedMovies(validMovies);
      } catch (error) {
        console.error(error);
        setError(
          "Fehler beim Laden der gesehenen Filme. Bitte versuche es erneut."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchWatchedMovies();
  }, [user?.watchedMovies]);

  // GSAP Animation when movies are loaded
  useEffect(() => {
    if (watchedMovies.length > 0 && moviesGridRef.current) {
      const movieCards = moviesGridRef.current.querySelectorAll(".movie-card");

      gsap.fromTo(
        movieCards,
        {
          opacity: 0,
          y: 50,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.2)",
        }
      );
    }
  }, [watchedMovies]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[rgb(var(--bg-primary))] pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-[rgb(var(--accent-primary))] border-t-transparent"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[rgb(var(--bg-primary))] pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-[rgb(var(--text-primary))] mb-4">
              Fehler beim Laden
            </h1>
            <p className="text-red-500 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-[rgb(var(--accent-primary))] text-white rounded-lg hover:bg-[rgb(var(--accent-secondary))] transition-colors"
            >
              Erneut versuchen
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[rgb(var(--bg-primary))] pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-[rgb(var(--bg-secondary))] rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-[rgb(var(--text-secondary))]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-[rgb(var(--text-primary))] mb-4">
              Nicht angemeldet
            </h1>
            <p className="text-[rgb(var(--text-secondary))] mb-6">
              Melde dich an, um deine gesehenen Filme zu sehen
            </p>
            <NavLink
              to="/login"
              className="inline-block px-6 py-3 bg-[rgb(var(--accent-primary))] text-white rounded-lg hover:bg-[rgb(var(--accent-secondary))] transition-colors"
            >
              Zum Login
            </NavLink>
          </div>
        </div>
      </div>
    );
  }

  if (watchedMovies.length === 0) {
    return (
      <div className="min-h-screen bg-[rgb(var(--bg-primary))] pt-24">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold !text-[rgb(var(--text-primary))] mb-8">
            Gesehene Filme
          </h1>
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-[rgb(var(--bg-secondary))] rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-[rgb(var(--text-secondary))]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[rgb(var(--text-primary))] mb-4">
              Keine gesehenen Filme
            </h2>
            <p className="text-[rgb(var(--text-secondary))] mb-6">
              Markiere Filme als gesehen, um sie hier zu sehen
            </p>
            <NavLink
              to="/"
              className="inline-block px-6 py-3 bg-[rgb(var(--accent-primary))] text-white rounded-lg hover:bg-[rgb(var(--accent-secondary))] transition-colors"
            >
              Filme entdecken
            </NavLink>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[rgb(var(--bg-primary))] pt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4 flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-12 h-12 bg-[rgb(var(--bg-secondary))] border-2 border-[rgb(var(--border))] hover:bg-[rgb(var(--accent-primary))]/20 !text-[rgb(var(--text-primary))] rounded-lg transition-colors"
            aria-label="Zurück"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold !text-[rgb(var(--text-primary))] mb-2">
            Gesehene Filme
          </h1>
          <p className="!text-[rgb(var(--text-secondary))]">
            {watchedMovies.length}{" "}
            {watchedMovies.length === 1 ? "Film" : "Filme"}
          </p>
        </div>

        <div
          ref={moviesGridRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
        >
          {watchedMovies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <MovieItem movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
