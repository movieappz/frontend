import React, { createContext, useEffect, useReducer } from "react";
import axios from "axios";
import { reducer } from "../functions/reducer";
import type { IState, TAction } from "../interfaces/interfaces";
import { useParams } from "react-router";

export interface MainContextProps {
  states: IState;
  dispatch: React.Dispatch<TAction>;
  searchMovies: (query: string) => Promise<void>;
  clearSearch: () => void;
  fetchMovieDetail: (id: string | undefined) => Promise<void>;
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
  const params = useParams();
  const [states, dispatch] = useReducer(reducer, {
    movies: [],
    categories: [],
    searchQuery: "",
    selectedMovie: null,
    loading: false,
    error: null,
    include_adult: true,
    genre: 35,
    page: 1,
  });

  const searchMovies = async (query: string) => {
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
              `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${params.genreId}`,
              { headers: AUTH_HEADER }
            );

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
  }, [params.genreId]);

  console.log(states);

  return (
    <mainContext.Provider
      value={{ states, dispatch, searchMovies, clearSearch, fetchMovieDetail }}
    >
      {children}
    </mainContext.Provider>
  );
}
