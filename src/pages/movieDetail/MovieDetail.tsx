import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import {
  AUTH_HEADER,
  mainContext,
  type MainContextProps,
} from "../../context/MainProvider";
import axios from "axios";

export default function MovieDetail() {
  const { movieId } = useParams();

  const { states, dispatch } = useContext(mainContext) as MainContextProps;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
          { headers: AUTH_HEADER }
        );
        dispatch({
          type: "FETCH_DETAIL_SUCCESS",
          payload: resp.data,
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [movieId]);

  const movie = states?.selectedMovie;

  const imageUrl = movie?.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie?.poster_path}`
    : undefined;

  const title =
    movie?.title ||
    movie?.name ||
    movie?.original_title ||
    movie?.original_name ||
    "unknown";

  return (
    <div>
      <img src={imageUrl} alt="" />
      <p>Movie Details</p>
      <h3>{title}</h3>
    </div>
  );
}
