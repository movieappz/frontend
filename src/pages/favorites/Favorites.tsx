import { useEffect, useState } from "react";
import { useUserStore } from "../../store/userStore";
import type { IMovieDetail } from "../../interfaces/IMovieDetail";
import { NavLink, useNavigate } from "react-router";

import axios from "axios";
import MovieItem from "../../components/movieItem/MovieItem";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

const AUTH_HEADER = {
  Authorization: "Bearer " + String(import.meta.env.VITE_KEY_BAREAR),
};

export default function Favorites() {
  const { user } = useUserStore();
  const navigate = useNavigate();
  const [favoriteMovies, setFavoriteMovies] = useState<IMovieDetail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      if (!user?.favorites || user.favorites.length === 0) {
        setFavoriteMovies([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const moviePromises = user.favorites.map(async (movieId) => {
          try {
            const response = await axios.get(
              `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
              { headers: AUTH_HEADER }
            );
            return response.data;
          } catch (error) {
            error = `Failed to fetch movie with ID ${movieId}`;
            console.error(error);
            return null;
          }
        });

        const movies = await Promise.all(moviePromises);
        const validMovies = movies.filter(
          (movie): movie is IMovieDetail => movie !== null
        );

        setFavoriteMovies(validMovies);
      } catch (error) {
        console.error(error);
        setError("Failed to load favorite movies. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavoriteMovies();
  }, [user?.favorites]);

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
              Failed to load favorite movies
            </h1>
            <p className="text-red-500 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-responsive">
      <div className="max-w-7xl mx-auto">
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
          <h1 className="text-4xl font-bold text-[rgb(var(--text-primary))] mb-2">
            My Favorites
          </h1>
          <p className="text-[rgb(var(--text-secondary))] text-lg">
            {favoriteMovies.length}{" "}
            {favoriteMovies.length === 1 ? "Movie" : "Movies"} in your favorites
          </p>
        </div>

        {favoriteMovies.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900/20 dark:to-pink-900/20 rounded-full flex items-center justify-center">
              <svg
                className="w-16 h-16 text-red-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-[rgb(var(--text-primary))] mb-4">
              No favorite movies yet
            </h2>
            <p className="text-[rgb(var(--text-secondary))] mb-8 max-w-md mx-auto">
              You haven't added any movies to your favorites. Browse movies
            </p>
            <NavLink to="/" className="btn-primary text-lg px-8 py-3">
              Browse Movies
            </NavLink>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {favoriteMovies.map((movie) => (
              <MovieItem key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
