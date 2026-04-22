import React from 'react';
import { Link } from 'react-router-dom';
// Type that defines the required properties a movie must have.
import type { Movie } from '../types';

// The props interface for this specific Component.
// This indicates the MovieCard component expects a 'movie' object.
interface MovieCardProps {
  movie: Movie;
}

/**
 * MovieCard displays a single movie picture, title, rating and a link to view details.
 * We pass 'movie' as a property (prop) so it knows what info to print.
 */
const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  // If the TMDB API gives us a picture, generate a URL to display.
  // Otherwise, use a placeholder image so nothing looks broken.
  const imageUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    // Bootstrap class layout for cards
    <div className="card h-100 shadow-sm">
      
      {/* 
        This React Router 'Link' navigates the user to a unique detailed 
        page for only this movie when cliking the image cover.
      */}
      <Link to={`/movie/${movie.id}`} className="text-decoration-none">
        <img src={imageUrl} className="card-img-top" alt={movie.title} />
      </Link>
      
      {/* The text content of the card */}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-truncate" title={movie.title}>
          {movie.title}
        </h5>
        
        <div className="mt-auto d-flex justify-content-between align-items-center">
          {/* Output movie rating rounded to one decimal point out of 10 */}
          <small className="text-muted">⭐ {movie.vote_average.toFixed(1)} / 10</small>
          
          <Link to={`/movie/${movie.id}`} className="btn btn-sm btn-primary">
            Details
          </Link>
        </div>
        
      </div>
    </div>
  );
};

export default MovieCard;
