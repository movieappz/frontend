import type { IState, TAction } from "../interfaces/interfaces";


export const reducer = (state: IState, action: TAction): IState => {
    switch (action.type) {
        case "FETCH_START":
            return { ...state, loading: true, error: null };

        case "SET_PAGE":
            return { ...state, page: action.payload };


        case "FETCH_SUCCESS_PAGE_CHANGE":
            return {
                ...state,
                loading: false,
                movies: action.payload.movies,
            };

        case "FETCH_DETAIL_SUCCESS":
            return {
                ...state,
                loading: false,
                selectedMovie: action.payload,
                error: null,
            };

        case "FETCH_CATEGORY_SUCCESS":
            return {
                ...state,
                loading: false,
                categories: action.payload.categories
            }

        case "FETCH_CATEGORY_MOVIE_SUCCESS":
            return {
                ...state,
                loading: false,
                movies: action.payload.movies
            }

        case "FETCH_SEARCH_SUCCESS":
            return {
                ...state,
                loading: false,
                searchQuery: action.payload.query,
                movies: action.payload.movies,
                error: null,
            };

        case "CLEAR_SEARCH":
            return {
                ...state,
                searchQuery: "",
                movies: [],
            };

        case "FETCH_SUCCESS":
            return {
                ...state,
                loading: false,
                categories: action.payload.categories,
                movies: action.payload.movies,
            };

        case "FETCH_ERROR":
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};
