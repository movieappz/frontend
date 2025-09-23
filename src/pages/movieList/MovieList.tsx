import { useContext } from "react";
import { mainContext, type MainContextProps } from "../../context/MainProvider";

import MovieItem from "../../components/movieItem/MovieItem";

export default function MoviePage() {
  const { states } = useContext(mainContext) as MainContextProps;

  return (
    <div>
      {states.categories !== null && (
        <>
          {states.movies.map((movie) => {
            return (
              <>
                <MovieItem movie={movie} />
              </>
            );
          })}
        </>
      )}
    </div>
  );
}
