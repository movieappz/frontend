import { useContext, useEffect } from "react";
import {
  AUTH_HEADER,
  mainContext,
  type MainContextProps,
} from "../../context/MainProvider";
import axios from "axios";
import { useParams } from "react-router";
import MovieItem from "../../components/movieItem/MovieItem";

export default function MoviePage() {
  const { states, dispatch } = useContext(mainContext) as MainContextProps;

  const { genreId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}`,
          { headers: AUTH_HEADER }
        );

        dispatch({
          type: "FETCH_CATEGORY_SUCCESS",
          payload: { movies: resp.data.results },
        });
      } catch (error) {}
    };
    fetchData();
  }, [genreId]);

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
