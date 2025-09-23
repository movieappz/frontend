import { useContext } from "react";
import { mainContext, type MainContextProps } from "../../context/MainProvider";
import type { IMovieDetail } from "../../interfaces/IMovieDetail";
import MovieItem from "../movieItem/MovieItem";

export default function Trending() {
  const { states } = useContext(mainContext) as MainContextProps;

  return (
    <div>
      {states.movies.map((movie: IMovieDetail) => {
        return (
          <div key={movie.id}>
            <MovieItem movie={movie} />
          </div>
        );
      })}
    </div>
  );
}
