export interface ISearchMovie {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}

export interface Result {
  adult: boolean;
  backdrop_path: null | string;
  genre_ids: number[];
  id: number;
  original_language: OriginalLanguage | string;
  original_title?: string;
  original_name?: string; // für TV
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date?: string; // als String
  first_air_date?: string; // für TV
  title?: string; // Movie
  name?: string; // TV
  media_type?: string; // z.B. "movie" | "tv"
  video?: boolean;
  vote_average: number;
  vote_count: number;
}

export enum OriginalLanguage {
  En = "en",
  Hu = "hu",
  Ru = "ru",
}
