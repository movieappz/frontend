import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  AUTH_HEADER,
  mainContext,
  type MainContextProps,
} from "../../context/MainProvider";
import type { IMovieTrailer } from "../../interfaces/IMovieTrailer";
import axios from "axios";
import SkeletonGrid from "../../components/SkeletonCard/SkeletonGrid";
import { useUserStore } from "../../store/userStore";
import {
  ArrowLeftIcon,
  HeartFilledIcon,
  HeartIcon,
  VideoIcon,
  Cross2Icon,
} from "@radix-ui/react-icons";

export default function MovieDetail() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const { user, toggleFavorite } = useUserStore();

  const { states, fetchMovieDetail } = useContext(
    mainContext
  ) as MainContextProps;

  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [trailerChecked, setTrailerChecked] = useState(false);
  const [loadingTrailer, setLoadingTrailer] = useState(false);
  const [showTrailerModal, setShowTrailerModal] = useState(false);

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
    const date = movie?.release_date || movie?.first_air_date;
    return date ? new Date(date).getFullYear() : undefined;
  }, [movie?.release_date, movie?.first_air_date]);

  const runtime = movie?.runtime || (movie?.episode_run_time?.[0] ?? undefined);

  const handleBack = () => navigate(-1);

  const isFavorite = movie && user?.favorites?.includes(movie.id || -1);

  const handleToggleFavorite = () => {
    if (movie && user) {
      toggleFavorite(movie.id);
    }
  };

  const fetchTrailer = async () => {
    if (!movieId) return;
    try {
      setLoadingTrailer(true);
      const resp = await axios.get<IMovieTrailer>(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        { headers: AUTH_HEADER }
      );
      const trailer = resp.data.results.find(
        (video) => video.site === "YouTube" && video.type === "Trailer"
      );
      setTrailerKey(trailer ? trailer.key : null);
      if (trailer) {
        setShowTrailerModal(true);
      }
    } catch (e) {
      setTrailerKey(null);
    } finally {
      setLoadingTrailer(false);
      setTrailerChecked(true);
    }
  };

  return (
    <div className="container-responsive">
      {states.loading && <SkeletonGrid count={10} />}
      <div className="mb-4 flex items-center gap-2">
        <button
          onClick={handleBack}
          className="flex items-center justify-center w-12 h-12 bg-[rgb(var(--bg-secondary))] border-2 border-[rgb(var(--border))] hover:bg-[rgb(var(--accent-primary))]/20 !text-[rgb(var(--text-primary))] rounded-lg transition-colors"
          aria-label="Zurück"
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        {user && movie && (
          <button
            onClick={handleToggleFavorite}
            className="flex items-center justify-center w-12 h-12 bg-[rgb(var(--bg-secondary))] border-2 border-[rgb(var(--border))] hover:bg-[rgb(var(--accent-primary))]/20 !text-[rgb(var(--text-primary))] rounded-lg transition-colors"
            aria-label={
              isFavorite ? "Favorit entfernen" : "Zu Favoriten hinzufügen"
            }
            title={isFavorite ? "Favorit entfernen" : "Zu Favoriten hinzufügen"}
          >
            {isFavorite ? (
              <HeartFilledIcon className="w-6 h-6 !text-red-500" />
            ) : (
              <HeartIcon className="w-6 h-6" />
            )}
          </button>
        )}
        <button
          onClick={fetchTrailer}
          disabled={loadingTrailer}
          className="flex items-center justify-center w-12 h-12 bg-[rgb(var(--bg-secondary))] border-2 border-[rgb(var(--border))] hover:bg-[rgb(var(--accent-primary))]/20 !text-[rgb(var(--text-primary))] rounded-lg transition-colors disabled:opacity-50"
          aria-label="Trailer ansehen"
        >
          {loadingTrailer ? (
            <div className="animate-spin h-6 w-6 border-2 border-[rgb(var(--text-primary))] border-t-transparent rounded-full"></div>
          ) : (
            <VideoIcon className="w-6 h-6" />
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="rounded-xl overflow-hidden border-2 border-[rgb(var(--border))] bg-[rgb(var(--bg-secondary))] shadow-lg">
            <img src={imageUrl} alt={title} className="w-full object-cover" />
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="rounded-xl border-2 border-[rgb(var(--border))] bg-[rgb(var(--bg-secondary))] shadow-lg p-4 sm:p-6">
            <h1 className="text-2xl sm:text-3xl font-bold !text-[rgb(var(--text-primary))] mb-2">
              {title}
              {releaseYear ? (
                <span className="opacity-80"> ({releaseYear})</span>
              ) : null}
            </h1>
            {movie?.tagline && (
              <p className="italic !text-[rgb(var(--text-secondary))] opacity-80 mb-3">
                {movie.tagline}
              </p>
            )}
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm sm:text-base mb-3 !text-[rgb(var(--text-secondary))]">
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
              <p className="leading-relaxed mb-4 !text-[rgb(var(--text-primary))]">
                {movie.overview}
              </p>
            )}

            {movie?.production_companies &&
              movie.production_companies.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-semibold mb-2 !text-[rgb(var(--text-primary))]">
                    Production
                  </h3>
                  <div className="flex flex-wrap gap-2 text-sm">
                    {movie.production_companies.map((c) => (
                      <span
                        key={c.id}
                        className="px-3 py-1 rounded-full border-2 border-[rgb(var(--border))] bg-[rgb(var(--bg-primary))] !text-[rgb(var(--text-secondary))]"
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

      {/* Trailer Modal */}
      {showTrailerModal && trailerKey && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-2 sm:p-4"
          onClick={() => setShowTrailerModal(false)}
        >
          <div
            className="relative w-full max-w-5xl bg-[rgb(var(--bg-secondary))] rounded-lg sm:rounded-xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowTrailerModal(false)}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-black/70 hover:bg-black/90 !text-white rounded-full transition-colors"
              aria-label="Schließen"
            >
              <Cross2Icon className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {trailerChecked && !trailerKey && (
        <div className="mt-6 text-center p-6 bg-[rgb(var(--bg-secondary))] border-2 border-[rgb(var(--border))] rounded-xl">
          <h3 className="!text-[rgb(var(--text-primary))] text-lg">
            Kein YouTube-Trailer verfügbar
          </h3>
        </div>
      )}
    </div>
  );
}
