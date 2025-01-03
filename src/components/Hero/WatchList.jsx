import React from 'react'
import WatchedMovie from './WatchedMovie'

const WatchList = ( { watched, handleDeleteWatch } ) => {

  return (
    <ul className="list">
    {watched.map((movie) => (
        <WatchedMovie key={movie.imdbID} movie={movie} handleDeleteWatch={handleDeleteWatch} />
    ))}
  </ul>
  )
}

export default WatchList