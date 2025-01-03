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
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const KEY = "c0d89336";
  const query = "superman";


  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`);

        if(!res.ok) {
          throw new Error("Something went wrong");
        }

        const data = await res.json();

        if(data.Response === "False") {
          throw new Error("Movie not found");
        }

        setMovies(data.Search);
  
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
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
          {/*isLoading ? <Loader /> : <MovieList movies={movies} />*/}
          {isLoading && <Loader />}
          {isLoading && !error && <MovieList movies={movies} />}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          <Summary watched={watched} average={average} />
          <WatchList watched={watched} />
        </Box>
      </Hero>
    </>
  );
}
