import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/**
 * Navbar component for website navigation and search input.
 * We are managing form state using "useState" because it's a controlled component.
 */
const Navbar: React.FC = () => {
  // `searchTerm` holds the user's input before they hit "Search".
  const [searchTerm, setSearchTerm] = useState('');
  
  // `useNavigate` is a hook from React Router to programmatically change what page we are on.
  const navigate = useNavigate();

  /**
   * When the user clicks "Search" or presses enter, we trigger this form submission.
   */
  const handleSearch = (e: React.FormEvent) => {
    // Prevent the default browser reload on form submission
    e.preventDefault();
    
    if (searchTerm.trim() !== '') {
      // If we typed something, go to the homepage with a "search=" parameter in the URL.
      // E.g., `/?search=Batman`
      navigate(`/?search=${encodeURIComponent(searchTerm)}`);
    } else {
      // Otherwise, just go to the homepage cleanly without a search term
      navigate('/');
    }
  };

  return (
    // Bootstrap styling for a solid navigation bar
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        
        {/* Link is used instead of a standard <a> tag so React Router doesn't reload the page. */}
        <Link className="navbar-brand" to="/">MovieDB App</Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarContent" 
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Main navigation links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
          </ul>
          
          {/* The search form */}
          <form className="d-flex" onSubmit={handleSearch}>
            <input 
              className="form-control me-2" 
              type="search" 
              placeholder="Search Movies..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update state as user types
            />
            <button className="btn btn-outline-light" type="submit">Search</button>
          </form>
        </div>
        
      </div>
    </nav>
  );
};

export default Navbar;
