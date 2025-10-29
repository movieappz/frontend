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
      {user && (
        <button
          onClick={handleToggleFavorite}
          className="absolute top-3 right-3 z-10 btn-favorite"
          aria-label={isFavorite ? "remove Favorite" : "add to Favorite"}
        >
          <img
            src={isFavorite ? "/heart.png" : "/heart_no.png"}
            alt={isFavorite ? "Favorited" : "Not Favorited"}
            className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 object-contain"
          />
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
              <svg
                className="w-3 h-3 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
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
