import type { IMovieDetail } from "./IMovieDetail";

export interface ICategory {
    id: number;
    name: string;
}

export interface IState {
    movies: IMovieDetail[],
    categories: ICategory[],
    searchQuery: string,
    selectedMovie: IMovieDetail | null;
    loading: boolean,
    error: string | null
    include_adult: boolean,
    genre: number
    page: number
}



export type TAction =
    { type: "FETCH_START" }
    | { type: "FETCH_SUCCESS"; payload: { categories: ICategory[]; movies: IMovieDetail[] } }
    | { type: "FETCH_DETAIL_SUCCESS"; payload: IMovieDetail }
    | { type: "FETCH_SEARCH_SUCCESS"; payload: { query: string; movies: IMovieDetail[] } }
    | { type: "FETCH_CATEGORY_SUCCESS"; payload: { movies: IMovieDetail[] } }
    | { type: "CLEAR_SEARCH" }
    | { type: "FETCH_ERROR"; payload: string };
