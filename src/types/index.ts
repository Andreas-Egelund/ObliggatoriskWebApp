/**
 * These are TypeScript interfaces used to define the shape of our data.
 * This makes it easier to work with the TMDB API because TypeScript will know
 * what properties are available on movies and API responses.
 */

// Represents a single Movie object returned from the API
export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
}

// The TMDB API returns data in "pages". This interface helps us type the whole response.
// 'T' is a generic type, which means we can reuse this for any paginated response.
export interface PaginatedResponse<T> {
  page: number; // The current page number
  results: T[]; // The actual list of items (e.g., an array of Movies)
  total_pages: number;
  total_results: number;
}
