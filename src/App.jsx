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
import MovieDetails from "./components/MovieDetails/MovieDetails";

export default function App() {
  const [query, setQuery] = useState("interstellar");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const KEY = "c0d89336";

  const handleSelectMovie = (id) => {
    setSelectedId((selectedId) => ( id === selectedId ? null : id ));
  };

  const handleCloseMovie = () => {
    setSelectedId(null);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
        );

        if (!res.ok) {
          throw new Error("Something went wrong");
        }

        const data = await res.json();

        if (data.Response === "False") {
          console.log("API response:", data);
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

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    fetchMovies();
  }, [query]);

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
        <Search query={query} setQuery={setQuery} />
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
          {!isLoading && !error && <MovieList movies={movies} handleSelectMovie={handleSelectMovie} />}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails selectedId={selectedId} handleCloseMovie={handleCloseMovie} />
          ) : (
            <>
              <Summary watched={watched} average={average} />
              <WatchList watched={watched} />
            </>
          )}
        </Box>
      </Hero>
    </>
  );
}
