import { useContext } from "react";
import { mainContext, type MainContextProps } from "../../context/MainProvider";

import MovieItem from "../../components/movieItem/MovieItem";

export default function MoviePage() {
  const { states } = useContext(mainContext) as MainContextProps;

  return (
    <div className="container-responsive">
      {states.categories !== null && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {states.movies.map((movie) => (
            <MovieItem key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
