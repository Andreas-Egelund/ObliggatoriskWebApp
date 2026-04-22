// Import necessary functions from RTK Query to create our API service
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// Import typescript types so our app knows what the data looks like
import type { Movie, PaginatedResponse } from '../types';


const API_KEY = 'APIKEYGOESHERE';

/**
 * RTK Query (Redux Toolkit Query) is used here to handle data fetching.
 * We define endpoints for different API calls, and RTK Query automatically
 * generates custom React hooks for us to use in our components.
 */
export const movieApi = createApi({
  // The name of the reducer in the Redux store
  reducerPath: 'movieApi',
  
  // Set up the base URL for the API. We'll append different paths to this for different endpoints.
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
  
  // Endpoints describe our individual requests to the TMDB API
  endpoints: (builder) => ({
    
    // Endpoint: Fetch Popular Movies. It returns a PaginatedResponse containing Movie objects.
    // It takes a page number ('number') or nothing ('void').
    getPopularMovies: builder.query<PaginatedResponse<Movie>, number | void>({
      // We return the specific URL path and query parameters we want
      query: (page = 1) => `movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`,
    }),
    
    // Endpoint: Fetch one specific movie's details based on its ID.
    getMovieDetails: builder.query<Movie, number>({
      query: (id) => `movie/${id}?api_key=${API_KEY}&language=en-US`,
    }),
    
    // Endpoint: Search for movies given a search string ('query').
    searchMovies: builder.query<PaginatedResponse<Movie>, string>({
      // We encode the string so that spaces become valid URL characters (e.g. "Star Wars" -> "Star%20Wars")
      query: (query) => `search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=1`,
    }),
    
  }),
});

/**
 * RTK Query automatically exports React hooks for every endpoint we defined above.
 * We export these to use them easily inside our React components.
 */
export const { 
  useGetPopularMoviesQuery, 
  useGetMovieDetailsQuery, 
  useSearchMoviesQuery 
} = movieApi;
