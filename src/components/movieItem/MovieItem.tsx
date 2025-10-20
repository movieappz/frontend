import type { IMovieDetail } from "../../interfaces/IMovieDetail";
import { NavLink } from "react-router";
import { genreFunction } from "../../functions/genreFunction";
import { useUserStore } from "../../store/userStore";

interface MovieItemProps {
  movie: IMovieDetail;
}

export default function MovieItem({ movie }: MovieItemProps) {
  const { user, toggleFavorite } = useUserStore();

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  const title =
    movie.title ||
    movie.name ||
    movie.original_title ||
    movie.original_name ||
    "unknown";

  const likeFunction = () => {
    if (user) toggleFavorite(movie.id);
  };

  return (
    <>
      <button onClick={likeFunction}>Like</button>
      <NavLink
        to={`/detail/${movie.id}`}
        className="group block rounded-lg border-2 bg-white/90 !text-[var(--color-brand-text)] overflow-hidden hover:-translate-y-0.5 transition-transform focus:outline-none !border-[var(--color-brand-bg)] !no-underline w-full
"
      >
        <div className="aspect-[2/3] w-full overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover group-hover:opacity-95"
          />
        </div>
        <div className="p-3">
          <h6 className="text-sm sm:text-base font-semibold leading-snug truncate">
            {title}
          </h6>
          <div className="mt-1 text-xs sm:text-sm opacity-90 flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <span>⭐️ {movie.vote_average?.toFixed(1)}</span>
            {movie.release_date && <span>• {movie.release_date}</span>}
            {genreFunction(movie.genre_ids) && (
              <span className="truncate">
                • {genreFunction(movie.genre_ids)}
              </span>
            )}
          </div>
        </div>
      </NavLink>
    </>
  );
}
