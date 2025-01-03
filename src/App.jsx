import { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Search from "./components/Navbar/Search";
import NumResult from "./components/Navbar/NumResult";
import Box from "./components/Hero/Box";
import MovieList from "./components/Hero/MovieList";
import Summary from "./components/Hero/Summary";
import { average } from "./utils/fuctions";
import WatchList from "./components/Hero/WatchList";
import Loader from "./components/Loader/Loader";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const KEY = "c0d89336";
  const query = "man";


  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`);
        const data = await res.json();
        setMovies(data.Search);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMovies();
  }, []);

  /*
  useEffect(() => {
    fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`)
    .then((res) => res.json())
    .then((data) => setMovies(data.Search));
  }, []);
*/

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
          {isLoading ? <Loader /> : <MovieList movies={movies} />}
        </Box>
        <Box>
          <Summary watched={watched} average={average} />
          <WatchList watched={watched} />
        </Box>
      </Hero>
    </>
  );
}
