import React from 'react'
import ListBox from './ListBox';
import WatchBox from './WatchBox';
import { average } from '../../utils/fuctions';

const Hero = ( { movies, watched } ) => {

  return (
    <main className="main">
    <ListBox movies={movies}/>
    <WatchBox watched={watched} average={average} />
  </main>
  )
}

export default Hero