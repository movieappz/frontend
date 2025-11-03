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

  const handleToggleFavorite = (movieId: number) => {
    toggleFavorite(movieId);
  };

  return (
    <div className="group relative card overflow-hidden hover:!scale-105 transition-all duration-200">
      <NavLink
        to={`/detail/${movie.id}`}
        className="block !text-[rgb(var(--text-primary))] !no-underline"
      >
        <div className="relative aspect-[2/3] w-full overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:!scale-110"
          />

          <div className="pointer-events-none absolute inset-0 z-20 opacity-0 group-hover:!opacity-100 transition-opacity duration-300">
            <div className="absolute inset-0 !bg-black/60 md:!bg-gradient-to-t md:!from-black/80 md:!via-black/50 md:!to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 !text-white drop-shadow">
              <div className="flex items-center gap-3 text-xs sm:text-sm">
                {movie.release_date && (
                  <span className="inline-flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" />
                    </svg>
                    {new Date(movie.release_date).getFullYear()}
                  </span>
                )}
                <span className="inline-flex items-center gap-1">
                  <svg
                    className="w-4 h-4 text-yellow-400"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  {movie.vote_average?.toFixed(1)}
                </span>
                {genreFunction(movie.genre_ids, states.categories) && (
                  <span className="inline-flex items-center gap-1 truncate max-w-[45%]">
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zm0 2c-3.31 0-6 2.69-6 6h2a4 4 0 018 0h2c0-3.31-2.69-6-6-6z" />
                    </svg>
                    <span className="truncate">
                      {genreFunction(movie.genre_ids, states.categories)}
                    </span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </NavLink>

      {user && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleToggleFavorite(movie.id);
          }}
          className={`absolute top-3 right-3 z-20 !p-2 rounded-full transition-all
                      focus:outline-none`}
          aria-label={isFavorite ? "remove Favorite" : "add to Favorite"}
          title={isFavorite ? "Favorite remove " : "add to Favorite"}
        >
          <img
            src={isFavorite ? "/heart.png" : "/heart_no.png"}
            alt={isFavorite ? "Favorited" : "Not Favorited"}
            className="!w-6 !h-6 sm:!w-7 sm:!h-7 md:!w-8 md:!h-8 lg:!w-9 lg:!h-9 object-contain"
          />
        </button>
      )}
    </div>
  );
}
