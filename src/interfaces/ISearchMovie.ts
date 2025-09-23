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
  original_name?: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date?: string;
  first_air_date?: string;
  title?: string;
  name?: string;
  media_type?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
}

export enum OriginalLanguage {
  En = "en",
  Hu = "hu",
  Ru = "ru",
}
