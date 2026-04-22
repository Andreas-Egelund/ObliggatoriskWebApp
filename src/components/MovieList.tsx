import React from 'react';
import type { Movie } from '../types';
import MovieCard from './MovieCard';

// Array of 'Movie' elements passed in from some parent component
interface MovieListProps {
  movies: Movie[]; 
}

/**
 * MovieList takes an array of Movie objects and loops over them, 
 * rendering a new <MovieCard /> component for each.
 */
const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  // Scenario 1: What if the API came back with no results?
  if (movies.length === 0) {
    return (
      <div className="alert alert-info">
        No movies found. Try searching for something else.
      </div>
    );
  }

  // Scenario 2: Render standard results. 
  // Row classes from bootstrap break down automatically into different grid sizes.
  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
      {/* We use the map array method to iterate through each item. */}
      {/* Every item mounted from a .map() in React must have a unique 'key'. */}
      {movies.map((movie) => (
        <div className="col" key={movie.id}>
          {/* For every one of these movies, pass it into our custom MovieCard component. */}
          <MovieCard movie={movie} />
        </div>
      ))}
    </div>
  );
};

export default MovieList;
