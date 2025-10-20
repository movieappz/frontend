import type { IMovieDetail } from "../../interfaces/IMovieDetail";
import { NavLink } from "react-router";
import { genreFunction } from "../../functions/genreFunction";
import { useUserStore } from "../../store/userStore";
import { useContext } from "react";
import { mainContext, type MainContextProps } from "../../context/MainProvider";

interface MovieItemProps {
  movie: IMovieDetail;
}

export default function MovieItem({ movie }: MovieItemProps) {
  const { user, toggleFavorite } = useUserStore();
  const { states } = useContext(mainContext) as MainContextProps;

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  const title =
    movie.title ||
    movie.name ||
    movie.original_title ||
    movie.original_name ||
    "unknown";

  const isFavorite = user?.favorites?.includes(movie.id) || false;

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (user) {
      toggleFavorite(movie.id);
    }
  };

  return (
    <div className="group relative card overflow-hidden hover:scale-105 transition-all duration-200">
      {/* Favoriten-Button */}
      {user && (
        <button
          onClick={handleToggleFavorite}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-all shadow-lg ${
            isFavorite
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-[rgb(var(--bg-secondary))] text-[rgb(var(--text-muted))] hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20"
          }`}
          aria-label={isFavorite ? "Aus Favoriten entfernen" : "Zu Favoriten hinzufügen"}
        >
          <svg
            className="w-5 h-5"
            fill={isFavorite ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      )}

      <NavLink
        to={`/detail/${movie.id}`}
        className="block !text-[rgb(var(--text-primary))] !no-underline"
      >
        <div className="aspect-[2/3] w-full overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <h6 className="text-sm font-semibold leading-snug truncate mb-2">
            {title}
          </h6>
          <div className="flex items-center gap-2 text-xs text-[rgb(var(--text-secondary))]">
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span>{movie.vote_average?.toFixed(1)}</span>
            </div>
            {movie.release_date && (
              <>
                <span>•</span>
                <span>{new Date(movie.release_date).getFullYear()}</span>
              </>
            )}
          </div>
          {genreFunction(movie.genre_ids, states.categories) && (
            <p className="text-xs text-[rgb(var(--text-muted))] mt-1 truncate">
              {genreFunction(movie.genre_ids, states.categories)}
            </p>
          )}
        </div>
      </NavLink>
    </div>
  );
}
