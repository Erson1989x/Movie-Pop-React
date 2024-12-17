import React from 'react'
import WatchedMovie from './WatchedMovie'

const WatchList = ( { watched } ) => {
  return (
    <ul className="list">
    {watched.map((movie) => (
        <WatchedMovie key={movie.imdbID} movie={movie} />
    ))}
  </ul>
  )
}

export default WatchList