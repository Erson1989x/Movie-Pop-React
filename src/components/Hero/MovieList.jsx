import React from 'react'
import Movie from './Movie'

const MovieList = ( { movies, handleSelectMovie } ) => {
  return (
    <ul className="list list-movies">
    {movies?.map((movie) => (
        <Movie handleSelectMovie={handleSelectMovie} key={movie.imdbID} movie={movie} />
    ))}
  </ul>
  )
}

export default MovieList