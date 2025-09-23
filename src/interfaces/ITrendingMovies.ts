export interface ITrendingMovies {
  page: number;
  results: IResult[];
  total_pages: number;
  total_results: number;
}

export interface IResult {
  backdrop_path: string | null;
  id: number;
  title?: string;
  name?: string;
  original_title?: string;
  original_name?: string;
  overview: string;
  poster_path: string | null;
  media_type: string; // "movie" | "tv" u.a.
  adult?: boolean;
  original_language: OriginalLanguage | string;
  genre_ids: number[];
  popularity: number;
  release_date?: string;
  first_air_date?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
}

export enum MediaType {
  Movie = "movie",
}

export enum OriginalLanguage {
  En = "en",
  ID = "id",
  Ja = "ja",
}
