import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { mainContext, type MainContextProps } from "../../context/MainProvider";

export default function MovieDetail() {
  const { movieId } = useParams();

  const { states, fetchMovieDetail } = useContext(
    mainContext
  ) as MainContextProps;

  useEffect(() => {
    fetchMovieDetail(movieId);
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
