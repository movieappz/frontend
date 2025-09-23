import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  AUTH_HEADER,
  mainContext,
  type MainContextProps,
} from "../../context/MainProvider";
import type { IMovieTrailer } from "../../interfaces/IMovieTrailer";
import axios from "axios";

export default function MovieDetail() {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const { states, fetchMovieDetail } = useContext(
    mainContext
  ) as MainContextProps;

  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [trailerChecked, setTrailerChecked] = useState(false);
  const [loadingTrailer, setLoadingTrailer] = useState(false);

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

  const releaseYear = useMemo(() => {
    const d = movie?.release_date || movie?.first_air_date;
    return d ? new Date(d).getFullYear() : undefined;
  }, [movie?.release_date, movie?.first_air_date]);

  const runtime = movie?.runtime || (movie?.episode_run_time?.[0] ?? undefined);

  const handleBack = () => navigate(-1);

  const fetchTrailer = async () => {
    if (!movieId) return;
    try {
      setLoadingTrailer(true);
      const resp = await axios.get<IMovieTrailer>(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        { headers: AUTH_HEADER }
      );
      const trailer = resp.data.results.find(
        (v) => v.site === "YouTube" && v.type === "Trailer"
      );
      setTrailerKey(trailer ? trailer.key : null);
    } catch (e) {
      setTrailerKey(null);
    } finally {
      setLoadingTrailer(false);
      setTrailerChecked(true);
    }
  };

  return (
    <div className="container-responsive">
      <div className="mb-4 flex items-center gap-2">
        <button
          onClick={handleBack}
          className="btn bg-transparent text-[--color-brand-text] border-2 border-[--color-brand-border] hover:bg-[--color-brand-border]/40 px-3 py-1 rounded-md"
        >
          ← Back
        </button>
        <button
          onClick={fetchTrailer}
          className="btn bg-transparent text-[--color-brand-text] border-2 border-[--color-brand-border] hover:bg-[--color-brand-border]/40 px-3 py-1 rounded-md"
        >
          {loadingTrailer ? "Loading..." : "Show Trailer"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="rounded-lg overflow-hidden border-2 border-[--color-brand-border] bg-white/90">
            <img src={imageUrl} alt={title} className="w-full object-cover" />
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="rounded-lg border-2 border-[--color-brand-border] bg-white/90 text-[--color-brand-text] p-4 sm:p-6">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              {title}{" "}
              {releaseYear ? (
                <span className="opacity-80">({releaseYear})</span>
              ) : null}
            </h1>
            {movie?.tagline && (
              <p className="italic opacity-80 mb-3">{movie.tagline}</p>
            )}
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm sm:text-base mb-3 opacity-90">
              {movie?.vote_average !== undefined && (
                <span>⭐️ {movie.vote_average.toFixed(1)}</span>
              )}
              {runtime && <span>• {runtime} min</span>}
              {movie?.genres && movie.genres.length > 0 && (
                <span>• {movie.genres.map((g) => g.name).join(", ")}</span>
              )}
              {movie?.original_language && (
                <span>• Lang: {movie.original_language.toUpperCase()}</span>
              )}
            </div>
            {movie?.overview && (
              <p className="leading-relaxed mb-4">{movie.overview}</p>
            )}

            {movie?.production_companies &&
              movie.production_companies.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Production</h3>
                  <div className="flex flex-wrap gap-2 text-sm opacity-90">
                    {movie.production_companies.map((c) => (
                      <span
                        key={c.id}
                        className="px-2 py-1 rounded border border-[--color-brand-border] bg-white/70"
                      >
                        {c.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>

      {trailerKey && (
        <div className="mt-6">
          <div className="rounded-lg overflow-hidden border-2 border-[--color-brand-border]">
            <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {trailerChecked && !trailerKey && (
        <h3 className="pt-7 text-center">Not YouTube Video is available</h3>
      )}
    </div>
  );
}
