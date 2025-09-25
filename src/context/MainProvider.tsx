import React, { createContext, useEffect, useReducer, useRef } from "react";
import axios from "axios";
import { reducer } from "../functions/reducer";
import type { IState, TAction } from "../interfaces/interfaces";
import { useParams, useSearchParams } from "react-router";

export interface MainContextProps {
  states: IState;
  searchRef: React.RefObject<HTMLInputElement | null>;
  dispatch: React.Dispatch<TAction>;
  searchMovies: (query: string | undefined) => Promise<void>;
  clearSearch: () => void;
  fetchMovieDetail: (id: string | undefined) => Promise<void>;
  nextPage: () => void;
  prevPage: () => void;
}

export const mainContext = createContext<MainContextProps | null>(null);

export const AUTH_HEADER = {
  Authorization: `Bearer ${import.meta.env.VITE_KEY_BAREAR}`,
};

export default function MainProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // = HOOKS
  const params = useParams<string>();
  const searchRef = useRef<HTMLInputElement | null>(null);
  const prevGenreIdRef = useRef<string | undefined>(params.genreId);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = Number(searchParams.get("page")) || 1;

  // = STATE
  const [states, dispatch] = useReducer(reducer, {
    movies: [],
    categories: [],
    searchQuery: "",
    selectedMovie: null,
    loading: false,
    error: null,
    include_adult: false,
    genre: 35,
    page: initialPage,
  });

  // = FUNCTION
  const searchMovies = async (query: string | undefined) => {
    if (!query) return;
    dispatch({ type: "FETCH_START" });
    try {
      const resp = await axios.get(
        `https://api.themoviedb.org/3/search/movie?include_adult=${
          states.include_adult
        }&language=en-US&page=${states.page}&query=${encodeURIComponent(
          query
        )}`,
        { headers: AUTH_HEADER }
      );
      dispatch({
        type: "FETCH_SEARCH_SUCCESS",
        payload: { query, movies: resp.data.results ?? [] },
      });
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", payload: "Fehler bei der Suche" });
    }
  };

  const nextPage = () => {
    const newPage = states.page + 1;
    dispatch({ type: "SET_PAGE", payload: states.page + 1 });
    setSearchParams({ page: String(newPage) });
  };

  const prevPage = () => {
    if (states.page === 1) return;
    const newPage = states.page - 1;
    dispatch({ type: "SET_PAGE", payload: newPage });
    setSearchParams({ page: String(newPage) });
  };

  const fetchMovieDetail = async (id: string | undefined) => {
    dispatch({ type: "FETCH_START" });
    try {
      const resp = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
        { headers: AUTH_HEADER }
      );
      dispatch({ type: "FETCH_DETAIL_SUCCESS", payload: resp.data });
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", payload: "Fehler beim Laden des Films" });
    }
  };

  const clearSearch = () => dispatch({ type: "CLEAR_SEARCH" });

  useEffect(() => {
    const fetchInitial = async () => {
      dispatch({ type: "FETCH_START" });
      try {
        const [trendingResp, categoriesResp] = await Promise.all([
          axios.get(
            "https://api.themoviedb.org/3/trending/all/day?language=en-US",
            { headers: AUTH_HEADER }
          ),
          axios.get(
            "https://api.themoviedb.org/3/genre/movie/list?language=en",
            { headers: AUTH_HEADER }
          ),
        ]);
        dispatch({
          type: "FETCH_SUCCESS",
          payload: {
            movies: trendingResp.data.results ?? [],
            categories: categoriesResp.data.genres ?? [],
          },
        });
        if (params.genreId) {
          try {
            const resp = await axios.get(
              `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${states.page}&sort_by=popularity.desc&with_genres=${params.genreId}`,
              { headers: AUTH_HEADER }
            );
            dispatch({
              type: "FETCH_SUCCESS_PAGE_CHANGE",
              payload: { movies: resp.data.results ?? [] },
            });

            dispatch({
              type: "FETCH_CATEGORY_MOVIE_SUCCESS",
              payload: { movies: resp.data.results ?? [] },
            });
          } catch (error) {}
        }
      } catch (error) {
        dispatch({ type: "FETCH_ERROR", payload: "Fehler beim Initial-Fetch" });
      }
    };

    fetchInitial();
  }, [states.page, params.genreId]);

  useEffect(() => {
    const pageFromUrl = Number(searchParams.get("page"));
    if (
      !Number.isNaN(pageFromUrl) &&
      pageFromUrl > 0 &&
      pageFromUrl !== states.page
    ) {
      dispatch({ type: "SET_PAGE", payload: pageFromUrl });
    }
  }, [searchParams]);

  useEffect(() => {
    const prevGenreId = prevGenreIdRef.current;
    const currentGenreId = params.genreId;
    const hasPageInUrl = !!searchParams.get("page");

    if (currentGenreId !== prevGenreId) {
      prevGenreIdRef.current = currentGenreId;
      if (!hasPageInUrl) {
        if (states.page !== 1) {
          dispatch({ type: "SET_PAGE", payload: 1 });
        }
        setSearchParams({ page: "1" }, { replace: true });
      }
    }
  }, [params.genreId, searchParams, states.page]);

  return (
    <mainContext.Provider
      value={{
        states,
        dispatch,
        searchMovies,
        clearSearch,
        fetchMovieDetail,
        searchRef,
        nextPage,
        prevPage,
      }}
    >
      {children}
    </mainContext.Provider>
  );
}
