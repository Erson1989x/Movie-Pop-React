import { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Search from "./components/Navbar/Search";
import NumResult from "./components/Navbar/NumResult";
import { tempMovieData } from "../src/utils/tempMovieData";
import { tempWatchedData } from "../src/utils/tempWatchedData";
import Box from "./components/Hero/Box";
import MovieList from "./components/Hero/MovieList";
import Summary from "./components/Hero/Summary";
import { average } from "./utils/fuctions";
import WatchList from "./components/Hero/WatchList";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);

  const KEY = "c0d89336";
  const query = "man";

  /* const fetchMovies = async () => {
    try {
      const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`);
      const data = await res.json();
      setMovies(data.Search);
      console.log(data.Search);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchMovies();
  }, []);*/

  useEffect(() => {
    fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`)
    .then((res) => res.json())
    .then((data) => setMovies(data.Search));
  }, []);


  return (
    <>
      <Navbar>
        <Search />
        <NumResult movies={movies} />
      </Navbar>
      <Hero>
        {/* <Box element={<MovieList movies={movies} />} />
        <Box
          element={
            <>
              <Summary watched={watched} average={average} />
              <WatchList watched={watched} />
            </>
          }
        />*/}
        <Box>
          <MovieList movies={movies} />
        </Box>
        <Box>
          <Summary watched={watched} average={average} />
          <WatchList watched={watched} />
        </Box>
      </Hero>
    </>
  );
}
