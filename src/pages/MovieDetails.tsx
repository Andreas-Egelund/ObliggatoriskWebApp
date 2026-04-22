import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetMovieDetailsQuery } from '../services/movieApi';

/**
 * MovieDetails page component.
 * Displays all information for a specific selected movie.
 */
const MovieDetails: React.FC = () => {
  // `useParams` pulls parameters directly out of our current URL.
  // In `App.tsx` we set up a Route mapping: `/movie/:id`
  // So if the URL is `/movie/123`, then `id` will equal "123".
  const { id } = useParams<{ id: string }>();
  
  // Create a navigation object to let us programmaticly go back or forward in history
  const navigate = useNavigate();
  
  // Convert our ID variable from a String into an Integer/Number.
  const movieId = parseInt(id || '0', 10);
  
  // Use our auto-generated RTK Query React hook to start loading the movie data
  const { data: movie, error, isLoading } = useGetMovieDetailsQuery(movieId, { 
    // If the ID is completely broken or empty, skip fetching entirely
    skip: movieId === 0 
  });

  /**
   * 1: Loading Output State.
   * Return a spinner block to HTML until we hear back from the API
   */
  if (isLoading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading Movie Details...</span>
        </div>
      </div>
    );
  }

  /**
   * 2: Error Output State.
   */
  if (error || !movie) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          Could not find that movie, or there was an error loading it.
        </div>
        {/* `navigate(-1)` tells the browser to go back exactly 1 single page in your history */}
        <button className="btn btn-primary" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  /**
   * 3: Success Layout Structure!
   */
  const imageUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <div className="container mb-5">
      
      {/* Basic Back Button using navigate() */}
      <button className="btn btn-outline-secondary mb-4" onClick={() => navigate(-1)}>
        &larr; Return to Previous Page
      </button>
      
      {/* 
        Bootstrap grid.
        On mobile this will stack, on medium screens (-md-) and up it becomes 2 columns 
      */}
      <div className="row">
        
        {/* Left column: Poster Image */}
        <div className="col-md-4 mb-4 text-center">
          <img 
            src={imageUrl} 
            alt={movie.title} 
            className="img-fluid rounded shadow max-vh-50" 
          />
        </div>
        
        {/* Right column: Content layout */}
        <div className="col-md-8">
          <h1>{movie.title}</h1>
          <p className="text-muted">Release Date: {movie.release_date}</p>
          
          <div className="d-flex align-items-center mb-3">
            <span className="badge bg-warning text-dark fs-5 me-2">
              ⭐ {movie.vote_average.toFixed(1)} / 10 User Rating
            </span>
          </div>
          
          <h4 className="mt-4">Summary</h4>
          <p className="lead">{movie.overview}</p>
        </div>
        
      </div>
    </div>
  );
};

export default MovieDetails;
