import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';

import "./App.css";
import SearchIcon from "./search.svg";

//57d2ec2b
const API_URL = "http://www.omdbapi.com?apikey=57d2ec2b";

const movieObject = {
    "Title": "The Amazing Spiderman 2 Webb Cut",
    "Year": "2021",
    "imdbID": "tt18351128",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BYzYzZDViNWYtNWViMS00NDMxLThlN2YtZjFkOWMwODkzNzhiXkEyXkFqcGdeQXVyMTUwMzM4NzU0._V1_SX300.jpg"
}

const App = () => {

    const [movies, setmovies] = useState([]);
    const [searchTerm, setsearchTerm] = useState('')

    const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    
    setmovies(data.Search);
  };    

  useEffect(() => {
    searchMovies("spiderman");
  }, []);

return (
    <div className='app'>
        <h1>Movieland</h1>
        <div className='search'>
            <input 
                placeholder = 'Search for movies'
                value = {searchTerm}
                onChange={(e) => setsearchTerm(e.target.value)}
            />
            <img
                src = {SearchIcon}
                alt = "Search "
                onClick={() => searchMovies(searchTerm)}
            />
        </div>
      
        {movies?.length > 0
            ? (
               <div className='container'>
                 {movies.map((movie) => (
                 <MovieCard movie={movie} />
                 ))}
               </div>
             ) : (
                <div className='empty'>
                    <h2>No movies found</h2>
                </div>    
             )}

        
    </div> 
  )
}

export default App