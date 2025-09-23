export interface IMovieDetail {
    adult: boolean;
    backdrop_path: string | null;
    belongs_to_collection?: BelongsToCollection | null;
    budget?: number;
    genres?: Genre[];
    homepage?: string | null;
    id: number;
    genre_ids: number[];
    imdb_id?: string | null;
    origin_country?: string[];
    original_language: string;
    original_title?: string;
    original_name?: string; // für TV
    overview: string;
    popularity: number;
    poster_path: string | null;
    production_companies?: ProductionCompany[];
    production_countries?: ProductionCountry[];
    release_date?: string; // TMDB liefert String-ISO-Datum
    first_air_date?: string; // für TV
    revenue?: number;
    runtime?: number;
    episode_run_time?: number[]; // für TV
    spoken_languages?: SpokenLanguage[];
    status?: string;
    tagline?: string | null;
    title?: string; // für Movie
    name?: string; // für TV
    video?: boolean;
    vote_average: number;
    vote_count: number;
}

export interface BelongsToCollection {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
}

export interface Genre {
    id: number;
    name: string;
}

export interface ProductionCompany {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
}

export interface ProductionCountry {
    iso_3166_1: string;
    name: string;
}

export interface SpokenLanguage {
    english_name: string;
    iso_639_1: string;
    name: string;
}
