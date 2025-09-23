import { useContext } from "react";
import type { IMovieDetail } from "../../interfaces/IMovieDetail";
import { mainContext, type MainContextProps } from "../../context/MainProvider";
import { NavLink } from "react-router";

interface MovieItemProps {
  movie: IMovieDetail;
}

export default function MovieItem({ movie }: MovieItemProps) {
  const { states } = useContext(mainContext) as MainContextProps;

  const genreFunction = (genreIDs: number[]): string => {
    return genreIDs
      .map((id) => states.categories.find((el) => el.id === id)?.name)
      .filter(Boolean)
      .join(" ");
  };

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : undefined;

  const title =
    movie.title ||
    movie.name ||
    movie.original_title ||
    movie.original_name ||
    "unknown";

  return (
    <NavLink to={`/detail/${movie.id}`} className="flex">
      <img src={imageUrl} alt="" className="w-50 h-50 " />
      <div className="flex">
        <div>
          <h4>{title}</h4>
          <span>⭐️ {movie.vote_average.toFixed(1)}</span> ⏺{" "}
          <p>{movie.release_date} </p>{" "}
          <p>
            {genreFunction(movie.genre_ids)} ⏺ {movie.runtime}
          </p>
        </div>
      </div>
    </NavLink>
  );
}
