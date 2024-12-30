import React from 'react'

const NumResult = ( { movies } ) => {
  return (
    <p className="num-results">
      {movies && <strong>{movies.length}</strong>} results
    </p>
  )
}

export default NumResult