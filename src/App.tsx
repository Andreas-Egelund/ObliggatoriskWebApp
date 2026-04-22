import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';

/**
 * The App component is our primary entry point.
 * This component defines the structure of our website.
 */
const App: React.FC = () => {
  return (
    <>
      {/* Navbar stays outside Routes so it is always visible */}
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movie/:id' element={<MovieDetails />} />
      </Routes>
    </>
  );
};

export default App;
